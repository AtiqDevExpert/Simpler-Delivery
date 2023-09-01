import React,{useEffect} from 'react';
import { View , Image } from 'react-native'
import styles from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { images } from '../../../utils/Resource';

const SplashScreen = (props) => {
    const theme = useSelector(state => state.theme );
    const user = useSelector(state => state.user );


    useEffect(() => {
        setTimeout(() => {
            checkUserRedirection();
        },20000)
    }, []);

    const  checkUserRedirection = () =>{
        props.navigation.replace("Login")
    }

    return(
        <View style={[styles.mainContainer,{backgroundColor:theme.background_main}]}>
            <Image source={images.splash} style={styles.logoImage} resizeMode="contain" />
        </View>
    );
}

export default SplashScreen;