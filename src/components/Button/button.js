import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

export const Button= ({
  disabled,
  text,
  marginBottom,
  fontWeight,
  fontSize,
  marginHorizontal,
  backgroundColor,
  onPress,
  marginTop,
  color,
  elevation,
  flex,
  height,
  width,
  borderWidth,
  borderColor,
  onPressIn,
}) => {
  // console.log(borderColor)

  return (
    <TouchableOpacity
      disabled={disabled}
      onPressIn={onPressIn}
      onPress={onPress}
      style={{
        marginBottom: marginBottom,
        marginHorizontal: marginHorizontal,
        flex: flex,
        alignSelf: 'center',
        backgroundColor: backgroundColor,
        borderWidth: 1.5,
        height: height,
        width: width,
        borderRadius: 12,
        justifyContent: 'center',
        marginTop: marginTop,
        elevation: elevation,
        borderColor: borderColor,
      }}>
      
      <Text
        style={{
          color: color,
          fontSize: fontSize,
          textAlign: 'center',
          fontWeight: fontWeight,
        }}>
        {' '}
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
