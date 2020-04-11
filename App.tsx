import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import { Screen } from './src/constants';
import { Home } from './src/screens/Home';
import { DialogTest } from './src/screens/Dialog';

const Stack = createStackNavigator();
const options = { ...TransitionPresets.SlideFromRightIOS };

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode="none">
                {/* <Stack.Screen name={Screen.Home} component={Home} options={options} /> */}
                <Stack.Screen name={Screen.DialogTest} component={DialogTest} options={options} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
