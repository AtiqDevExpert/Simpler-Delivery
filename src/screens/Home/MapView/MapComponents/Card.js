import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Button } from 'react-native';
import styles from '../styles';
import Location from 'react-native-vector-icons/Entypo';
import Dot from 'react-native-vector-icons/Octicons';
import { useSelector } from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { verticalScale } from '../../../../components/basicStyles';

const Card = ({ onGo, item }) => {
  const [selectedData, setSelectedData] = useState(item);
  useEffect(() => {
    setSelectedData(item)
  }, [item])
  const theme = useSelector(state => state.theme);
  return (
    <>
      <View style={[styles.cardWrapper, { backgroundColor: theme.font_white }]}>
        <Text style={[styles.titleHeader, { color: theme.font_main }]}>
          Upcoming Trip
        </Text>
        <View style={styles.textCombo}>
          <Text style={[styles.name, { color: theme.font_main }]}>
            {`${item.patientName} `}({item.type}-Trip)
          </Text>
          <Text style={[styles.time, { color: theme.color_red }]}>
            {/* Leave by:09:05 */}
          </Text>
        </View>

        <View style={[styles.divider, { backgroundColor: theme.color_gray }]} />
        <View style={styles.flexBox}>
          <View style={{ alignItems: 'center' }}>
            <Dot name="dot-fill" size={hp('3.5%')} color={theme.color_blue} />
            <View style={{ marginVertical: verticalScale(5) }}>
              {[1, 2, 3].map(i => (
                <Dot
                  key={i}
                  name="dot-fill"
                  size={hp('2%')}
                  color={theme.color_gray}
                />
              ))}
            </View>
            <Location
              name="location-pin"
              size={hp('3.5%')}
              color={theme.color_green}
            />
          </View>
          <View style={styles.flexBoxColumn}>
            <View>
              <View style={styles.flexBox}>
                <View style={[styles.textCombo, { width: '95%' }]}>
                  <Text style={[styles.name, { color: theme.font_main }]}>
                    Pickup Location
                  </Text>
                  <Text style={[styles.time, { color: theme.font_main }]}>
                    {item.travelTime}
                  </Text>
                </View>
              </View>
              <View style={styles.flexBox}>
                <View style={[styles.textCombo, { width: '95%' }]}>
                  <Text
                    style={[styles.name, { color: theme.font_main, width: '70%' }]}>
                    {item.pickupLocation}
                  </Text>
                  <Text style={[styles.time, { color: theme.font_main }]}>
                    {item.mileage}
                  </Text>
                </View>
              </View>
            </View>
            <View style={[styles.textCombo, { width: '70%' }]}>
              <View>
                <Text style={[styles.name, { color: theme.font_main }]}>
                  Destination
                </Text>
                <Text style={[styles.name, { color: theme.font_main }]}>
                  {item.dropoffLocation}
                </Text>
              </View>
              {item.status === 'scheduled' && (
                <TouchableOpacity
                  onPress={onGo}
                  style={[
                    styles.button,
                    {
                      backgroundColor: theme.color_darkBlue,
                    },
                  ]}>
                  <Text style={[styles.time, { color: theme.font_white }]}>Go</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>

    </>


  );
};

export default Card;
