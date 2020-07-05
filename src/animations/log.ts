import Animated, { Easing } from "react-native-reanimated";

const { cond, debug } = Animated;

export const logConfig = {
    show: __DEV__ && false,
    filter: undefined as ((text: string) => boolean) | undefined
}

export function log(message: string, value: Animated.Node<any>): Animated.Node<any> {
    let show = 1;
    if (logConfig.show) {
        if (logConfig.filter && !logConfig.filter(message)) {
            show = 0;
        }
    } else {
        show = 0;
    }
    return cond(show, debug(message, value));
}


// logConfig.filter = (text) => text.startsWith("Overlay")
logConfig.filter = (text) => true
