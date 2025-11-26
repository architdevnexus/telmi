import React, {useState} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {png} from '../../../../assets/png';
import {height, horizontalScale, verticalScale, width} from '../../../../utils';
import {CustomButton, Loader} from '../../../atoms';
import {CategoryList} from '../../../molicues';
import {checkCameraAndMicPermissions} from '../../../../helper';

//Modal
import {WelcomeModal} from '../../../../modal';

import {useNavigation} from '@react-navigation/native';

// Redux
import {useDispatch, useSelector} from 'react-redux';
import {
  setCreateRoom,
  setSelectedRoomAsViewer,
  setStreamMode,
} from '../../../../redux/reducer/stream';

///Video SDK
import {createStream} from '../../../../api/videoSdkApiCall';
import {token} from '../../../../api/env';
import {Constants} from '@videosdk.live/react-native-sdk';

// API
import {main} from '../../../../api/apiCall';

const data: {
  id: 'Sports' | 'Music' | 'Pop Culture' | 'Gaming' | 'TV/Films' | 'Politics';
  iconName: any;
}[] = [
  {id: 'Sports', iconName: png.sport},
  {id: 'Music', iconName: png.music},
  {id: 'Pop Culture', iconName: png.pop_culture},
  {id: 'Gaming', iconName: png.gaming},
  {id: 'TV/Films', iconName: png.tv},
  {id: 'Politics', iconName: png.politics},
];

// Types
type RootStackParamList = {
  navigate: (screen: string) => void;
};

export const Home = () => {
  //Navigation
  const navigation = useNavigation<RootStackParamList>();

  // Redux
  const dispatch = useDispatch();
  const {user} = useSelector((state: any) => state.userAuthReducer);

  // State to manage category selection
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Modal
  const [isWelcome, setIsWelcome] = useState(true);

  //GO Live
  const [loader, setLoader] = useState(false);

  const initializeStream = async () => {
    const newStreamId = await createStream(token);
    return newStreamId;
  };

  const handleGoLive = async () => {
    setLoader(true);
    if (selectedCategory === 'All') {
      Alert.alert('Error', 'Please select a category');
      setLoader(false);
      return;
    }

    const permissionsGranted = await checkCameraAndMicPermissions();
    if (permissionsGranted) {
      const newStreamId = await initializeStream();
      let body = {
        token: newStreamId,
        category: selectedCategory,
      };
      let response = await main.createRoom(body);
      console.log('response', response);
      if (response.status === 201) {
        dispatch(setStreamMode(Constants.modes.SEND_AND_RECV));
        dispatch(setCreateRoom(response.data));
        navigation.navigate('stream');
        setLoader(false);
      } else {
        setLoader(false);
        Alert.alert('Error', response.data.message);
      }
    } else {
      setLoader(false);
      Alert.alert('Permissions not granted. Cannot go live.');
    }
  };

  const handleWatch = async () => {
    setLoader(true);
    if (selectedCategory === 'All') {
      Alert.alert('Error', 'Please select a category');
      setLoader(false);
      return;
    }

    let response = await main.getRoomList(selectedCategory);

    if (response.status === 200) {
      let responseData = response.data;
      let availableRooms = responseData.length;

      if (availableRooms > 0) {
        const randomIndex = Math.floor(Math.random() * availableRooms);
        const selectedRoom = responseData[0];
        dispatch(setStreamMode(Constants.modes.CONFERENCE));
        dispatch(setSelectedRoomAsViewer(selectedRoom));

        let joinBody = {
          token: selectedRoom.token,
          activityType: 'viewer',
        };
        let joinResponse = await main.joinRoom(joinBody);

        if (joinResponse.data.message === 'Joined room successfully') {
          navigation.navigate('stream');
          setLoader(false);
        } else {
          Alert.alert('Error', joinResponse.data.message);
          setLoader(false);
        }
      } else {
        Alert.alert('No Rooms', 'There are no available rooms at the moment.');
        setLoader(false);
      }
    } else {
      Alert.alert('Error', response.data.message);
      setLoader(false);
    }
  };

  return (
    <View style={{flex: 1}}>
      <ImageBackground source={png.bg} style={{width, height}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            padding: horizontalScale(20),
          }}>
          <View
            style={{
              marginTop: verticalScale(40),
              alignItems: 'flex-end',
            }}>
            <Image source={png.equalizer} style={{width: 25, height: 25}} />
          </View>

          <Image source={png.logo} style={styles.logo} resizeMode="contain" />

          <CustomButton title="WATCH" onPress={handleWatch} />
          <CustomButton title="GO LIVE" onPress={handleGoLive} />

          <View style={{marginVertical: verticalScale(20)}}>
            <CategoryList
              data={data}
              setSelectedCategory={setSelectedCategory}
            />
          </View>
        </ScrollView>

        <Loader visible={loader} />

        <WelcomeModal
          visible={isWelcome}
          onContinue={() => setIsWelcome(false)}
          userData={user}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: '100%',
    height: verticalScale(100),
  },
});
