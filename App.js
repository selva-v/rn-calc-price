import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import PriceCalculator from './src/screens/PriceCalculator';

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode='none'>
        <Stack.Screen name='Home' component={PriceCalculator} options={{title: 'Price Calculator'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
