// create by LH (lake2@qq.com) at 2020-04-02 16:15:43
import * as React from 'react';
import Animated from "react-native-reanimated";
import { StyleSheet } from 'react-native';

import { Overlay } from '../Overlay';
import { SlideUpDialogAnimation } from './SlideUpDialogAnimation';

interface SlideUpDialog {
    show: boolean,
    height: number
    zIndex?: [number, number]
}

export const SlideUpDialog: React.FunctionComponent<SlideUpDialog> = React.memo(function SlideUpDialog(props) {
    const zIndex = props.zIndex ?? [-1, 1];
    const animation = React.useRef(new SlideUpDialogAnimation(zIndex, props.height));

    Animated.useCode(() => props.show ? Animated.set(animation.current.show, 1) : Animated.set(animation.current.show, 0), [props.show]);

    return (
        <Animated.View style={[style.container, { zIndex: animation.current.zIndex }]}>
            <Overlay show={props.show} />
            <Animated.View style={[style.dialog, { transform: [{ translateY: animation.current.translateY }] as any }]}>
                {props.children}
            </Animated.View>
        </Animated.View>
    );
});

const style = StyleSheet.create({
    container: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },
    dialog: { position: "absolute", left: 0, bottom: 0, zIndex: 2, width: "100%", backgroundColor: "transparent" },
})
