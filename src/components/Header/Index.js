import {StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import React from 'react';
import {
  ProfileEditIcon,
  AreaIcon,
  LocationIcon,
  PersonIcon,
  SmallPersonIcon,
  MedIcon,
  PhoneIcon,
  CheckIcon,
  AmbulanceIcon,
  MedIconBlue,
  AmbulanceIconGreen,
  EmptyImageSvg,
  BackIcon,
  LogoutIcon,
} from '../../assets/SVG/Svg';

const Header = ({lefttext, lefticon, middletext, righttext,navigation}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        height: '12%',
        alignItems: 'center',
      }}>
    
      <TouchableOpacity
        onPress={() => {
       //   navigation.navigate('homeName');
        }}>
        <BackIcon style={{width: 30, height: 30, marginHorizontal: 15}} />
      </TouchableOpacity>

      <View>
        {middletext && (
          <Text
            style={{
              justifyContent: 'center',
              alignSelf: 'center',
              marginHorizontal: 75,
              fontSize: 14,
              fontWeight: '700',
              color:"#2B2F41"
            }}>
            {middletext}
          </Text>
        )}
      </View>
      {/* { righttext &&    <Text>{righttext}</Text> } */}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
