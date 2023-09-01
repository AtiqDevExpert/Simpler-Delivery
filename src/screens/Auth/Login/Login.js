import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import styles from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { images } from '../../../utils/Resource';
import Icon1 from 'react-native-vector-icons/Feather';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import NetworkCheck from '../../../utils/networkcheck';
import { LoginUserAPI } from '../../../redux/action/user';
import ProcessingWheel from '../../../components/ProcessingWheel';
import TextButton from '../../../components/Button/textButton';

const LoginScreen = props => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme);
  const { IsAppLoading } = useSelector(state => state.user);

  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [PasswordVisibility, setPasswordVisibility] = useState(true);

  const EmailREF = useRef(null);
  const PasswordREF = useRef(null);


  const handlePasswordVisibilityToggleClick = () => {
    setPasswordVisibility(!PasswordVisibility);
  };

  const EmailInputSubmit = () => {
    {
      Password.length < 0 ? PasswordREF.current.focus() : Keyboard.dismiss();
    }
  };

  const PasswordInputSubmit = () => {
    Keyboard.dismiss();
  };

  const handleUserLoginClick = async () => {
    Keyboard.dismiss();

    const Validations = await loginValidation();
    const isConnected = await NetworkCheck.isNetworkAvailable();
    if (Validations) {
      if (isConnected) {
        let LoginObject = { email: Email, pinCode: Password };
        try {
          dispatch(LoginUserAPI(LoginObject));
        } catch (error) {
          Alert.alert(error);
        }
      } else {
        Alert.alert('No Internet Available');
      }
    }
  };

  const loginValidation = () => {
    if (Email.length < 2) {
      Alert.alert('Email / Phone cannot be empty');
      return false;
    }
    if (Password.length < 2) {
      Alert.alert('Password cannot be empty');
      return false;
    }
    return true;
  };
  if (!!IsAppLoading) return <ProcessingWheel isProcessing />;
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView
        style={[
          styles.mainContainer,
          { backgroundColor: theme.background_main },
        ]}>
        <KeyboardAwareScrollView>
          <View style={styles.logoImageContainer}>
            <Image
              source={images.logo}
              style={styles.mainImage}
              resizeMode="contain"
            />
          </View>
          <View style={styles.logoImageContainerWhite}>
          <View style={styles.introTextContainer}>
            <Text style={[styles.introTextMain, { color: theme.font_main  }]}>
              Welcome !
            </Text>
            {/* <Text style={[styles.introTextSub, { color: theme.font_main }]}>
              Sign In To Start Saving Lives
            </Text> */}
          </View>

          <View style={styles.textInputContainer}>
            <Text style={[styles.textInputTitle, { color: theme.font_mainlite }]}>
              Email or Phone
            </Text>
            <View style={styles.textInputHolder}>
              <TextInput
                ref={EmailREF}
                style={[
                  styles.textInput,
                  {
                    //backgroundColor: theme.background_text_input,
                    color: theme.font_main,
                  },
                ]}
                returnKeyType="done"
                onSubmitEditing={EmailInputSubmit}
                blurOnSubmit={false}
                underlineColorAndroid="transparent"
                keyboardType="email-address"
                placeholder="Enter Email or Mobile Number"
                value={Email}
                onChangeText={setEmail}
                placeholderTextColor="#9597A0"
              />
            </View>
          </View>

          <View style={styles.textInputContainer}>
            <Text style={[styles.textInputTitle, { color: theme.font_mainlite }]}>
            Password
            </Text>
            <View style={styles.passwordTextInputHolder}>
              <TextInput
                ref={PasswordREF}
                style={[
                  styles.passwordTextInput,
                  {
                    //backgroundColor: theme.background_text_input,
                    color: theme.font_main,
                  },
                ]}
                returnKeyType="done"
                onSubmitEditing={PasswordInputSubmit}
                blurOnSubmit={false}
                underlineColorAndroid="transparent"
                keyboardType="default"
                placeholder="Enter Pincode"
                secureTextEntry={PasswordVisibility}
                value={Password}
                onChangeText={setPassword}
                placeholderTextColor="#9597A0"
              />
              <TouchableOpacity
                activeOpacity={1}
                onPress={handlePasswordVisibilityToggleClick}
                style={[
                  styles.eyeHolder,
                  { //backgroundColor: theme.background_text_input 
                  },
                ]}>
                {PasswordVisibility ? (
                  <Icon1
                    name="eye"
                    size={hp('2.5%')}
                    color={theme.icon_light}
                  />
                ) : (
                  <Icon1
                    name="eye-off"
                    size={hp('2.5%')}
                    color={theme.icon_light}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.forgettext}>
              {/* <Text style={[styles.textInputTitle, { color: theme.font_mainlite }]}>
                Email or Phone
              </Text> */}
              <TextButton
                text={'Forgot password?'}
                color={"#484C9B"}
                fontSize={14}
                fontWeight={"bold"}
                
              />
            </View>

          <TouchableOpacity
            onPress={handleUserLoginClick}
            style={[
              styles.loginButtonContainer,
              { backgroundColor: theme.color_blue },
            ]}>
            <Text style={[styles.loginButtonText, { color: theme.font_white }]}>
            Login
            </Text>
          </TouchableOpacity>
</View>

        </KeyboardAwareScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

