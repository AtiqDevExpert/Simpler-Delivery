import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import { useSelector } from 'react-redux';

const Processing = ({isProcessing, size = 'large'}) => {
  const theme = useSelector(state => state.theme);
  if (!isProcessing) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={[styles.wrapper, {backgroundColor: theme.font_white}]}>
        <ActivityIndicator size={size} animating color={theme.color_blue} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  wrapper: {
    height: 80,
    width: 80,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Processing;
