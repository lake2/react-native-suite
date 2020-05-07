import * as React from "react";
import Animated from "react-native-reanimated";
import { StyleSheet, ViewStyle } from 'react-native';

import { runShowTiming } from "../../animations";

interface OverlayProps {
    show: boolean,
    style?: Animated.AnimateStyle<ViewStyle>
}

export const Overlay: React.FC<OverlayProps> = React.memo(function Overlay(props) {
    const backgroundColor = props.style?.backgroundColor ?? "rgba(0, 0, 0, 0.7)";
    const [visiable, setVisiable] = React.useState(false);
    const animation = React.useMemo(() => runShowTiming({ name: "Overlay", setVisiable }), []);

    Animated.useCode(() => props.show ? Animated.set(animation.show, 1) : Animated.set(animation.show, 0), [props.show]);

    return (
        <Animated.View style={[props.style, style.container, { backgroundColor, opacity: animation.opacity }, !visiable && style.hide]} />
    );
});

const style = StyleSheet.create({
    container: { position: "absolute", top: 0, left: 0, bottom: 0, right: 0, flex: 1 },
    hide: { display: "none", zIndex: -99 }
})
