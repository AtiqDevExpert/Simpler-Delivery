import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import styles from '../styles';
import Icon1 from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {DrawerActions} from '@react-navigation/native';
import {images} from '../../../../utils/Resource';
import {horizontalScale} from '../../../../components/basicStyles';

const Header = ({props}) => {
  const theme = useSelector(state => state.theme);
  const {user: {user = {}} = {}} = useSelector(state => state.user);
  const handleDrawerToggle = () => {
    props.navigation.dispatch(DrawerActions.toggleDrawer());
  };
  return (
    <View style={styles.headerWrapper}>
      <TouchableOpacity
        onPress={handleDrawerToggle}
        style={[styles.drawerButton, {backgroundColor: theme.font_white}]}>
        <Icon1 name="menu" size={hp('3.5%')} color={theme.font_main} />
      </TouchableOpacity>
      <Image
        source={images.logo}
        style={styles.logoImage}
        resizeMode="contain"
        borderRadius={horizontalScale(15)}
      />
      <TouchableOpacity
        onPress={handleDrawerToggle}
        style={[styles.drawerButton, {backgroundColor: theme.font_white}]}>
        <Image
          source={user.photoURL ? {uri: user.photoURL} : images.user}
          style={styles.userImage}
          resizeMode="contain"
          borderRadius={horizontalScale(15)}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
