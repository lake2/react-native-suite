// create by LH (lake2@qq.com) at 2020-04-01 18:57:30
import * as React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from "@react-navigation/native";

import { throttle } from './utils';

export function useStackNav<T extends StackNavigationProp<any, any>>() {
    const navigation = useNavigation<T>();
    const goback = React.useMemo(() => navigation.goBack.bind(navigation), [navigation]);
    const push = React.useMemo(() => throttle(navigation.push.bind(navigation)), [navigation]);
    const navigate = React.useMemo(() => throttle(navigation.navigate.bind(navigation)), [navigation]);

    return { navigation, goback, push, navigate };
}
