import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Details} from './src/screens/Details';
import {Home} from './src/screens/Home';

import {BeersProvider} from './src/store/BeerStore';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <BeersProvider>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            options={{headerShown: false}}
            name="Home"
            component={Home}
          />
          <Stack.Screen name="Details" component={Details} />
        </Stack.Navigator>
      </BeersProvider>
    </NavigationContainer>
  );
}

export default App;
