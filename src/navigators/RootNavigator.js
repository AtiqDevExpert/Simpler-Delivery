import * as React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import Drawer from './Drawer';
import BottomNavigation from './BottomNavigator'
import AuthStack from './AuthStack';
import { LogBox } from "react-native"
LogBox.ignoreAllLogs('Warnings')
export default function RootNavigator() {
  const user = useSelector(state => state.user);
  return (
    <NavigationContainer>
      {user.IsUserLoggedIn ? <BottomNavigation /> : <AuthStack />}
    </NavigationContainer>
  );
}
