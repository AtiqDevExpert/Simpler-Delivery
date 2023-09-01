import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import { Colors } from '../../constants/Colors';
import {texts} from '../../utils/Resource';

export default StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  textInputTitle2:{
    ...texts.xlargeBold,
    textAlign: 'center',
  },
  textInputTitle6:{
    ...texts.large,
    textAlign: 'center',
  //  letterSpacing:wp('0.4%')
  },
  modelMainView: {
    height: '35%',
    width: '100%',
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: 'center',
    //justifyContent: 'center',
  },
  text1:{
    color:"#2B2F41",
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
    marginTop:20
  },
  text2:{
    color:"##80828D",
    fontWeight: '400',
    fontSize: 12,
    textAlign: 'center',
  }
});
