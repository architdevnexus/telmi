import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StackNavigation} from './stack';

export const Navigation = () => {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
};
