import React from 'react';
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
  Alert,
} from 'react-native';
import  { useState, useRef} from 'react';
import styles from './styles';
import {ProfileEditIcon,
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
  LogoutIcon,} from '../../assets/SVG/Svg';
import {useSelector, useDispatch} from 'react-redux';
import LogOut from 'react-native-vector-icons/AntDesign';
import {LogOutAPI} from '../../redux/action/user';
import TokenManager from '../../utils/TokenManager';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Header from '../../components/Header/Index.js'
import { useEffect } from 'react';
const Profile = () => {
  const theme = useSelector(state => state.theme);
  const {
    user: {user = {}} = {},
  } = useSelector(state => state.user);
  const refRBSheet = useRef();
  const dispatch = useDispatch();
  const data = [
    {
      heading: 'FULL NAME',
      value:user?.firstName && user?.lastName? `${user?.firstName} ${user?.lastName}`:'_______',
    },

    {
      heading: 'Phone Number',
      value: user.phoneNumber?`${user.phoneNumber}`:'_______',
    },
    {
      heading: 'EMAIL Address',
      value: user?.email?`${user.email}`:'_______',
    },
  ];

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
  const SmallBottomSheet = () => {
  
    return (
     
        <View style={{ 
          //backgroundColor:'orange'
          }}>

          <TouchableOpacity 
         
                     style={{
            flexDirection:'row',
            justifyContent:'space-between', 
            alignItems: 'center',
            width: wp('85%'), 
            //backgroundColor:'green', 
            alignSelf:'center'
            }}>
            <View style={{flexDirection:'row',justifyContent:'center', alignItems: 'center', marginVertical:10, }}>
         
              <>
              <MedIcon style={styles.medlogo} />
              </>
              :<>
              <MedIconBlue style={styles.medlogo} />
              </>
              <Text style={[styles.bottomsheettxt, {color: theme.font_litegray1}]}>TECH</Text>
            </View>
           
            <View style={{marginHorizontal:10}}>
              <CheckIcon style={styles.checkIcon} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
          style={{
            flexDirection:'row',
            justifyContent:'space-between', 
            alignItems: 'center',
            width: wp('85%'), 
            //backgroundColor:'green', 
            alignSelf:'center'
            }}>
            <View style={{flexDirection:'row',justifyContent:'center', alignItems: 'center', marginVertical:10, }}>
          
              <>
              <AmbulanceIconGreen style={styles.medlogo} />
              </>
              :<>
              <AmbulanceIcon style={styles.medlogo} />
              </>
             
              <Text style={[styles.bottomsheettxt, {color: theme.font_litegray1}]}>DRIVER</Text>
            </View>
           
            <View style={{marginHorizontal:10}}>
              <CheckIcon style={styles.checkIcon} />
            </View>
          </TouchableOpacity>
          
    

        </View>
  
   
    );
  };
  const rbsheetOpen = () => {
    refRBSheet.current.open();
  };
  const rbsheetClose = () => {
    refRBSheet.current.close();
  };

  return (
    <View style={styles.mainContainer}>
    <Header lefttext="Welcome"  middletext={"Account information"}  />
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: 10,
        }}>
        <PersonIcon style={styles.logo} />
        {/* <ProfileEditIcon style={styles.editlogo}/> */}
      <TouchableOpacity style={{backgroundColor:"red"}}
      onPress={() =>{
              // rbsheetOpen()
                console.log("profile ")
                }}>
      <ProfileEditIcon style={styles.editlogo1}/>
      </TouchableOpacity>
        
        <Text style={[styles.textInputTitle2, {color: theme.font_main}]}>
    {user?.firstName && user?.lastName? `${user?.firstName} ${user?.lastName}`:'_______'}
        </Text>
      </View>
      {data.map((item, index) => {
        return (
          <>
            <View style={styles.nameView} key={index}>
              <Text
                style={[styles.textInputTitle7, {color: theme.font_litegray}]}>
                {item.heading}
              </Text>
              <Text style={[styles.textInputTitle6, {color: theme.font_main}]}>
                {item.value}
              </Text>
            </View>
          </>
        );
      })}

      <TouchableOpacity
        
        style={styles.logoutview}
        onPress={logoutHandler}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <LogoutIcon style={styles.logoulogo} />
          <Text style={styles.logouttxt}>Log out</Text>
        </View>
      </TouchableOpacity>

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

    </View>
  );
};

export default Profile;
