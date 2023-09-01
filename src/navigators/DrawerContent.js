import * as React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {useSelector, useDispatch} from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {texts} from '../utils/Resource';
import Icon1 from 'react-native-vector-icons/Feather';
import LogOut from 'react-native-vector-icons/AntDesign';
import {ChangeTheme} from '../redux/action/theme';
import {LogOutAPI} from '../redux/action/user';
import TokenManager from '../utils/TokenManager';
import { LogBox } from "react-native"
LogBox.ignoreAllLogs('Warnings')
const CustomDrawerContent = props => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme);

  const handleHomeButtonCLick = () => {
    props.navigation.navigate('Home');
  };

  const handleThemeButtonCLick = () => {};
  const logoutHandel = async () => {
    await TokenManager.deleteToken();
    dispatch(LogOutAPI());
  };
  const logoutHandler = () => {
    Alert.alert(
      'User Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: logoutHandel,
        },
      ],
      {cancelable: false},
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.background_main}}>
      <View style={[styles.userInfoHolder, {borderColor: theme.border_main}]}>
        <Text style={[styles.userNametext, {color: theme.color_blue}]}>
          John Doe
        </Text>
        <Text style={[styles.userPositiontext, {color: theme.font_main}]}>
          Crew Member
        </Text>
      </View>

      <TouchableOpacity
        onPress={handleHomeButtonCLick}
        style={styles.homeButtonContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon1 name="home" size={hp('2.5%')} color={theme.icon_light} />
          <Text style={[styles.homeButtontext, {color: theme.font_main}]}>
            Home
          </Text>
        </View>
        <Icon1
          name="chevron-right"
          size={hp('2.8%')}
          color={theme.icon_light}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleThemeButtonCLick}
        style={styles.homeButtonContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon1 name="home" size={hp('2.5%')} color={theme.icon_light} />
          <Text style={[styles.homeButtontext, {color: theme.font_main}]}>
            {'Light'} Mode
          </Text>
        </View>
        <Icon1
          name="chevron-right"
          size={hp('2.8%')}
          color={theme.icon_light}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={logoutHandler} style={styles.logout}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={[styles.homeButtontext, {color: theme.font_main}]}>
            Log Out
          </Text>
        </View>
        <LogOut name="logout" size={hp('2.8%')} color={theme.font_main} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: wp('3%'),
    paddingVertical: hp('1%'),
    position: 'absolute',
    bottom: 40,
    width: '90%',
  },
  userInfoHolder: {
    marginTop: hp('4%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: hp('0.07%'),
    paddingBottom: hp('4%'),
  },
  userNametext: {
    letterSpacing: wp('0.2%'),
    ...texts.largeBold,
  },
  userPositiontext: {
    marginTop: hp('0.7%'),
    letterSpacing: wp('0.2%'),
    ...texts.regular,
  },
  homeButtontext: {
    letterSpacing: wp('0.2%'),
    ...texts.regular,
    marginLeft: wp('5%'),
  },
  homeButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: wp('3%'),
    borderBottomWidth: hp('0.07%'),
    paddingVertical: hp('1%'),
  },
});
