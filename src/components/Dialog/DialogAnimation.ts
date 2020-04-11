import Animated, { Easing } from "react-native-reanimated";

const { cond, block, set, Value, interpolate } = Animated;

import { log, runShowTiming } from "../../animations";

export class DialogAnimation {
    opacity: Animated.Node<number>;
    zIndex: Animated.Node<number>;
    scaleX: Animated.Node<number>;
    scaleY: Animated.Node<number>;
    show = new Value(0);

    constructor(zIndexConfig: [number, number]) {
        const scaleX = new Value(0);
        const scaleY = new Value(0);

        const showTiming = runShowTiming({ show: this.show, zIndexConfig, name: "DialogAnimation" });

        this.opacity = showTiming.opacity;

        this.zIndex = showTiming.zIndex;

        this.scaleX = block([
            cond(
                this.show,
                [set(scaleX, interpolate(showTiming.opacity, { inputRange: [0, 1], outputRange: [0.7, 1] }))],
                [set(scaleX, interpolate(showTiming.opacity, { inputRange: [0, 1], outputRange: [0.9, 1] }))],
            ),
            log("DialogAnimation : scaleX", scaleX),
            scaleX
        ]);

        this.scaleY = block([
            cond(
                this.show,
                [set(scaleY, interpolate(showTiming.opacity, { inputRange: [0, 1], outputRange: [0.7, 1] }))],
                [set(scaleY, interpolate(showTiming.opacity, { inputRange: [0, 1], outputRange: [0.9, 1] }))],
            ),
            log("DialogAnimation : scaleY", scaleY),
            scaleY
        ]);
    }
}
