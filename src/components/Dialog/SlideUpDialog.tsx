// create by LH (lake2@qq.com) at 2020-04-02 16:15:43
import * as React from 'react';
import Animated from "react-native-reanimated";
import { StyleSheet, ViewStyle } from 'react-native';

import { Overlay } from '../Overlay';
import { runSlideTiming } from './runSlideTiming';

interface SlideUpDialog {
    show: boolean,
    height: number,
    style?: Animated.AnimateStyle<ViewStyle>
}

export const SlideUpDialog: React.FunctionComponent<SlideUpDialog> = React.memo(function SlideUpDialog(props) {
    const [visiable, setVisiable] = React.useState(false);
    const animation = React.useMemo(() => runSlideTiming({ setVisiable, height: props.height }), []);

    Animated.useCode(() => props.show ? Animated.set(animation.show, 1) : Animated.set(animation.show, 0), [props.show]);

    return (
        <Animated.View style={[props.style, style.container, !visiable && style.hide]}>
            <Overlay show={props.show} />
            <Animated.View style={[style.dialog, { transform: [{ translateY: animation.translateY }] as any }]}>
                {props.children}
            </Animated.View>
        </Animated.View>
    );
});

const style = StyleSheet.create({
    container: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },
    dialog: { position: "absolute", left: 0, bottom: 0, zIndex: 2, width: "100%", backgroundColor: "transparent" },
    hide: { display: "none", zIndex: -99 }
})
