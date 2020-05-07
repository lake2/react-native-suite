// create by LH (lake2@qq.com) at 2020-04-11 11:20:12
import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { Dialog, Button, SlideUpDialog } from '../../components';
import { Header, HeaderHeight, HeaderZindex } from '../Header';
import { useStackNav } from '../../hooks';

export const DialogTest: React.FunctionComponent = React.memo(function DialogTest(props) {
    const { goback } = useStackNav();
    const [showDialog, setShowDialog] = React.useState(false);
    const [showSlideUpDialog, setShowSlideUpDialog] = React.useState(false);

    return (
        <View style={style.container.root}>
            <Header onBack={goback} title="DialogTest" />

            <Button style={{ marginTop: 30 }} title="open Dialog 1" onPress={() => setShowDialog(v => !v)} />
            <View style={{ position: "relative", zIndex: 10 }}>
                <Button style={{ marginTop: 30 }} title="open  Dialog 2" onPress={() => setShowDialog(v => !v)} />
            </View>
            <Button style={{ marginTop: 30 }} title="open SlideUpDialog 1" onPress={() => setShowSlideUpDialog(v => !v)} />

            <Dialog show={showDialog} style={{ zIndex: HeaderZindex + 1 }}>
                <View style={{ width: 200, height: 200, backgroundColor: "white", borderRadius: 20, alignItems: "center" }}>
                    <Button style={{ marginTop: 30 }} title="close" onPress={() => setShowDialog(v => !v)} />
                </View>
            </Dialog>

            <SlideUpDialog show={showSlideUpDialog} style={{ zIndex: HeaderZindex + 1 }} height={300}>
                <View style={{ height: 300, backgroundColor: "white", alignItems: "center" }}>
                    <Button style={{ marginTop: 30 }} title="close" onPress={() => setShowSlideUpDialog(v => !v)} />
                </View>
            </SlideUpDialog>
        </View>
    );
});

const style = {
    container: StyleSheet.create({
        root: { flex: 1, alignItems: "center", position: "relative", paddingTop: HeaderHeight }
    }),
};
