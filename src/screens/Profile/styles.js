import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { texts} from '../../utils/Resource'

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor:"#fff"
  },
  textInputTitle2:{
   // ...texts.xlargeBold,
  //  letterSpacing:wp('0.4%')
  },
  logo: {height: 80, width: 80},
  editlogo: {
    height: 24, 
    width: 24,
    position: 'absolute',
    top:wp('16%'),
    left:wp('54%'), 
   },
   editlogo1: {
    height: 24, 
    width: 24,
    position: 'absolute',
    top:wp('-4%'),
    left:wp('5%'), 
   },
  logoulogo: {height: 20, width: 20},
  textInputTitle2:{
    ...texts.xlargeBold,
    marginVertical:10
  },
  nameView:{
    alignSelf: 'center',
    width: wp('90%'),
    marginVertical:5,
  },
  textInputTitle6:{
    ...texts.mlarge,
  },
  textInputTitle7:{
    ...texts.regularBold,
  },
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
  logoutview:{
    alignSelf: 'center',
    width: wp('90%'),
    marginVertical:35,
  },
  logouttxt:{
    marginHorizontal:10,
    color: "#ED3241",
    fontSize:14,
    fontWeight:"600",
  }
});

export default styles