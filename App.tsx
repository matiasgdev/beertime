import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Details} from './src/screens/Details';
import {HomeScreen} from './src/screens/HomeScreen';
import 'react-native-gesture-handler';

import {BeersProvider} from './src/store/BeerStore';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {TamaguiProvider} from 'tamagui';
import tamaguiCfg from './tamagui.config';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <GestureHandlerRootView style={{flex: 1}}>
        <TamaguiProvider config={tamaguiCfg}>
          <BeersProvider>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen
                options={{headerShown: false}}
                name="Home"
                component={HomeScreen}
              />
              <Stack.Screen name="Details" component={Details} />
            </Stack.Navigator>
          </BeersProvider>
        </TamaguiProvider>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}

export default App;
