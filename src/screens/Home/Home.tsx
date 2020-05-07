// create by LH (lake2@qq.com) at 2020-04-11 13:23:03
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { useStackNav } from '../../hooks';
import { Screen } from '../../constants';
import { Button, Overlay } from '../../components';
import { HeaderHeight, Header, HeaderZindex } from '../Header';


export const Home: React.FunctionComponent = React.memo(function Home(props) {
    const { push } = useStackNav();
    const [show, setShow] = React.useState(false);
    return (
        <View style={style.container.root}>
            <Header />
            <Overlay show={show} style={style.container.overlay} />
            <Button style={style.container.button} title="Dialog" onPress={() => push(Screen.DialogTest)} />
            <View style={{ zIndex: 50 }}>
                <Button style={style.container.button} title="Overly" onPress={() => setShow(!show)} />
            </View>
        </View>
    );
});

const style = {
    container: StyleSheet.create({
        root: { paddingTop: HeaderHeight, flex: 1, alignItems: "center" },
        button: { marginTop: 20 },
        overlay: { zIndex: HeaderZindex + 1 },
    }),
}
