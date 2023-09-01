import React, {useState} from 'react';
import styles from './styles';
import {Text, View} from 'react-native';
import Button from '../Button/button';
import Modal from 'react-native-modal';
import {useSelector, useDispatch} from 'react-redux';

const SetupCompleteModal = ({
  modalText1,
  modalButton,
  onPressBack,
  onPressOk,
  modalText2,
  ModalLogo,
  firstButtonText,
  secondButtonText,
  secondButtonbackColor,
  firstTextHeading,
  secondTextHeading,
  isModalVisible
}) => {
//   const [isModalVisible, setModalVisible] = useState(true);
  const theme = useSelector(state => state.theme);
//   const toggleModal = () => {
//     setModalVisible(!isModalVisible);
//   };
  return (
    <>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modelMainView}>
          <View style={{height: '70%', alignItems: 'center'}}>
          <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '80%',
                marginTop: 25,
              }}>
            <Text style={[styles.textInputTitle2, {color: theme.font_main}]}>
            {firstTextHeading}
              
            </Text>
            </View>

            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '80%',
                marginTop: 15,
              }}>
              <Text
                style={[
                  styles.textInputTitle6,
                  {color: theme.font_litegrayunselected},
                ]}>
                {secondTextHeading}

              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              
            }}>
            <Button
              text={firstButtonText}
              color={'#484C9B'}
              borderColor={'#484C9B'}
              fontSize={12}
              height={50}
              width={'40%'}
              backgroundColor={'#fff'}
              onPress={onPressBack}
              marginHorizontal={5}
              fontWeight={'bold'}
            />
                <Button
              text={secondButtonText}
              color={'#fff'}
              borderColor={'transparent'}
              fontSize={12}
              height={50}
              width={'40%'}
              backgroundColor={secondButtonbackColor}
              onPress={onPressOk}
              marginHorizontal={5}
              fontWeight={'bold'}
            />
  
          </View>
        </View>
      </Modal>
    </>
  );
};

export default SetupCompleteModal;
