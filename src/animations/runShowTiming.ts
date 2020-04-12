import Animated, { Easing } from "react-native-reanimated";

const { cond, block, set, Value, clockRunning, timing, stopClock, Clock, startClock, not, eq, and } = Animated;

import { log } from "./log";

export interface RunShowTimingConfig {
    show: Animated.Value<number>,
    zIndexConfig: [number, number],
    name?: string,
}

export interface ShowTiming {
    opacity: Animated.Node<number>;
    zIndex: Animated.Node<number>;
}

export function runShowTiming(timingConfig: RunShowTimingConfig): ShowTiming;

export function runShowTiming(timingConfig: RunShowTimingConfig) {
    const showTiming = {} as ShowTiming;
    const { show, zIndexConfig } = timingConfig;
    const name = timingConfig.name ?? "runShowTiming";

    const state = {
        finished: new Value(0),
        position: new Value(0),
        time: new Value(0),
        frameTime: new Value(0),
    };

    const config = {
        duration: 200,
        toValue: new Value(0),
        easing: Easing.inOut(Easing.ease),
    };

    const clock = new Clock();
    const opacity = new Value(0);
    const zIndex = new Value(zIndexConfig[0]);

    showTiming.opacity = block([
        log(`${name} : --------------------`, clockRunning(clock)),
        log(`${name} : start clockRunning`, clockRunning(clock)),
        log(`${name} : start show`, show),
        cond(
            show,
            [
                cond(
                    and(not(clockRunning(clock)), not(eq(opacity, 1))),
                    [
                        set(state.finished, 0),
                        set(state.time, 0),
                        set(state.position, opacity),
                        set(state.frameTime, 0),
                        set(config.toValue, 1),
                        set(zIndex, zIndexConfig[1]),
                        startClock(clock),
                        log(`${name} : show startClock`, clockRunning(clock)),
                    ]
                ),
                log(`${name} : show position`, state.position),
                log(`${name} : show frameTime`, state.frameTime),
                timing(clock, state, config),
                set(opacity, state.position),
                cond(
                    state.finished,
                    [
                        stopClock(clock),
                        log(`${name} : show stopClock`, clockRunning(clock)),
                    ]
                ),
            ],
            [
                cond(
                    and(not(clockRunning(clock)), not(eq(opacity, 0))),
                    [
                        set(state.finished, 0),
                        set(state.time, 0),
                        set(state.position, opacity),
                        set(state.frameTime, 0),
                        set(config.toValue, 0),
                        startClock(clock),
                        log(`${name} : hide startClock`, clockRunning(clock)),
                    ]
                ),
                log(`${name} : hide position`, state.position),
                log(`${name} : hide frameTime`, state.frameTime),
                timing(clock, state, config),
                set(opacity, state.position),
                cond(
                    state.finished,
                    [
                        set(zIndex, zIndexConfig[0]),
                        stopClock(clock),
                        log(`${name} : hide stopClock`, clockRunning(clock)),
                    ]
                ),
            ]
        ),
        log(`${name} : end opacity`, opacity),
        log(`${name} : end zIndex`, zIndex),
        log(`${name} : end clockRunning`, clockRunning(clock)),
        opacity,
    ]);

    showTiming.zIndex = block([
        showTiming.opacity,
        zIndex,
    ]);

    return showTiming;
}
