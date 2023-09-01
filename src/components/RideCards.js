import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import { View, Text, StyleSheet , TouchableOpacity } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import { texts } from '../utils/Resource';
import { horizontalScale, verticalScale } from './basicStyles';


const RideCards = ({ item, index }) => {
  const navigation = useNavigation();
  const theme = useSelector(state => state.theme);
  return (
    <>
      <View style={styles.mainContainer}>
        <View style={styles.flexBox}>
          <View style={styles.flexBox}>
            <Text style={[styles.homePageGeeingText, { color: theme.font_main }]}>
              {`${item.patientName} `}
            </Text>
            <Text style={[styles.homePageSubText, { color: theme.font_main }]}>
              ({item.type}-Trip)
            </Text>
          </View>
          <View style={{ width: '40%' }}>
            <Text
              style={[
                styles.homePageGeeingText,
                { color: theme.font_main },
              ]}>
              {moment(item.date).format('dddd - MMMM,DD YYYY')}
            </Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.flex}>
          <View style={[styles.flex, { width: '20%' }]}>
            <View>
              <Text
                style={[
                  styles.homePageSubText,
                  styles.marginSpace,
                  { color: theme.font_main },
                ]}>
                {moment(item.pickupTime).format('hh:mm')}
              </Text>
              <Text style={[styles.homePageSubText, { color: theme.font_main }]}>
                {moment(item.dropoffTime).format('hh:mm')}
              </Text>
            </View>
            <View style={styles.verticleDivider} />
          </View>
          <View>
            <View style={[styles.flexBox, styles.marginSpace, { width: '80%' }]}>
              <Text
                style={[
                  styles.homePageSubText,
                  {
                    width: '80%',
                    color: theme.font_main,
                  },
                ]}>
                {item.pickupLocation}
              </Text>
              <Text
                style={[styles.homePageGeeingText, { color: theme.font_main }]}>
                {item.travelTime}
              </Text>
            </View>
            <View style={[styles.flexBox, { width: '80%' }]}>
              <Text
                style={[
                  styles.homePageSubText,
                  {
                    width: '80%',
                    color: theme.font_main,
                  },
                ]}>
                {item.dropoffLocation}
              </Text>
              <Text
                style={[styles.homePageGeeingText, { color: theme.font_main }]}>
                {item.mileage}
              </Text>
            </View>
          </View>
        </View>
        {item.status !== 'completed' && item.status !== 'cancelled' && (
          <TouchableOpacity

            onPress={
              () => {
                navigation.navigate('MapView', { item })
              }
            }
            style={[
              styles.button,
              {
                backgroundColor: theme.color_darkBlue,
              },
              styles.buttonWrapper,
            ]}>
            <Text style={[styles.time, { color: theme.font_white , width:100, textAlign:'center'}]}>
              Start Route
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

export default RideCards;

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: hp('2%'),
    alignSelf: 'center',
    borderRadius: hp('1.2%'),
    backgroundColor: 'white',
    shadowColor: '#171717',
    shadowOffset: { width: -5, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 7,
    elevation: 5,
    paddingHorizontal: hp('2.2%'),
    marginHorizontal: hp('4%'),
    paddingVertical: hp('1.2%'),
  },
  mainContainer2: {
    marginTop: hp('2%'),
    alignSelf: 'center',
    height: hp('14%'),
    width: wp('90%'),
    borderRadius: hp('1.2%'),
    backgroundColor: 'white',
    shadowColor: '#171717',
    shadowOffset: { width: -5, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: 'gray',
    marginVertical: hp('1.2%'),
  },
  verticleDivider: {
    width: wp('1.5%'),
    height: wp('15%'),
    backgroundColor: 'gray',
    marginLeft: hp('0.8%'),
    opacity: 0.6,
    borderRadius: 10,
    marginRight: 10,
  },
  homePageSubText: {
    letterSpacing: wp('0.1%'),
    ...texts.regular,
  },
  marginSpace: {
    marginBottom: wp('4%'),
  },
  flexBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  homePageGeeingText: {
    letterSpacing: wp('0.1%'),
    ...texts.smallBold,
  },
  button: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
    borderRadius: horizontalScale(10),
    height: verticalScale(30),
    marginRight: horizontalScale(10),
    marginVertical: verticalScale(10),
  },
  time: {
    ...texts.regular,
  },
});
