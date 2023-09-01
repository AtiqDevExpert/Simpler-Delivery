import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeStack from './HomeStack';
import ProfileScreen from '../screens/Profile/Profile';
// import SettingsScreen from './screens/SettingsScreen';

//Screen names
const homeName = "Home";
const profileName = "Profile";
const settingsName = "Settings";

const Tab = createBottomTabNavigator();

function BottomNavigation() {
  return (
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === profileName) {
              iconName = focused ? 'list' : 'list-outline';

            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        // screenOptions={{
        //   activeTintColor: 'tomato',
        //   inactiveTintColor: 'grey',
        //   labelStyle: { paddingBottom: 10, fontSize: 10 },
        //   style: { padding: 10, height: 70}
        // }}
        tabBarOptions={{
    activeTintColor: 'blue',
    inactiveTintColor: 'grey',
    labelStyle: {
       paddingBottom: 10, 
       fontSize: 10 ,
     
    },
         style: { padding: 10, height: 70}
  }}
        >


        <Tab.Screen options={{headerShown:false}} name={homeName} component={HomeStack} />
        <Tab.Screen options={{headerShown:false}} name={profileName} component={ProfileScreen} />
    

      </Tab.Navigator>
        );
}

export default BottomNavigation;