import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home/Home/Home';
import MapView from '../screens/Home/MapView/MapView';
import { LogBox } from "react-native"
LogBox.ignoreAllLogs('Warnings')
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
      <Stack.Navigator 
        initialRouteName='Home'
        screenOptions={{
            headerShown:false
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="MapView" component={MapView} />
      </Stack.Navigator>
  );
}

export default HomeStack;