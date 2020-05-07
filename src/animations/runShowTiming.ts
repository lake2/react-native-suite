import Animated, { Easing } from "react-native-reanimated";

const { cond, block, set, Value, clockRunning, timing, stopClock, Clock, startClock, not, eq, and, call } = Animated;

import { log } from "./log";

export interface RunShowTimingConfig {
    name?: string,
    setVisiable: (value: any) => any
}

export interface ShowTiming {
    show: Animated.Value<number>;
    opacity: Animated.Node<number>;
}

export function runShowTiming(timingConfig: RunShowTimingConfig): ShowTiming {
    const showTiming = { show: new Value(0) } as ShowTiming;
    const name = timingConfig.name ?? "runShowTiming2";

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

    showTiming.opacity = block([
        log(`${name} : --------------------clockRunning:`, clockRunning(clock)),
        log(`${name} : start show`, showTiming.show),
        cond(
            showTiming.show,
            [
                cond(
                    and(not(clockRunning(clock)), not(eq(opacity, 1))),
                    [
                        set(state.finished, 0),
                        set(state.time, 0),
                        set(state.position, opacity),
                        set(state.frameTime, 0),
                        set(config.toValue, 1),
                        startClock(clock),
                        cond(eq(opacity, 0), call([], () => timingConfig.setVisiable(true))),
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
                        stopClock(clock),
                        cond(eq(opacity, 0), call([], () => timingConfig.setVisiable(false))),
                        log(`${name} : hide stopClock`, clockRunning(clock)),
                    ]
                ),
            ]
        ),
        log(`${name} : end opacity`, opacity),
        log(`${name} : end clockRunning`, clockRunning(clock)),
        opacity,
    ]);

    return showTiming;
}
