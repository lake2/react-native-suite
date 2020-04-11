// create by LH (lake2@qq.com) at 2020-04-11 16:15:13
import * as React from 'react';
import { StyleSheet, View, StatusBar, Text, Image } from 'react-native';
import { getStatusBarHeight } from "react-native-status-bar-height";
import { TouchableOpacity } from 'react-native-gesture-handler';


interface Props {
    title?: string,
    left?: JSX.Element,
    center?: JSX.Element,
    right?: JSX.Element,
    onBack?: () => void,
}
export const StatusBarHeight = getStatusBarHeight();
export const HeaderHeight = StatusBarHeight + 44;
export const HeaderZindex = 5;

export const Header: React.FunctionComponent<Props> = React.memo(function Header(props) {
    return (
        <React.Fragment>
            <View style={[style.container, style.bg]}>
                <StatusBar barStyle={"dark-content"} translucent={true} backgroundColor="transparent" />

                <View style={[style.guide, { height: HeaderHeight - StatusBarHeight }]}>
                    <View style={[style.item, style.center]}>
                        {props.center ?? <Text style={style.title}>{props.title || ""}</Text>}
                    </View>

                    <View style={[style.item, style.left]}>
                        {props.onBack ?
                            <TouchableOpacity style={style.left_touch} onPress={props.onBack}>
                                <Image style={style.left_back} source={require("./images/back.png")} />
                            </TouchableOpacity>
                            :
                            props.left ?? null
                        }
                    </View>

                    <View style={[style.item, style.right]}>
                        {props.right}
                    </View>
                </View>
            </View>
        </React.Fragment>
    );
});

const style = StyleSheet.create({
    container: { paddingTop: StatusBarHeight, position: "absolute", zIndex: HeaderZindex, left: 0, right: 0, top: 0 },
    bg: { backgroundColor: "white" },
    guide: { position: "relative" },
    item: { position: "absolute", height: "100%" },
    left: { top: 0, left: 0 },
    left_touch: { width: "100%", height: "100%", paddingHorizontal: 15, display: "flex", justifyContent: "center" },
    left_back: { width: 20, height: 20 },
    right: { top: 0, right: 0 },
    center: { left: 0, right: 0, top: 0, justifyContent: "center", alignItems: "center" },
    title: { fontSize: 18, fontWeight: "500", color: "black" },
});
