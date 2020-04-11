import Animated from "react-native-reanimated";

const { Value } = Animated;

import { runShowTiming } from "../../animations";

export class OverlayAnimation {
    opacity: Animated.Node<number>;
    zIndex: Animated.Node<number>;
    show = new Value(0);

    constructor(zIndexConfig: [number, number]) {
        const showTiming = runShowTiming({ show: this.show, zIndexConfig, name: "OverlayAnimation" });

        this.opacity = showTiming.opacity;

        this.zIndex = showTiming.zIndex;
    }
}
