// create by LH (lake2@qq.com) at 2020-04-11 13:23:03
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { useStackNav } from '../../hooks';
import { Screen } from '../../constants';
import { Button } from '../../components';


export const Home: React.FunctionComponent = React.memo(function Home(props) {
    const { push } = useStackNav();
    return (
        <ScrollView style={style.container.root} contentContainerStyle={{ alignItems: "center" }}>
            <Button title="Dialog" onPress={() => push(Screen.DialogTest)} />
        </ScrollView>
    );
});

const style = {
    container: StyleSheet.create({
        root: {}
    }),
}
