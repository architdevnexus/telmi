import {View, ActivityIndicator} from 'react-native';
import React from 'react';

export const Loader = ({visible}: {visible: boolean}) => {
  return (
    visible &&
    <View
      style={{
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(8, 8, 8, 0.4)',
        position: 'absolute',
        zIndex: 9999999,
        width: '100%',
      }}>
      <ActivityIndicator size="large" color="#FFF" />
    </View>
  );
};