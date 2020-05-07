// create by LH (lake2@qq.com) at 2020-04-11 13:23:03
import * as React from "react";
import { StyleSheet, View, Text, StyleProp, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
    title: string,
    style?: StyleProp<ViewStyle>
    onPress: () => void
}

export const Button: React.FunctionComponent<Props> = React.memo(function Button(props) {
    return (
        <TouchableOpacity style={[props.style, { zIndex: 10 }]} onPress={props.onPress}>
            <View style={style.container}>
                <Text style={style.text}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    );
});

const style = StyleSheet.create({
    container: { height: 30, backgroundColor: "blue", paddingHorizontal: 20, justifyContent: "center", borderRadius: 6 },
    text: { color: "white" },
});
