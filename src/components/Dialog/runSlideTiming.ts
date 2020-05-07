// create by LH (lake2@qq.com) at 2020-04-02 16:15:49
import Animated from "react-native-reanimated";

const { cond, block, set, Value, interpolate } = Animated;

import { log, runShowTiming, ShowTiming } from "../../animations";

export interface SlideTiming extends ShowTiming {
    translateY: Animated.Node<number>
}

export function runSlideTiming(params: { setVisiable: (value: any) => any, height: number }) {
    const { setVisiable, height } = params;
    const slideTiming = runShowTiming({ name: "SlideTiming", setVisiable }) as SlideTiming;
    const translateY = new Value(height);

    slideTiming.translateY = block([
        cond(
            slideTiming.show,
            [set(translateY, interpolate(slideTiming.opacity, { inputRange: [0, 1], outputRange: [height, 0] }))],
            [set(translateY, interpolate(slideTiming.opacity, { inputRange: [0, 1], outputRange: [height, 0] }))],
        ),
        log("runSlideTiming : translateY", translateY),
        translateY
    ]);

    return slideTiming;
}
