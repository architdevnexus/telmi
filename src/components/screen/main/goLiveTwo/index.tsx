import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {
  MeetingProvider,
  useMeeting,
  useParticipant,
  Constants,
  register,
  RTCView,
} from '@videosdk.live/react-native-sdk';
import FastImage from 'react-native-fast-image';
import {png} from '../../../../assets/png';
import {horizontalScale, platform} from '../../../../utils';
import {Controls} from '../stream/Controls';
import {token} from '../../../../api/env';
import {createStream} from '../../../../api/videoSdkApiCall';
register();
function JoinView({initializeStream, setMode}: any) {
  const [streamId, setStreamId] = useState('');

  const handleAction = async (mode: any) => {
    // Sets the mode (Host or Audience) and initializes the stream
    setMode(mode);
    await initializeStream(streamId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleAction(Constants.modes.SEND_AND_RECV)}>
        <Text style={styles.buttonText}>Create Live Stream as Host.</Text>
      </TouchableOpacity>
      <Text style={styles.separatorText}>---------- OR ----------</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Stream Id"
        onChangeText={setStreamId}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleAction(Constants.modes.SEND_AND_RECV)}>
        <Text style={styles.buttonText}>Join as Host</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleAction(Constants.modes.RECV_ONLY)}>
        <Text style={styles.buttonText}>Join as Audience</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// Component to manage live stream container and session joining
function LSContainer({streamId, onLeave}: any) {
  const [joined, setJoined] = useState(false); // Track if the user has joined the stream

  const {join, meeting} = useMeeting({
    onMeetingJoined: () => setJoined(true), // Set `joined` to true when successfully joined
    onMeetingLeft: onLeave, // Handle the leave stream event
    onError: error => Alert.alert('Error', error.message), // Display an alert on encountering an error
  });

  const currentMode = meeting.localParticipant.mode; // Get the current participant's mode

  console.log(currentMode, meeting,'currentMode ===@@@');

  return (
    <View style={styles.container}>
      {joined ? (
        <StreamView />
      ) : (
        <TouchableOpacity style={styles.button} onPress={join}>
          <Text style={styles.buttonText}>Join Stream</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// Component to display the live stream view
function StreamView() {
  const {participants} = useMeeting(); // Access participants using the VideoSDK useMeeting hook
  const participantsArrId = Array.from(participants.entries())
    .filter(
      ([_, participant]) => participant.mode === Constants.modes.SEND_AND_RECV,
    )
    .map(([key]) => key);

  console.log(participantsArrId, '===@@@');

  return (
    <View>
      <Controls />
      <FlatList
        data={participantsArrId}
        renderItem={({item}) => {
          return (
            // <View style={{flex: 1, height: Dimensions.get('window').height}}>

            <View style={{flex: 1, height: 500}}>
              <Participant participantId={item} />
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
        style={{borderWidth: 1, borderColor: 'black'}}
      />
    </View>
  );
}

function Participant({participantId}: any) {
  const {webcamStream, webcamOn} = useParticipant(participantId);
  console.log(webcamStream, webcamOn, 'webcamOn ===@@@');
  return webcamOn && webcamStream ? (
    <RTCView
      //@ts-ignore
      streamURL={new MediaStream([webcamStream?.track]).toURL()}
      objectFit={'cover'}
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  ) : (
    <View style={styles.noMedia}>
      <Text style={styles.noMediaText}>NO MEDIA</Text>
    </View>
  );
}

// Component for managing stream controls
function LSControls() {
  //@ts-ignore
  const {leave, toggleMic, toggleWebcam, changeMode, meeting} = useMeeting(); // Access methods

  const currentMode = meeting.localParticipant.mode; // Get the current participant's mode

  console.log(toggleWebcam, '===@@@');

  return (
    <View style={styles.controls}>
      <View
        style={{
          width: '100%',
          padding: horizontalScale(20),
        }}>
        <FastImage source={png.equalizer} style={{width: 25, height: 25}} />
      </View>

      <TouchableOpacity style={styles.button} onPress={leave}>
        <Text style={styles.buttonText}>Leave</Text>
      </TouchableOpacity>
      {currentMode === Constants.modes.SEND_AND_RECV && (
        <>
          {/* @ts-ignore */}
          <TouchableOpacity style={styles.button} onPress={toggleMic}>
            <Text style={styles.buttonText}>Toggle Mic</Text>
          </TouchableOpacity>
          {/* @ts-ignore */}
          <TouchableOpacity style={styles.button} onPress={toggleWebcam}>
            <Text style={styles.buttonText}>Toggle Camera</Text>
          </TouchableOpacity>
        </>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          changeMode(
            currentMode === Constants.modes.SEND_AND_RECV
              ? Constants.modes.RECV_ONLY
              : Constants.modes.SEND_AND_RECV,
          )
        }>
        <Text style={styles.buttonText}>
          {currentMode === Constants.modes.SEND_AND_RECV
            ? 'Switch to Audience'
            : 'Switch to Host'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export const GoLiveTwo = () => {
  const [streamId, setStreamId] = useState(null); // Holds the current stream ID
  const [mode, setMode] = useState(Constants.modes.CONFERENCE); // Holds the current user mode (Host or Audience)

  const initializeStream = async (id: any) => {
    // Creates a new stream if no ID is provided or uses the given stream ID
    const newStreamId = id || (await createStream(token));
    setStreamId(newStreamId);
    console.log(newStreamId, '===@@@1');
  };

  const onStreamLeave = () => setStreamId(null); // Resets the stream state on leave

  return token && streamId ? (
    <MeetingProvider
      config={{
        meetingId: streamId,
        micEnabled: true, // Enables microphone by default
        webcamEnabled: true, // Enables webcam by default
        name: 'John Doe', // Default participant name
        mode: mode as any,
      }}
      token={token}>
      <LSContainer streamId={streamId} onLeave={onStreamLeave} />
    </MeetingProvider>
  ) : (
    <JoinView initializeStream={initializeStream} setMode={setMode} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: platform == 'ios' ? '15%' : '10%',
    backgroundColor: 'red',
  },
  button: {
    backgroundColor: '#1178F8',
    padding: 12,
    marginTop: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  input: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 6,
    fontStyle: 'italic',
    marginVertical: 10,
  },
  controls: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    backgroundColor: 'transparent',
    position: 'absolute',
    zIndex: 9999999,
  },
  noMedia: {
    width: Dimensions.get('window').width,
    height: 500,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    backgroundColor: 'gray',
    position: 'absolute',
    zIndex: 9999999,
    borderWidth: 1,
    borderColor: 'black',
  },
  noMediaText: {
    fontSize: 16,
  },
  separatorText: {
    alignSelf: 'center',
    fontSize: 22,
    marginVertical: 16,
    fontStyle: 'italic',
    color: 'grey',
  },
});
