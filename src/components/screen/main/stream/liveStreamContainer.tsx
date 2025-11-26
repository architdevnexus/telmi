import React, {useState} from 'react';
import {View, StyleSheet, Alert, Text, TouchableOpacity} from 'react-native';
import {StreamView} from './streamView';
import {useMeeting} from '@videosdk.live/react-native-sdk';
import {colors} from '../../../../utils';

export const LiveStreamContainer = ({userData, navigation}: any) => {
  const [joined, setJoined] = useState(false);

  const {join} = useMeeting({
    onMeetingJoined: () => {
      setJoined(true);
    },
    onMeetingLeft: () => {
      navigation.goBack();
    },
    onError: error => {
      Alert.alert('Error', error.message);
      navigation.goBack();
    },
    onParticipantJoined: participant => {
      console.log(' onParticipantJoined', participant);
    },
    onParticipantLeft: participant => {
      console.log(' onParticipantLeft', participant);
    },
  });

  return (
    <View style={styles.container}>
      {joined ? (
        <StreamView userName={userData.fullName} navigation={navigation} />
      ) : (
        <View style={styles.joinContainer}>
          <Text>Hello {userData.fullName}</Text>
          <TouchableOpacity onPress={join} style={styles.joinButton}>
            <Text>Join Stream</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  joinContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  joinButton: {
    backgroundColor: colors.green,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});
