import * as React from 'react';
import Animated from "react-native-reanimated";
import { StyleSheet, ViewStyle, StyleProp, View } from 'react-native';

import { runDialogTiming } from './runDialogTiming';
import { Overlay } from '../Overlay';

interface DialogProps {
    show: boolean,
    style?: StyleProp<ViewStyle>,
}

export const Dialog: React.FunctionComponent<DialogProps> = React.memo(function Dialog(props) {
    const [visiable, setVisiable] = React.useState(false);
    const animation = React.useMemo(() => runDialogTiming(setVisiable), []);

    Animated.useCode(() => props.show ? Animated.set(animation.show, 1) : Animated.set(animation.show, 0), [props.show]);

    return (
        <View style={[props.style, style.container, !visiable && style.hide]}>
            <Overlay show={props.show} style={{ zIndex: 1 }} />
            <Animated.View style={[style.dialog, {
                opacity: animation.opacity,
                transform: [{ scaleX: animation.scaleX, scaleY: animation.scaleY }] as any
            }]}>
                {props.children}
            </Animated.View>
        </View>
    );
});

const style = StyleSheet.create({
    container: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, alignItems: "center", justifyContent: "center", },
    dialog: { position: "relative", zIndex: 2 },
    hide: { display: "none", zIndex: -99 }
})
