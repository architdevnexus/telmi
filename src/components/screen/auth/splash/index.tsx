import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Video from 'react-native-video';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {main_BG_Video} from '../../../../assets';
import {main} from '../../../../api/apiCall';

// Redux
import {useDispatch} from 'react-redux';
import {setUser} from '../../../../redux/reducer/users';

type RootStackParamList = {
  login: undefined;
  bottom_tab: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const SplashVideoScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const dispatch = useDispatch();

  const handleNavigateToLogin = () => {
    setTimeout(() => {
      navigation.replace('login');
    }, 3000);
  };

  const handleNavigateToHome = () => {
    setTimeout(() => {
      navigation.replace('bottom_tab');
    }, 3000);
  };

  const handleIsAuth = async () => {
    let userId = await AsyncStorage.getItem('userId');
    if (userId) {
      let response = await main.getSingleProfile(JSON.stringify({_id: userId}));
      if (response.data.profile) {
        dispatch(setUser(response.data.profile));
        handleNavigateToHome();
      } else {
        handleNavigateToLogin();
      }
    } else {
      handleNavigateToLogin();
    }
  };

  useEffect(() => {
    handleIsAuth();
  }, []);

  return (
    <View style={styles.container}>
      <Video
        source={main_BG_Video}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
        paused={false}
        repeat={false}
        muted={false}
        controls={false}
        playInBackground={false}
        playWhenInactive={false}
        onEnd={() => handleIsAuth()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
