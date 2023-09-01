import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp , widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { texts } from '../../../utils/Resource';

const styles = StyleSheet.create({
    mainContainer: { 
        flex:1,
    },
    logoImageContainer:{
        alignSelf:"center",
        justifyContent:"center",
        alignItems:"center",
        //height:hp('16%'),
        height:hp('35%'),
        //width:wp('90%'),
        width:wp('100%'),
    },
    logoImageContainerWhite:{
        alignSelf:"center",
        //marginTop:hp('1%'),
       // justifyContent:"center",
        alignItems:"center",
        height:hp('65%'),
        width:wp('100%'),
        backgroundColor: "white"
    },
    logoImage:{
        height:hp('50%'),
        width:wp('100%'),
        
    },
    introTextContainer:{
        alignSelf:"center",
        //marginTop:hp('2%'),
        justifyContent:"center",
        //alignItems:"center",
        height:hp('14%'),
        width:wp('91%'),
        //backgroundColor: "yellow"
    },
    introTextMain:{
        ...texts.xxlargeBold,
        letterSpacing:wp('0.4%')
    },
    introTextSub:{
        marginTop:hp('1%'),
        ...texts.large,
        letterSpacing:wp('0.4%')
    },
    textInputContainer:{

        alignSelf:"center",
        height:hp('14%'),
        width:wp('91%'),
       // marginTop:hp('2.3%'),
        justifyContent:"center",
        alignItems:"flex-start",
        //borderRadius:hp('1.2%'),
        //backgroundColor: "blue"
    },
    forgettext:{

        alignSelf:"center",
        height:hp('3%'),
        width:wp('91%'),
       // marginTop:hp('2.3%'),
        justifyContent:"center",
        alignItems:"flex-start",
        //borderRadius:hp('1.2%'),
       // backgroundColor: "yellow"
    },
    textInputTitle:{
        ...texts.regularBold,
        letterSpacing:wp('0.4%')
    },
    textInput:{
        flex:1,
        paddingHorizontal:wp('4.2%'),
        //borderRadius:hp('1.2%'),
        ...texts.large,
    },
    passwordTextInput:{
        flex:1,
        paddingHorizontal:wp('4.2%'),
        //borderBottomLeftRadius:hp('1.2%'),
        //borderTopLeftRadius:hp('1.2%'),
        ...texts.large,
    },
    textInputHolder:{
        marginTop:hp('1.5%'),
        height:hp('8%'),
        width:wp('90%'),
        borderRadius:hp('1.8%'),
        borderWidth:1,
        borderColor:"#C5C6CC",
    },
    eyeHolder:{
        height:hp('7.73%'),
        width:wp('10%'),
        
        justifyContent:"center",
        alignItems:"center",
        borderBottomRightRadius:hp('1.2%'),
        borderTopRightRadius:hp('1.2%'),
    },
    passwordTextInputHolder:{
        marginTop:hp('1.5%'),
        height:hp('8%'),
        width:wp('90%'),
        flexDirection:"row",
        borderWidth:1,
        borderColor:"#C5C6CC",
        borderRadius:hp('1.8%'),
        

    },
    loginButtonContainer:{
        marginTop:hp('3%'),
        alignSelf:"center",
        justifyContent:"center",
        alignItems:"center",
        height:hp('7%'),
        width:wp('90%'),
        borderRadius:hp('1.8%')
    },
    loginButtonText:{
        ...texts.large,
        letterSpacing:wp('0.4%'),
    
    }

});

export default styles;