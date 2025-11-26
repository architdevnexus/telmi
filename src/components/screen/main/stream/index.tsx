import React from 'react';
import {StyleSheet, View} from 'react-native';
import {token} from '../../../../api/env';

// Navigation
import {useNavigation} from '@react-navigation/native';

// Video SDK Constants
import {MeetingProvider} from '@videosdk.live/react-native-sdk';
import {LiveStreamContainer} from './liveStreamContainer';

// Redux
import {useSelector} from 'react-redux';

// Types
type RootStackParamList = {
  navigate: (screen: string) => void;
};

export const Stream = () => {
  //Navigation
  const navigation = useNavigation<RootStackParamList>();

  //Redux
  const {createdRoom, streamMode, selectedRoomAsViewer} = useSelector(
    (state: any) => state.streamReducer,
  );
  const {user} = useSelector((state: any) => state.userAuthReducer);

  let streamId =
    streamMode == 'CONFERENCE'
      ? selectedRoomAsViewer.token
      : createdRoom.room.token;

  return (
    <View style={styles.container}>
      <MeetingProvider
        config={{
          meetingId: streamId,
          micEnabled: streamMode == 'CONFERENCE' ? false : true,
          webcamEnabled: streamMode == 'CONFERENCE' ? false : true,
          name: user.fullName,
          mode: streamMode,
          maxResolution: 'hd',
          metaData: user, 
          defaultCamera: 'front',
          notification: {
            title: "Code Sample",
            message: "Meeting is running.",
          },      
        }}
        token={token}
        joinWithoutUserInteraction={true}
        
        >
        <LiveStreamContainer userData={user} navigation={navigation} />
      </MeetingProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
