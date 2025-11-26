import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import {Image, Text, View, StyleSheet, ImageSourcePropType} from 'react-native';

import {Home} from '../../components/screen/main';
import {horizontalScale, verticalScale} from '../../utils';
import {png} from '../../assets/png';
import {colors} from '../../utils/colors_palette';

import { UserListScreen} from "../../components/screen/main/chat" 

//Bottom stack
import {ProfileNavigation} from "./profileStack"

type TabParamList = {
  message: undefined;
  home: undefined;
  profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const renderTabIcon = (
  routeName: keyof TabParamList,
  focused: boolean,
): React.ReactNode => {
  const icons: Record<keyof TabParamList, ImageSourcePropType> = {
    message: png.message,
    home: png.home,
    profile: png.account,
  };

  const iconStyle = focused ? styles.iconFocused : styles.icon;

  return (
    <View style={styles.tabItem}>
      <Image source={icons[routeName]} style={iconStyle} />
      <Text
        style={[
          styles.tabLabel,
          {
            color: focused
              ? colors.green
              : colors.lightBlack,
          },
        ]}>
        {routeName}
      </Text>
    </View>
  );
};

export const BottomTab: React.FC = () => {
  return (
    <SafeAreaProvider>
      <Tab.Navigator
        initialRouteName="home"
        screenOptions={({route}): BottomTabNavigationOptions => ({
          tabBarStyle: styles.tabBar,
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
          tabBarIcon: ({focused}) =>
            renderTabIcon(route.name as keyof TabParamList, focused),
        })}>
        <Tab.Screen
          name="message"
          component={UserListScreen}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="home"
          component={Home}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="profile"
          component={ProfileNavigation}
          options={{headerShown: false}}
        />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    width: '100%',
    height: verticalScale(70),
    backgroundColor: colors.backdropOpacity,
    borderRadius: horizontalScale(60),
    paddingTop: verticalScale(20),
    position: 'absolute',
    bottom: verticalScale(20),
  },
  tabItem: {
    width: horizontalScale(70),
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: horizontalScale(25),
    height: horizontalScale(25),
  },
  iconFocused: {
    width: horizontalScale(30),
    height: horizontalScale(30),
  },
  tabLabel: {
    marginTop: verticalScale(5),
    textTransform: 'capitalize',
  },
});
