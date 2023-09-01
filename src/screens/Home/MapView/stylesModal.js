import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { StyleSheet } from 'react-native';
import { horizontalScale, verticalScale } from '../../../components/basicStyles';
import { texts } from '../../../utils/Resource';

const stylesModal = StyleSheet.create({
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
        padding: horizontalScale(15),
        position: 'absolute',
        borderRadius: horizontalScale(15),
        width: '100%',
        justifyContent: 'center',
        alignSelf: 'center',
        height: "100%"
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
        height: 2,
        marginVertical: horizontalScale(1),
        marginTop: verticalScale(10),
    },
    flexBox: { flexDirection: 'row', justifyContent: 'center', },
    flexBoxColumn: { flexDirection: 'column', justifyContent: 'space-between' },
    locationText: {
        ...texts.regularBold,
        marginVertical: verticalScale(10),
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
        backgroundColor: '#FFF',
        height: 300,
        width: '100%',
        justifyContent: 'center',
        borderRadius: 10,
        // marginHorizontal:10,
        // alignItems: 'center',
        // alignSelf: 'center',
    },
    homePageGeeingText: {
        marginTop: hp('1.2%'),
        letterSpacing: wp('0.2%'),
        fontSize: hp('2.0%'),
        fontWeight: "bold",
        justifyContent: 'center',
    },
    homePageGeeing: {
        marginTop: hp('0.5%'),
        fontSize: hp('1.7%'),
        fontWeight: "bold",
    },
});

export default stylesModal;
