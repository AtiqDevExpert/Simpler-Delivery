import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { StyleSheet } from 'react-native';
import { horizontalScale, verticalScale } from '../../../components/basicStyles';
import { texts } from '../../../utils/Resource';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  locationImage: {
    height: hp('5%'),
    width: wp('10%'),
  },
  imageWrapper: {
    padding: 5,
    borderRadius: 30,
    transform: [{ rotate: '10deg' }],
  },
  mainwrapper: {
    flex: 1,
    marginTop: verticalScale(10),
    marginHorizontal: horizontalScale(15),
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  drawerButton: {
    width: horizontalScale(50),
    height: horizontalScale(50),
    borderRadius: horizontalScale(50),
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 11,
    marginTop: verticalScale(10),
    marginHorizontal: horizontalScale(15),
  },
  logoImage: {
    height: verticalScale(50),
    width: horizontalScale(100),
  },
  userImage: {
    height: horizontalScale(30),
    width: horizontalScale(30),
    resizeMode: 'contain'
  },
  cardWrapper: {
    padding: horizontalScale(10),
    position: 'absolute',
    bottom: 20,
    borderRadius: horizontalScale(10),
    width: '90%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  titleHeader: {
    ...texts.smallBold,
  },
  textCombo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    ...texts.regular,
  },
  time: {
    ...texts.regularBold,
  },
  divider: {
    height: 1,
    marginVertical: horizontalScale(10),
  },
  flexBox: { flexDirection: 'row' },
  flexBoxColumn: { flexDirection: 'column', justifyContent: 'space-between' },
  locationText: {
    ...texts.regularBold,
    marginVertical: verticalScale(5),
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
    borderRadius: horizontalScale(10),
    height: verticalScale(30),
    marginRight: horizontalScale(10),
  },
  buttonWrapper: {
    width: '80%',
    alignSelf: 'center',
    marginVertical: horizontalScale(10),
  },
  ModalView: {
    backgroundColor: 'yellow',
    //  flex:1,
    height: 250,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
  },
  ModalBtnView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
  },
  Modalbtn: {
    borderRadius: 40,
    backgroundColor: 'white',
    height: 50,
    width: 130,
    fontWeight: 'bold',
    alignSelf: 'center',
    justifyContent: 'center',
    // borderColor: 'lightgrey',
    borderWidth: 0.2,
  },
  Modalbtntext: {
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 15,
    flex: 1,
  },
  images: {
    width: '100%',
    height: '100%',
  },
  modalIcon: {
    width: 40,
    height: 70,
    position: 'absolute',
    right: 10,
    top: 2,
  },
  ModalView2: {
    backgroundColor: '#FFFFFF',
    height: 110,
    width: '65%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
  },
  modalIcon2: {
    width: 40,
    height: 40,
    position: 'absolute',
    right: 0,
    top: 5,
  },
  homePageGeeingText: {
    marginTop: hp('0.5%'),
    letterSpacing: wp('0.0%'),
    fontSize: hp('2.0%'),
    fontWeight: "bold",
    justifyContent: 'center',
    textAlign: 'center'
  },
});

export default styles;
