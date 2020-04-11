import * as React from "react";
import { StyleSheet } from 'react-native';
import Animated from "react-native-reanimated";

import { OverlayAnimation } from './OverlayAnimation';

interface OverlayProps {
    show: boolean,
    zIndex?: [number, number]
    backgroundColor?: string,
}

export const Overlay: React.FunctionComponent<OverlayProps> = React.memo(function Overlay(props) {
    const backgroundColor = props.backgroundColor ?? "rgba(0, 0, 0, 0.7)";
    const zIndex = props.zIndex ?? [-1, 1];
    const animation = React.useRef(new OverlayAnimation(zIndex));

    Animated.useCode(() => props.show ? Animated.set(animation.current.show, 1) : Animated.set(animation.current.show, 0), [props.show]);

    return (
        <Animated.View style={[style.contsiner, { backgroundColor, opacity: animation.current.opacity, zIndex: animation.current.zIndex }]} />
    );
});

const style = StyleSheet.create({
    contsiner: { position: "absolute", top: 0, left: 0, bottom: 0, right: 0, flex: 1 }
})
