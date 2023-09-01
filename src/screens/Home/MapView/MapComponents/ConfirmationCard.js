import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, } from 'react-native';

import styles from '../styles';
import { useSelector } from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
const ConfirmationCard = ({
  item = {},
  status,
  onConfirmationHandler,
  setStatus
}) => {
  const theme = useSelector(state => state.theme);
  return (
    <View style={[styles.cardWrapper, { backgroundColor: theme.font_white }]}>


      <View style={styles.textCombo}>

        <Text style={[styles.time, { color: theme.font_main }]}>
          Navigating To
        </Text>
        <Text style={[styles.time, { color: theme.font_main }]}>
          {item.travelTime}
        </Text>
      </View>
      <View style={styles.textCombo}>
        <Text style={[styles.locationText, { color: theme.color_green }]}>
          {`${item.patientName} `}
          {/* <Text style={{ color:'black'}}>4567</Text> */}
        </Text>
        <Text style={[styles.locationText, { color: theme.font_main }]}>
          {item.mileage}
        </Text>
      </View>
      {
        status === "Arrived at pickup" ?
          <Text style={[styles.name, { color: theme.font_main }]}>
            {item.pickupLocation}
          </Text>
          :
          status === "Start ride" ?
            <Text Text style={[styles.name, { color: theme.font_main }]}>
              {item.dropoffLocation}
            </Text>
            :
            status === "Arrived at dropoff" ?
              <Text Text style={[styles.name, { color: theme.font_main }]}>
                {item.dropoffLocation}
              </Text>
              :
              null
      }
      {status !== 'Completed' && (
        <TouchableOpacity
          onPress={onConfirmationHandler}
          style={[
            styles.button,
            {
              backgroundColor: theme.color_darkBlue,
            },
            styles.buttonWrapper,
          ]}>
          <Text style={[styles.time, { color: theme.font_white }]}>{status}</Text>
        </TouchableOpacity>
      )
      }
    </View >
  );
};

export default ConfirmationCard;
