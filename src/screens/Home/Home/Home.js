import React, {useCallback, useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  Image,
  RefreshControl,
  TouchableOpacity,
  AppState,
  PanResponder,

} from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {useSelector, useDispatch} from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {DrawerActions} from '@react-navigation/native';
import Icon1 from 'react-native-vector-icons/Feather';
import RideCards from '../../../components/RideCards';
import {useFocusEffect} from '@react-navigation/native';
import {GetCrewRideAPI, GetUserAPI} from '../../../redux/action/user';
import {images} from '../../../utils/Resource';
import ProcessingWheel from '../../../components/ProcessingWheel';
import TokenManager from '../../../utils/TokenManager';
import {LogOutAPI} from '../../../redux/action/user';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  LocationIcon,
  PersonIcon,
  SmallPersonIcon,
  MedIcon,
  PhoneIcon,
  CheckIcon,
  AmbulanceIcon,
  MedIconBlue,
  AmbulanceIconGreen,
} from '../../../assets/SVG/Svg';
import SwitchSelector from 'react-native-switch-selector';
import SetupCompleteModal from '../../../components/SetupCompleteModal';



const HomeScreen = props => {
  const dispatch = useDispatch();
  const {
    getCrewRidesList: {rides = [], truck = {}},
    user: {user = {}} = {},
  } = useSelector(state => state.user);
  const [show, setShow] = useState(true);
  const [rideArray, setRideArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const {IsAppLoading} = useSelector(state => state.user);
  const [ridetype, setRidetype] = useState('Route');
  // const [fullname,setfullname] = useState(`${user.firstName} ${user.lastName}`);
  const theme = useSelector(state => state.theme);
  
  const {userss} = useSelector(state => state.user);
  // console.log("userss================>",user)
  // console.log(useSelector(state => state.user));
  const timerId = useRef(false);
  const [timeForInactivityInSecond, setTimeForInactivityInSecond] = useState(10800);
  const refRBSheet = useRef();

  // const [techCheckvisible, setTechCheckvisible] = useState(false);
  const [driverCheckvisible, setDriverCheckvisible] = useState('Tech');

 
  const rbsheetOpen = () => {
    refRBSheet.current.open();
  };
  const rbsheetClose = () => {
    refRBSheet.current.close();
  };

  useEffect(() => {
    resetInactivityTimeout();
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => {
        resetInactivityTimeout();
      },
    }),
  ).current;

  const resetInactivityTimeout = () => {
    clearTimeout(timerId.current);
    timerId.current = setTimeout(() => {
      alert(`You are detected idle from 3 Hours Please Login Again`);
      logoutHandel();
    }, timeForInactivityInSecond * 1000);
  };

  useEffect(() => {
    // rbsheetClose();
  },[driverCheckvisible]);

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = setTimeout(async () => {
        dispatch(GetCrewRideAPI(await TokenManager.retrieveToken()));
        dispatch(GetUserAPI());
      }, 1000);
      return () => unsubscribe;
    }, []),
  );

  const logoutHandel = async () => {
    await TokenManager.deleteToken();
    dispatch(LogOutAPI());
  };

  const onRefresh = () => {
    setLoading(true);
    dispatch(GetCrewRideAPI());
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (rides.length) {
      setRideArray(rides);
    }
  }, [rides]);

  const handleDrawerToggle = () => {
    props.navigation.dispatch(DrawerActions.toggleDrawer());
  };
  const MainFlatlistHeaderComponent = () => {
    if (!show) return <View />;
    return (
      <View
        style={[styles.mainHeaderWrapper]}
        collapsable={false}
        {...panResponder.panHandlers}>
        <View style={[styles.homepageHeaderContainer]}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View>
              <PersonIcon style={styles.logo} />
            </View>

            <View style={{marginHorizontal: 7, justifyContent: 'center'}}>
              <View
                style={{alignItems: 'flex-start', justifyContent: 'center'}}>
                <Text
                  style={[
                    styles.textInputTitle3,
                    {color: theme.font_litegray},
                  ]}>
                  welcome
                </Text>
              </View>
              <View
                style={{alignItems: 'flex-start', justifyContent: 'center'}}>
                <Text
                  style={[styles.textInputTitle2, {color: theme.font_main}]}>
                 {user?.firstName && user?.lastName? `${user?.firstName} ${user?.lastName}`:'_______'}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              backgroundColor: '#EAEBFF',
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={[styles.textInputTitle, {color: theme.font_main}]}>
              DEC
            </Text>

            <Text style={[styles.textInputTitle1, {color: theme.color_blue1}]}>
              15th
            </Text>
          </View>

          {/* <View style={styles.textWrapper}>
            <TouchableOpacity
              onPress={handleDrawerToggle}
              style={[styles.drawerButton, { backgroundColor: theme.font_white }]}>
              <Icon1 name="menu" size={hp('3.5%')} color={theme.font_main} />
            </TouchableOpacity>
            <Text style={[styles.homePageGeeingText, { color: theme.font_main }]}>
              Good morning, {`${user.firstName} ${user.lastName}`}!Cheers to a
              great day.
            </Text>
            <Text style={[styles.homePageSubText, { color: theme.font_main }]}>
              Here's your work summary:
            </Text>
          </View>
          <Image
            source={images.sun}
            style={styles.sunImage}
            resizeMode="contain"
          /> */}
        </View>

        {/* previous code comment kr diya ha sara */}
        <View style={styles.iconWrapper}>
          <View style={styles.centerFlex}>
            <View style={styles.flexBox}>
              {/* <FontAwesome
                name="truck"
                size={hp('2.5%')}
                color={theme.font_main}
              />
              <Text
                style={[
                  styles.homePageGeeingText,
                  styles.iconText,
                  {color: theme.font_main},
                ]}>
                Truck
              </Text> */}
            </View>
            {/* <Text style={[styles.homePageSubText, {color: theme.font_main}]}> */}
            {/* {truck.name || 'N/A'} */}
            {/* {truck.id} */}
            {/* </Text> */}
          </View>
          <View style={styles.centerFlex}>
            <View style={styles.flexBox}>
              {/* <FontAwesome
                name="map-pin"
                size={hp('2.5%')}
                color={theme.font_main}
              />
              <Text
                style={[
                  styles.homePageGeeingText,
                  styles.iconText,
                  {color: theme.font_main},
                ]}>
                Number of Trips
              </Text> */}
            </View>
            {/* <Text style={[styles.homePageSubText, {color: theme.font_main}]}>
            {rideArray.length || 'N/A'}
            </Text> */}
          </View>
          <View style={styles.centerFlex}>
            <View style={styles.flexBox}>
              {/* <FontAwesome
                name="clock"
                size={hp('2.5%')}
                color={theme.font_main}
              />
              <Text
                style={[
                  styles.homePageGeeingText,
                  styles.iconText,
                  {color: theme.font_main},
                ]}>
                Hours
              </Text> */}
            </View>
            {/* <Text style={[styles.homePageSubText, {color: theme.font_main}]}>
            {truck.shiftTime || 'N/A'}
            </Text> */}
          </View>
        </View>
      </View>
    );
  };
  const SmallBottomSheet = () => {
  
    return (
     
        <View style={{ 
          //backgroundColor:'orange'
          }}>

          <TouchableOpacity 
          disabled={driverCheckvisible=='Tech'?true:false}
            onPress={() => {         
              //  setTechCheckvisible(!techCheckvisible)
              setDriverCheckvisible('Tech')
              
               }}
            style={{
            flexDirection:'row',
            justifyContent:'space-between', 
            alignItems: 'center',
            width: wp('85%'), 
            //backgroundColor:'green', 
            alignSelf:'center'
            }}>
            <View style={{flexDirection:'row',justifyContent:'center', alignItems: 'center', marginVertical:10, }}>
              {driverCheckvisible=='Tech'?
              <>
              <MedIcon style={styles.medlogo} />
              </>
              :<>
              <MedIconBlue style={styles.medlogo} />
              </>}
              <Text style={[styles.bottomsheettxt, {color: theme.font_litegray1}]}>TECH</Text>
            </View>
            {driverCheckvisible=='Tech' && (
            <View style={{marginHorizontal:10}}>
              <CheckIcon style={styles.checkIcon} />
            </View>)}
          </TouchableOpacity>

          <TouchableOpacity 
          disabled={driverCheckvisible=='Driver'?true:false}
            onPress={() => {         
               setDriverCheckvisible('Driver')

               }}style={{
            flexDirection:'row',
            justifyContent:'space-between', 
            alignItems: 'center',
            width: wp('85%'), 
            //backgroundColor:'green', 
            alignSelf:'center'
            }}>
            <View style={{flexDirection:'row',justifyContent:'center', alignItems: 'center', marginVertical:10, }}>
            {driverCheckvisible=='Driver'?
              <>
              <AmbulanceIconGreen style={styles.medlogo} />
              </>
              :<>
              <AmbulanceIcon style={styles.medlogo} />
              </>}
             
              <Text style={[styles.bottomsheettxt, {color: theme.font_litegray1}]}>DRIVER</Text>
            </View>
            {driverCheckvisible=='Driver' && (
            <View style={{marginHorizontal:10}}>
              <CheckIcon style={styles.checkIcon} />
            </View>)}
          </TouchableOpacity>
          
    

        </View>
  
   
    );
  };

  if (!!IsAppLoading) return <ProcessingWheel isProcessing />;

  return (
    <SafeAreaView
      style={[
        styles.mainContainer,
        {
          backgroundColor: theme.background_main,
          //backgroundColor: 'blue',
        },
      ]}
      collapsable={false}
      {...panResponder.panHandlers}>
      <MainFlatlistHeaderComponent />
      <View style={styles.routeView}>
        <SwitchSelector
          style={{
            width: wp('92%'),
            alignSelf: 'center',
          }}
          selectedColor={theme.font_litegray1}
          textColor={theme.font_litegrayunselected}
          textStyle={styles.switchertxt}
          selectedTextStyle={styles.switchertxt}
          fontSize={14}
          buttonColor={theme.background_main}
          backgroundColor={theme.background_main_lite}
          borderRadius={12}
          borderWidth={0}
          buttonMargin={8}
          initial={0}
          onPress={value =>
            // this.setState({ gender: value })
            setRidetype(value)
          }
          hasPadding
          options={[
            {label: 'New Routes', value: 'Route'},
            {label: 'Completed', value: 'Completed'},
          ]}
          testID="gender-switch-selector"
          accessibilityLabel="gender-switch-selector"
        />
      </View>

    {ridetype=="Route" &&
      <View style={styles.techView}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: wp('86%'),
            alignSelf: 'center',
            marginVertical: 5,
          }}>
          <Text style={[styles.hometxt1, {color: theme.font_litegray}]}>
            PARTNER
          </Text>
          <Text style={[styles.hometxt1, {color: theme.font_litegray}]}>
            TECH
          </Text>
        </View>

        <View
          style={{
           // backgroundColor: 'green',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: wp('86%'),
            alignSelf: 'center',
            marginVertical: 5,
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View
              style={{
             //   backgroundColor: 'blue',
                justifyContent: 'center',
              }}>
              <SmallPersonIcon style={styles.smalllogo} />
            </View>

            <View style={{marginHorizontal: 7, justifyContent: 'center'}}>
              <View
                style={{
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                //  backgroundColor: 'red',
                }}>
                <Text
                  style={[styles.textInputTitle4, {color: theme.font_main}]}>
                  Jesse Pinkman
                </Text>
              </View>

              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
            
                 // backgroundColor: 'yellow',
                }}>
                <PhoneIcon style={styles.phoneIcon} />
                <Text
                  style={[
                    styles.textInputTitle5,
                    {color: theme.font_litegray},
                  ]}>
                  202-555-0111
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              alignItems: 'flex-end',
              justifyContent: 'center',
              //backgroundColor:'blue'
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 5,
              }}>
              <TouchableOpacity onPress={() =>{
               rbsheetOpen()
                //console.log("open")
                }}>
                {driverCheckvisible=='Tech' && (
              <MedIcon style={styles.medlogo} 
              />)}
              
              {driverCheckvisible=='Driver' && (
              <AmbulanceIconGreen style={styles.medlogo} 
              />)}
              </TouchableOpacity>
            </View>

            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text style={[styles.textInputTitle4, {color: theme.font_main}]}>
                #432
              </Text>
            </View>
          </View>

        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: wp('86%'),
            alignSelf: 'center',
            marginVertical: 10,
          //  backgroundColor:"red",
            alignItems: 'center',
          }}>
          <Text style={[styles.textInputTitle6, {color: theme.font_litegray1}]}>
          3 Routes
          </Text>
          <Text style={[styles.textInputTitle6, {color: theme.font_litegrayunselected}]}>
          8:00 AM - 4:00 PM
          </Text>
        </View>


      </View>

    }
      {/* <Text
        style={[styles.homePageSubText, styles.card, {color: theme.font_main}]}>
        Dispatched Trips
      </Text> */}
      <FlatList
        refreshControl={
          <RefreshControl
            style={{
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              alignSelf: 'flex-start',
            }}
            refreshing={loading}
            tintColor={theme.color_blue}
            onRefresh={onRefresh}
          />
        }
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={rideArray}
        contentContainerStyle={{paddingBottom: hp('15%')}}
        keyExtractor={(item, index) => index}
        renderItem={({item, index}) => <RideCards item={item} index={index} />}
        ListEmptyComponent={() => (

         
          <View style={styles.noCard}>
           {/* <EmptyImageSvg style={styles.noimageIcon} /> */}
           <Image
              source={images.emptyimageicon}
              style={styles.emptyimageicon}
              resizeMode="contain"
            />
            <View style={{    width:wp('60%'),alignItems:'center'}}>

           {
            ridetype=="Route"?
            <> 
            <Text  style={[styles.textInputTitle2, {color: theme.font_main}]}> No routes assigned</Text>
            <Text style={styles.noText}>This is where you'll find routes that are assigned to you</Text>
</>
:
<>
<Text  style={[styles.textInputTitle2, {color: theme.font_main}]}> No routes completed</Text>
            <Text style={styles.noText}>This is where you'll find routes that have  completed</Text>


</>
              }
            </View>
          </View>
        )}
      />
           {/* Bootom Sheet  */}
           <>
        <RBSheet
            ref={refRBSheet}
            keyboardAvoidingViewEnabled={false}
            closeOnDragDown={true}
            closeOnPressMask={false}
            dragFromTopOnly={true}
            customStyles={{
              wrapper: {backgroundColor: 'rgba(0,0,0,0.4)'},
              draggableIcon: {backgroundColor: '#fff'},
              container: {
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                backgroundColor: '#FFFFFF',
                height: '20%',
              },
            }}>
            <SmallBottomSheet/>
        
          </RBSheet>
        </>
        <SetupCompleteModal
          isModalVisible={false}
          firstButtonText={"Go Back"}
          secondButtonText={"Start route"}
          secondButtonbackColor={"#484C9B"}
          secondTextHeading={"When you start a route out of order, your dispatcher is notified."}
          firstTextHeading={"Start route out of order?"}
          onPressBack={()=>console.log("ali")}
          onPressOk={()=>console.log("asad")}
        />
        
    </SafeAreaView>
  );
};

export default HomeScreen;
