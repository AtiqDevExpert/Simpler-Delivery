import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from "./DrawerContent";
import Home from '../screens/Home/Home/Home';
import MapView from '../screens/Home/MapView/MapView';
import { LogBox } from "react-native"
LogBox.ignoreAllLogs('Warnings')
const Drawer = createDrawerNavigator();

function DrawerStack() {
    return (
        <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerShown: false
            }}
        >
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="MapView" component={MapView} />
        </Drawer.Navigator>
    );
}

export default DrawerStack;