import Animated from "react-native-reanimated";

const { cond, block, set, Value, interpolate } = Animated;

import { log, runShowTiming, ShowTiming } from "../../animations";

export interface DialogTiming extends ShowTiming {
    scaleX: Animated.Node<number>
    scaleY: Animated.Node<number>
}

export function runDialogTiming(setVisiable: (value: any) => any) {
    const dialogTiming = runShowTiming({ name: "runDialogTiming", setVisiable }) as DialogTiming;
    const scaleX = new Value(0);
    const scaleY = new Value(0);

    dialogTiming.scaleX = block([
        cond(
            dialogTiming.show,
            [set(scaleX, interpolate(dialogTiming.opacity, { inputRange: [0, 1], outputRange: [0.7, 1] }))],
            [set(scaleX, interpolate(dialogTiming.opacity, { inputRange: [0, 1], outputRange: [0.9, 1] }))],
        ),
        log("runDialogTiming : scaleX", scaleX),
        scaleX
    ]);

    dialogTiming.scaleY = block([
        cond(
            dialogTiming.show,
            [set(scaleY, interpolate(dialogTiming.opacity, { inputRange: [0, 1], outputRange: [0.7, 1] }))],
            [set(scaleY, interpolate(dialogTiming.opacity, { inputRange: [0, 1], outputRange: [0.9, 1] }))],
        ),
        log("runDialogTiming : scaleY", scaleY),
        scaleY
    ]);

    return dialogTiming;
}
