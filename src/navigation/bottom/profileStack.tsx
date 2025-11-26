import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Profile, EditProfile} from '../../components/screen/main';

const ProfileStack = createNativeStackNavigator();

export const ProfileNavigation = () => {
  return (
    <>
      <ProfileStack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: 'white',
          },
        }}>
        <ProfileStack.Screen name="profile" component={Profile} />
        <ProfileStack.Screen name="editProfile" component={EditProfile} />

      </ProfileStack.Navigator>
    </>
  );
};
