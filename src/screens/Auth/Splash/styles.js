import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp , widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { texts } from '../../../utils/Resource';

const styles = StyleSheet.create({
    mainContainer: { 
        flex:1,
        justifyContent:"center",
        alignItems:"center" ,
    },
    logoImage:{
        height:hp('16%'),
        width:wp('50%')
    }

});

export default styles;