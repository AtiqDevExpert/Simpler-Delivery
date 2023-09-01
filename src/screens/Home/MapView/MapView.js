import React, { useEffect, useState, useRef } from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  Platform,
  Linking,
} from 'react-native';
import styles from './styles';
import Location from 'react-native-vector-icons/Entypo';
import { useSelector, useDispatch } from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import stylesModal from './stylesModal'
import { DrawerActions } from '@react-navigation/native';
import { images } from '../../../utils/Resource';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import ConfirmationCard from './MapComponents/ConfirmationCard';
import Card from './MapComponents/Card';
import Header from './MapComponents/Header';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from '@react-native-community/geolocation';
import PickerButton from '../../../components/Button/pickerButton';
import Modal from 'react-native-modal';
import { UpdateRideStatusAPI } from '../../../redux/action/user';
const GOOGLE_MAPS_APIKEY = 'AIzaSyDeYRRtmStCSHXQBJxZa4t9uB_WXNO55H0';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Dot from 'react-native-vector-icons/Octicons';
import { verticalScale } from '../../../components/basicStyles';
const { width, height } = Dimensions.get('window');
const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
var trip_data = null;
var initialRegion = null;
var destination = null;
var origin = null;
const ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const MapViewScreen = (props) => {

  const {
    route: { params = {} },
    navigation,
  } = props;

  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const theme = useSelector(state => state.theme);

  const { updatedData: { ride = {} } = {} } = useSelector(state => state.user);
  const data = params?.item
  trip_data = data;
  const [selectedData, setSelectedData] = useState(data);

  initialRegion = {
    latitude: +trip_data.dropoffLatitude,
    longitude: +trip_data.dropoffLongitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };


  destination = {
    latitude: +trip_data.dropoffLatitude,
    longitude: +trip_data.dropoffLongitude,
  };
  origin = {
    latitude: +trip_data.pickupLatitude,
    longitude: +trip_data.pickupLongitude,
  };

  const [isConfirm, setIsConfirm] = useState(false);
  const [status, setStatus] = useState('Arrived at pickup');

  const [goModalVisible, setGoModalVisible] = useState(false)

  useEffect(() => {
    // console.log(trip_data, data, selectedData);
    getStatus(data);
    if (data.status == 'scheduled') {
      setIsConfirm(false)
    } else {
      setIsConfirm(true)
    }
    {
      status == "Arrived at pickup" ?
        origin = { latitude: +data.pickupLatitude, longitude: +data.pickupLongitude, }
        :
        destination = {
          latitude: +data.dropoffLatitude,
          longitude: +data.dropoffLongitude,
        }
    };
  }, [data]);

  const distance = unit => {
    if (
      origin.latitude == destination.latitude &&
      origin.longitude == destination.longitude
    ) {
      return 0;
    } else {
      var radlat1 = (Math.PI * origin.latitude) / 180;
      var radlat2 = (Math.PI * destination.latitude) / 180;
      var theta = origin.longitude - destination.longitude;
      var radtheta = (Math.PI * theta) / 180;
      var dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit == 'K') {
        dist = dist * 1.609344;
      }
      return dist;
    }
  };


  useEffect(() => {
    const fetchLocation = Geolocation.getCurrentPosition(
      position => {
        const lat = parseFloat(position.coords.latitude);
        const long = parseFloat(position.coords.longitude);
        const userLocationRegion = {
          latitude: lat,
          longitude: long,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };
        initialRegion = userLocationRegion;
      },
      error =>
        console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 1000,
        distanceFilter: 10,
      },
    );
    return () => Geolocation.clearWatch(fetchLocation);
  }, []);

  const getStatus = (item = {}, change = false) => {
    switch (item.status) {
      case 'arrived':
        if (change) {
          setStatus('Arrived at dropoff');
          setGoModalVisible(true);
        } else {
          setStatus('Start ride');
        }
        return 'in-progress';
      case 'in-progress':
        if (change) {
          setStatus('Compelted');
        } else {
          setStatus('Arrived at dropoff');
        }
        return 'completed';
      default:
      case 'scheduled' && isConfirm:
        if (change) {
          setStatus('Start ride');

        } else {
          setStatus('Arrived at pickup');
        }
        return 'arrived';
    }
  };


  const onGoHandler = () => () => {
    console.log("===>", "here started")
    var status = getStatus(trip_data, true)
    console.log(status)
    console.log("===>", "here completed")
    var tr = trip_data
    tr.status = status
    trip_data = tr

    dispatch(
      UpdateRideStatusAPI({
        navigation: props.navigation,
        rideId: trip_data.id, // The ride id
        status: getStatus(trip_data, true), // The new status - one of [scheduled, started, arrived, in-progress, completed, cancelled]
      }),
    );
    if (trip_data.status === 'in-progress') {
      setGoModalVisible(false);
      navigation.navigate('Home')
    };
  };
  return (
    <>
      <SafeAreaView style={styles.mainContainer}>

        <Header props={props} />
        {
          !isConfirm && trip_data?.status === 'scheduled' ?
            null
            :
            <>
              <View style={{ position: 'absolute', zIndex: 10, right: 15, bottom: `30%`, alignItems: 'center', }}>
                <TouchableOpacity

                  onPress={() => {
                    {
                      status == "Arrived at pickup" ? Linking.openURL(
                        Platform.OS === 'ios'
                          ? `googleMaps://app?saddr=${initialRegion.latitude}+${initialRegion.longitude}&daddr=${origin.latitude}+${origin.longitude}`
                          : `google.navigation:q=${origin.latitude}+${origin.longitude}`,
                      ) : Linking.openURL(
                        Platform.OS === 'ios'
                          ? `googleMaps://app?saddr=${origin.latitude}+${origin.longitude}&daddr=${destination.latitude}+${destination.longitude}`
                          : `google.navigation:q=${destination.latitude}+${destination.longitude}`,
                      )
                    };
                  }
                  }
                  style={{ borderRadius: 100, height: 45, width: 45, backgroundColor: theme.color_darkBlue, alignItems: 'center', }}>
                  <FontAwesome
                    name={'directions'}
                    size={hp('5.5%')}
                    color={theme.font_white}
                  />
                </TouchableOpacity>
                {status == "Arrived at pickup" ?
                  <Text
                    style={[styles.name, {
                      color: theme.color_darkBlue,
                      textAlign: 'left',
                      fontWeight: 'bold',

                    }]}>Navigate {'\n'}To Pickup</Text>
                  :
                  status == "Arrived at dropoff" ?
                    <Text
                      style={[styles.name, {
                        color: theme.color_darkBlue,
                        fontWeight: 'bold',
                        textAlign: 'center',

                      }]}>Navigate {'\n'}To Dropoff</Text> : null
                }
              </View>
            </>
        }

        {trip_data.status !== 'in-progress' ? ( //trip_data.status !== 'in-progress'
          <MapView
            showsUserLocation={true}
            followUserLocation
            loadingEnabled
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            region={initialRegion}
          >
            <Marker
              opacity={0.8}
              tileSize={256}
              description={'Navigating to John Doe'}
              coordinate={{
                latitude: initialRegion.latitude,
                longitude: initialRegion.longitude,
              }}
            >
              <View
                style={[
                  {
                    backgroundColor: theme.font_white,
                  },
                  styles.imageWrapper,
                ]}>
                <Image
                  source={images.location}
                  style={styles.locationImage}
                  borderRadius={20}
                  resizeMode="contain"
                />
              </View>
            </Marker>
            {isConfirm && (
              <>
                <MapViewDirections
                  origin={status == "Arrived at pickup" ? origin : destination}
                  destination={status == "Arrived at pickup" ? origin : destination}
                  apikey={GOOGLE_MAPS_APIKEY}
                  strokeWidth={8}
                  strokeColor={theme.color_green}
                />
                <Marker
                  coordinate={{
                    latitude: status == "Arrived at pickup" ? origin.latitude : destination.latitude,
                    longitude: status == "Arrived at pickup" ? origin.longitude : destination.longitude,
                  }}>
                  <Location
                    name="location-pin"
                    size={hp('5%')}
                    color={theme.color_red}
                  />
                </Marker>
              </>
            )}
          </MapView>
        ) : (
          <MapView
            showsUserLocation={true}
            followUserLocation
            loadingEnabled
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            region={initialRegion}>
            <Marker
              opacity={0.8}
              tileSize={256}
              description={'Navigating to John Doe'}
              coordinate={{
                latitude: origin.latitude,
                longitude: origin.longitude,
              }}
            >
              <View
                style={[
                  {
                    backgroundColor: theme.font_white,
                  },
                  styles.imageWrapper,
                ]}>
                <Image
                  source={images.location}
                  style={styles.locationImage}
                  borderRadius={20}
                  resizeMode="contain"
                />
              </View>
            </Marker>
            <MapViewDirections
              mode="DRIVING"
              origin={status == "Start ride" ? initialRegion : origin}
              destination={status == "Start ride" ? origin : destination}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor="hotpink"
            />
            <Marker
              coordinate={{
                latitude: status == "Start ride" ? origin.latitude : destination.latitude,
                longitude: status == "Start ride" ? origin.longitude : destination.longitude,
              }}>
              <Location
                name="location-pin"
                size={hp('5%')}
                color={theme.color_red}
              />
            </Marker>
          </MapView>

          // <MapboxNavigation
          //   origin={[initialRegion.latitude, initialRegion.longitude]}
          //   destination={[destination.latitude, destination.longitude]}
          //   shouldSimulateRoute={true}
          //   showsEndOfRouteFeedback={true}
          //   onLocationChange={event => {
          //     const {latitude, longitude} = event.nativeEvent;
          //   }}
          //   onRouteProgressChange={event => {
          //     const {
          //       distanceTraveled,
          //       durationRemaining,
          //       fractionTraveled,
          //       distanceRemaining,
          //     } = event.nativeEvent;
          //   }}
          //   onError={event => {
          //     const {message} = event.nativeEvent;
          //     console.log(event.nativeEvent.message)
          //     console.log(event)
          //   }}
          //   onCancelNavigation={() => {
          //     // User tapped the "X" cancel button in the nav UI
          //     // or canceled via the OS system tray on android.
          //     // Do whatever you need to here.
          //   }}
          //   onArrive={() => {
          //     settrip_data({
          //       ...trip_data,
          //       status: 'completed',
          //     });
          //     // Called when you arrive at the destination.
          //   }}
          // />
        )}
        {!isConfirm && trip_data?.status === 'scheduled' ? (
          <Card
            item={trip_data}
            onGo={() => {
              setIsConfirm(!isConfirm)
                ; setGoModalVisible(true)
            }}
          />
        ) : (
          <ConfirmationCard
            status={status}
            item={trip_data}
            isConfirm={isConfirm}
            origin={origin}
            destination={destination}
            onConfirmationHandler={onGoHandler('arrived')}
          />
        )}
      </SafeAreaView>
      <>
        <Modal isVisible={visible}>
          <View style={stylesModal.ModalView}>
            <View style={[stylesModal.cardWrapper, { backgroundColor: theme.font_white }]}>
              <TouchableOpacity
                onPress={() => setVisible(false)}
                style={styles.modalIcon}>
                <FontAwesome
                  name={'times'}
                  size={hp('5.5%')}
                  color={theme.color_darkBlue}
                />
              </TouchableOpacity>
              <Text style={[stylesModal.homePageGeeingText, {
                color: theme.font_main,
              }]}>
                Trip Detail
              </Text>
              <View style={[stylesModal.divider, { backgroundColor: theme.color_gray }]} />
              <View style={stylesModal.flexBox}>
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
                <View style={stylesModal.flexBoxColumn}>
                  <View>
                    <View style={stylesModal.flexBox}>
                      <View style={[stylesModal.textCombo, { width: '95%' }]}>
                        <Text style={[stylesModal.name, { color: theme.font_main }]}>
                          Pickup Location
                        </Text>
                      </View>
                    </View>
                    <View style={stylesModal.flexBox}>
                      <View style={[stylesModal.textCombo, { width: '95%' }]}>
                        <Text
                          style={[stylesModal.name, { color: theme.font_main, width: '65%' }]}>
                          {data.pickupLocation}
                        </Text>
                        <Text style={[stylesModal.time, { color: theme.font_main }]}>
                          {data.travelTime}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View>
                    <View style={stylesModal.flexBox}>
                      <View style={[stylesModal.textCombo, { width: '95%' }]}>
                        <Text style={[stylesModal.name, { color: theme.font_main }]}>
                          Destination
                        </Text>
                      </View>
                    </View>
                    <View style={stylesModal.flexBox}>
                      <View style={[stylesModal.textCombo, { width: '95%' }]}>
                        <Text
                          style={[stylesModal.name, { color: theme.font_main, width: '65%' }]}>
                          {data.dropoffLocation}
                        </Text>
                      </View>
                    </View>
                  </View>
                  {/* <View style={[stylesModal.divider, { backgroundColor: theme.color_gray }]} /> */}
                  {status == "Arrived at pickup" ?
                    <Text style={[stylesModal.homePageGeeing, {
                      color: theme.font_main,
                    }]}>Have you Reach on your Pickup ?</Text>
                    :
                    status == "Arrived at dropoff" ?
                      <Text style={[stylesModal.homePageGeeing, {
                        color: theme.font_main,
                      }]}>Have you Reach on your destination ?</Text> : null
                  }
                </View>
              </View>
              <View style={styles.ModalBtnView}>
                <PickerButton
                  text={'Yes'}
                  color={theme.font_white}
                  fontSize={15}
                  height={30}
                  width={'20%'}
                  marginTop={'5%'}
                  backgroundColor={theme.color_darkBlue}
                  borderWidth={1}
                  borderColor={theme.color_darkBlue}
                  marginBottom={8}
                  onPress={() => setVisible(false)}
                />

                <PickerButton
                  text={'No'}
                  color={theme.font_white}
                  fontSize={15}
                  height={30}
                  width={'20%'}
                  marginTop={'5%'}
                  backgroundColor={theme.color_darkBlue}
                  borderWidth={1}
                  borderColor={theme.color_darkBlue}
                  marginBottom={8}
                  onPress={() => setVisible(false)}
                />
              </View>
            </View>
          </View>
        </Modal>
      </>
      <>
        <Modal isVisible={goModalVisible}>
          <View style={styles.ModalView2}>
            <TouchableOpacity
              onPress={() => setGoModalVisible(false)}
              style={styles.modalIcon2}>
              {/* <FontAwesome
                name={'times'}
                size={hp('4.5%')}
                color={theme.color_darkBlue}
              /> */}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {

                {
                  status == "Arrived at pickup" ? Linking.openURL(
                    Platform.OS === 'ios'
                      ? `googleMaps://app?saddr=${initialRegion.latitude}+${initialRegion.longitude}&daddr=${origin.latitude}+${origin.longitude}`
                      : `google.navigation:q=${origin.latitude}+${origin.longitude}`,
                  ) : Linking.openURL(
                    Platform.OS === 'ios'
                      ? `googleMaps://app?saddr=${origin.latitude}+${origin.longitude}&daddr=${destination.latitude}+${destination.longitude}`
                      : `google.navigation:q=${destination.latitude}+${destination.longitude}`,
                  )
                }; setGoModalVisible(false)
              }
              }
              style={{
                height: 60,
                width: 60,
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                marginVertical: 5,
              }}>
              <FontAwesome
                name={'directions'}
                size={hp('6.5%')}
                color={theme.color_darkBlue}
              />
            </TouchableOpacity>

            {status == "Arrived at pickup" ?
              <Text style={[stylesModal.homePageGeeing, {
                color: theme.font_main,

              }]}>Navigate To Pickup {data.patientName}</Text>
              :
              status == "Arrived at dropoff" ?
                <Text style={[stylesModal.homePageGeeing, {
                  color: theme.font_main,
                }]}>Navigation To Dropoff {data.patientName}</Text> : null
            }
          </View>
        </Modal>
      </>
    </>
  );
};

export default MapViewScreen;
