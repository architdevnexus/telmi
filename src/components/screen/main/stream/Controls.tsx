import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {png} from '../../../../assets/png';
import {
  height,
  horizontalScale,
  platform,
  verticalScale,
  width,
} from '../../../../utils';
import {colors} from '../../../../utils/colors_palette';
import {demoImg} from '../../../../assets';
import {Constants, useMeeting} from '@videosdk.live/react-native-sdk';
import {FriendRequest, FriendList} from '../../../../modal';

export const Controls = ({userName, navigation}: any) => {
  //Invite Friend
  const [isInvite, setIsInvite] = React.useState(false);

  // Friend List
  const [isFriendListOpen, setIsFriendListOpen] = React.useState(false);

  const {
    leave,
    toggleWebcam,
    toggleMic,
    getWebcams,
    changeWebcam,
    participants,
    meeting,
  } = useMeeting({});

  const handleLeave = () => {
    leave();
    navigation.goBack();
  };

  const handleSwitchWebcam = async () => {
    console.log('handleSwitchWebcam', await getWebcams());
  };

  let confrenceId = [...participants.values()].filter(participant => {
    return participant.mode == Constants.modes.CONFERENCE;
  });

  const handleWatcher = () => {
    console.log('confrenceId', confrenceId);
    setIsFriendListOpen(true);
  };

  return (
    <View style={styles.controls}>
      <View style={styles.iconWrapper}>
        <View style={styles.iconContainer}>
          <FastImage source={{uri: demoImg}} style={styles.icon} />
          <Text style={styles.iconText}>{userName}</Text>
        </View>

        <View style={styles.likesContainer}>
          <View style={styles.likeRow}>
            <View
              style={{
                backgroundColor: colors.red,
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 5,
                marginRight: 10,
                borderWidth: 1,
                borderColor: colors.white,
              }}>
              <Text style={styles.likeText}>Live</Text>
            </View>

            <View style={styles.likeInfo}>
              <Text style={styles.likeDistance}>{confrenceId.length} </Text>
              <TouchableOpacity onPress={handleWatcher}>
                <FastImage
                  source={png.blView}
                  style={styles.likeIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.likeRow}>
            <TouchableOpacity
              style={{
                backgroundColor: colors.green,
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 5,
                marginRight: 10,
              }}
              onPress={handleLeave}>
              <Text style={styles.likeText}>Leave</Text>
            </TouchableOpacity>

            <View style={styles.likeInfo}>
              <Text style={styles.likeDistance}>100 m</Text>
              <FastImage
                source={png.blLike}
                style={styles.likeIcon}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.actionWrapper}
          onPress={() => toggleWebcam()}>
          <FastImage source={png.video} style={styles.iconAction} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionWrapper}
          onPress={handleSwitchWebcam}>
          <FastImage source={png.userAdd} style={styles.iconAction} />
        </TouchableOpacity>

        <View style={styles.inputRow}>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Enter your Comment"
              style={styles.input}
              placeholderTextColor={colors.white}
            />
          </View>
          <FastImage source={png.like} style={styles.iconAction} />
        </View>
      </View>

      <FriendRequest
        visible={isInvite}
        userName="John Doe"
        profileImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtNVnSmc1NA1nDSwwGnx0iCVK4n_Vj0TuqlMv0Jbg-zP2uhO8&s"
        onAccept={() => Alert.alert('Accepted')}
        onDecline={() => setIsInvite(false)}
      />
     {isFriendListOpen && <FriendList
        participants={confrenceId}
        open={isFriendListOpen}
        onClose={() => setIsFriendListOpen(false)}
      />}
    </View>
  );
};

const styles = StyleSheet.create({
  controls: {
    width,
    height: height - 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    zIndex: 9999999,
  },
  iconWrapper: {
    width: '100%',
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    borderRadius: horizontalScale(25),
    width: horizontalScale(50),
    height: horizontalScale(50),
    borderWidth: 1,
    borderColor: colors.green,
  },
  iconText: {
    color: colors.green,
    fontSize: horizontalScale(16),
    fontWeight: '600',
    marginLeft: horizontalScale(10),
  },
  likesContainer: {
    width: '50%',
    padding: 5,
    alignItems: 'flex-end',
  },
  likeRow: {
    flexDirection: 'row',
  },
  likeBox: {
    backgroundColor: colors.red,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  likeText: {
    color: colors.white,
    fontSize: horizontalScale(10),
    fontWeight: '400',
  },
  likeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginVertical: 5,
  },
  likeDistance: {
    color: colors.white,
    marginRight: 5,
  },
  likeIcon: {
    width: 25,
    height: 25,
  },
  bottomContainer: {
    width: '100%',
    position: 'absolute',
    bottom: platform === 'ios' ? '5%' : '2.5%',
  },
  actionWrapper: {
    marginVertical: 5,
    padding: 5,
    alignItems: 'flex-end',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
    padding: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: verticalScale(50),
  },
  input: {
    width: '90%',
    borderRadius: horizontalScale(50),
    height: '100%',
    borderWidth: 1,
    borderColor: colors.white,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: horizontalScale(20),
  },
  iconAction: {
    width: horizontalScale(50),
    height: horizontalScale(50),
  },
});
