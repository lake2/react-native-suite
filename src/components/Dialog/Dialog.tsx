import * as React from 'react';
import Animated from "react-native-reanimated";
import { StyleSheet } from 'react-native';

import { Overlay } from '../Overlay';
import { DialogAnimation } from './DialogAnimation';

interface DialogProps {
    show: boolean,
    zIndex?: [number, number]
}

export const Dialog: React.FunctionComponent<DialogProps> = React.memo(function Dialog(props) {
    const zIndex = props.zIndex ?? [-1, 1];
    const animation = React.useRef(new DialogAnimation(zIndex));

    Animated.useCode(() => props.show ? Animated.set(animation.current.show, 1) : Animated.set(animation.current.show, 0), [props.show]);

    return (
        <Animated.View style={[style.container, { zIndex: animation.current.zIndex }]}>
            <Overlay show={props.show} />
            <Animated.View style={[style.dialog, {
                opacity: animation.current.opacity,
                transform: [{ scaleX: animation.current.scaleX, scaleY: animation.current.scaleY }] as any
            }]}>
                {props.children}
            </Animated.View>
        </Animated.View>
    );
});

const style = StyleSheet.create({
    container: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, alignItems: "center", justifyContent: "center", },
    dialog: { position: "relative", zIndex: 2 },
})
