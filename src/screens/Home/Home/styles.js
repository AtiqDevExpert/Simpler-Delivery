import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {texts} from '../../../utils/Resource';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  flatlistContainer: {
    flex: 1,
  },
  mainHeaderWrapper: {
    marginTop: 10,
    height:'12%',
    //width: wp('100%'),
   // backgroundColor:"green"
  },
  routeView: {
    justifyContent: 'center',
    height: hp('9%'),
    width: wp('100%'),
   // backgroundColor:"black"
  },
  techView: {
    height: hp('21%'),
    width: wp('100%'),
    //backgroundColor:"yellow"
  },
  homepageHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '92%',
    height:'60%', 
    alignSelf: 'center',
    marginVertical: hp('1.5%'),
   // backgroundColor:"red"
  },
  drawerButton: {
    justifyContent: 'center',
    height: hp('5%'),
    width: hp('5%'),
  },
  homePageGeeingText: {
    marginTop: hp('1.5%'),
    letterSpacing: wp('0.2%'),
    ...texts.largeBold,
  },
  card: {
    marginTop: wp('10%'),
    marginHorizontal: wp('5%'),
    marginBottom: wp('5%'),
  },
  homePageSubText: {
    marginTop: hp('0.7%'),
    letterSpacing: wp('0.2%'),
    ...texts.regular,
  },
  emptyCartTxt: {
    alignSelf: 'center',
    marginTop: hp('25%'),
    color: 'black',
    fontSize: 18,
    fontWeight: '500',
  },
  switchertxt: {
    fontWeight: '700',
  },
  textWrapper: {
    width: '70%',
  },
  sunImage: {
    width: hp('12%'),
    height: hp('12%'),
  },
  iconWrapper: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    //marginTop: hp('3%'),
    //backgroundColor:"yellow"
  },
  flexBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    marginTop: 0,
    marginLeft: 5,
    ...texts.regularBold,
  },
  centerFlex: {
    alignItems: 'center',
  },
  noCard: {
    alignItems: 'center',
    // backgroundColor:"red",
    marginTop: hp('12%'),
  },
  noText:{
    color: 'black',
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    marginTop:10
  },
  noTexthead:{
    color: 'black',
    fontSize: 28,
    fontWeight: 'bold',
  },
  logo: {height: 50, width: 50},
  smalllogo: {height: 30, width: 30},
  phoneIcon: {height: 15, width: 15, marginRight:4},
  medlogo: {height: 35, width: 35},
  noimageIcon: {height: 100, width: 100},
  checkIcon: {height: 35, width: 30,},
  textInputTitle:{
    alignItems:'center', justifyContent: 'center', marginHorizontal:10,marginTop:5,
    ...texts.regularBold,
  //  letterSpacing:wp('0.4%')
},
textInputTitle1:{
  alignItems:'center',
   justifyContent: 'center', 
   marginHorizontal:10,
   marginVertical:5,
  ...texts.smallBold,
//  letterSpacing:wp('0.4%')
},
hometxt1:{
  alignItems:'center', 
  ...texts.regularBold,
},
textInputTitle2:{
  ...texts.xlargeBold,
//  letterSpacing:wp('0.4%')
},

textInputTitle3:{
  ...texts.smallBold,
//  letterSpacing:wp('0.4%')
},
textInputTitle4:{
  ...texts.largeBold,
//  letterSpacing:wp('0.4%')
},
textInputTitle5:{
  ...texts.large,
//  letterSpacing:wp('0.4%')
},
textInputTitle6:{
  ...texts.mlarge,
//  letterSpacing:wp('0.4%')
},
bottomsheettxt:{
  alignItems:'center',
   justifyContent: 'center', 
   marginHorizontal:15,
  ...texts.smallBold,
},
emptyimageicon: {
  height: 100,
   width: 100,
      marginBottom:30
  },

});

export default styles;
