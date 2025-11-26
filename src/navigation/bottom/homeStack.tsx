import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from '../../components/screen/main';

const HomeStack = createNativeStackNavigator();

export const HomeNavigation = () => {
  return (
    <>
      <HomeStack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: 'white',
          },
        }}>
        <HomeStack.Screen name="main" component={Home} />
      </HomeStack.Navigator>
    </>
  );
};
