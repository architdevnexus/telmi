import React from 'react';
import {View, Text, StyleSheet, FlatList, Dimensions} from 'react-native';

//Video sdk
import {
  useMeeting,
  Constants,
  useParticipant,
  RTCView,
} from '@videosdk.live/react-native-sdk';

//Utils
import {height} from '../../../../utils';

//
import {Controls} from './Controls';

const Participant = ({
  participantId,
  count,
}: {
  participantId: string;
  count: number;
}) => {
  // @ts-ignore
  const {webcamStream, webcamOn, metaData} = useParticipant(participantId);

  // console.log('metaData', metaData, '===@@@');
  let newHeight;

  switch (count) {
    case 1:
      newHeight = height * 1;
      break;
    case 2:
      newHeight = (height * 1) / 2;
      break;
    case 3:
      newHeight = (height * 1) / 3;
      break;
    case 4:
      newHeight = (height * 1) / 4;
      break;
    default:
      null;
      break;
  }

  return webcamOn && webcamStream ? (
    <RTCView
      //@ts-ignore
      streamURL={new MediaStream([webcamStream?.track]).toURL()}
      objectFit="cover"
      style={{
        height: newHeight,
        flex: 1,
        alignItems: 'center',
      }}
      mirror={true}
    />
  ) : (
    <View style={[styles.noMedia, {width: '100%', height: newHeight}]}>
      <Text style={styles.noMediaText}>NO MEDIA</Text>
    </View>
  );
};

export const StreamView = ({userName, navigation}: any) => {
  const {participants} = useMeeting();
  const participantsArrId = Array.from(participants.entries())
    .filter(
      ([_, participant]) => participant.mode === Constants.modes.SEND_AND_RECV,
    )
    .map(([key]) => key);

  // console.log('participantsArrId', participantsArrId, '===@@@');

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <FlatList
        style={{width: '100%', height: '100%'}}
        data={participantsArrId}
        renderItem={({item}: any) => {
          return (
            <Participant
              participantId={item}
              count={participantsArrId.length}
            />
          );
        }}
        keyExtractor={(_: any, index: number) => index.toString()}
      />
      <Controls userName={userName} navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  noMedia: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    backgroundColor: 'gray',
    position: 'absolute',
    zIndex: 9999999,
  },
  noMediaText: {
    fontSize: 16,
    color: 'black',
  },
});
