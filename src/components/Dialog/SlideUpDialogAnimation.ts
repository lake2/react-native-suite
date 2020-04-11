// create by LH (lake2@qq.com) at 2020-04-02 16:15:49
import Animated, { Easing } from "react-native-reanimated";

const { cond, block, set, Value, interpolate } = Animated;

import { log, runShowTiming } from "../../animations";

export class SlideUpDialogAnimation {
    zIndex: Animated.Node<number>;
    translateY: Animated.Node<number>;
    show = new Value(0);

    constructor(zIndexConfig: [number, number], height: number) {
        const translateY = new Value(height);

        const showTiming = runShowTiming({ show: this.show, zIndexConfig, name: "SlideUpDialogAnimation" });

        this.zIndex = showTiming.zIndex;

        this.translateY = block([
            cond(
                this.show,
                [set(translateY, interpolate(showTiming.opacity, { inputRange: [0, 1], outputRange: [height, 0] }))],
                [set(translateY, interpolate(showTiming.opacity, { inputRange: [0, 1], outputRange: [height, 0] }))],
            ),
            log("SlideUpDialogAnimation : translateY", translateY),
            translateY
        ]);
    }
}
