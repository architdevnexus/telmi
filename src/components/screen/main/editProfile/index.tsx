import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {png} from '../../../../assets/png';
import {
  colors,
  height,
  horizontalScale,
  platform,
  verticalScale,
  width,
} from '../../../../utils';
// Redux
import {useDispatch} from 'react-redux';
import {resetUser} from '../../../../redux/reducer/users';
import {resetStream} from '../../../../redux/reducer/stream';
// Navigation
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Types
type RootStackParamList = {
  navigate: (screen: string) => void;
  replace: (screen: string) => void;
};

export const EditProfile = () => {
  //Navigation
  const navigation = useNavigation<RootStackParamList>();

  //Redux
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await AsyncStorage.clear();
    dispatch(resetUser());
    dispatch(resetStream());
    navigation.replace('splash');
  };
  return (
    <ImageBackground source={png.bg} style={styles.container}>
      {/* Cover Image */}

      {/* User Info */}
      <View style={styles.infoSection}>
        <TouchableOpacity
          style={{
            width: 250,
            borderWidth: 1,
            borderColor: colors.white,
            padding: 10,
            borderRadius: horizontalScale(5),
          }}
          onPress={handleLogout}>
          <Text style={{color: colors.white, fontSize: horizontalScale(16)}}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height,
    paddingTop: platform === 'ios' ? '15%' : '10%',
  },
  coverImage: {
    width: '100%',
    height: verticalScale(160),
    borderRadius: horizontalScale(20),
  },
  profilePicWrapper: {
    position: 'absolute',
    top: verticalScale(150),
    alignSelf: 'center',
    zIndex: 999,
    borderRadius: horizontalScale(60),
    borderWidth: horizontalScale(3),
    borderColor: colors.green,
  },
  profilePic: {
    width: horizontalScale(120),
    height: horizontalScale(120),
    borderRadius: horizontalScale(60),
  },
  infoSection: {
    marginTop: verticalScale(60),
    paddingHorizontal: horizontalScale(20),
    alignItems: 'center',
  },
  userName: {
    fontSize: horizontalScale(24),
    fontWeight: 'bold',
    color: colors.white,
  },
  email: {
    fontSize: horizontalScale(16),
    color: colors.white,
    marginTop: verticalScale(4),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  icon: {
    width: horizontalScale(16),
    height: horizontalScale(16),
    marginRight: horizontalScale(6),
  },
  followerText: {
    color: colors.white,
    fontSize: horizontalScale(14),
  },
  sectionTitle: {
    fontSize: horizontalScale(20),
    color: colors.white,
    fontWeight: '600',
    marginTop: verticalScale(20),
    marginLeft: horizontalScale(16),
  },
  highlightsContainer: {
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(10),
  },
  highlightCard: {
    width: horizontalScale(150),
    height: verticalScale(120),
    borderRadius: horizontalScale(10),
    overflow: 'hidden',
    marginRight: horizontalScale(10),
    position: 'relative',
  },
  highlightImage: {
    width: '100%',
    height: '100%',
  },
  playOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -40}, {translateY: -40}],
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    width: horizontalScale(80),
    height: horizontalScale(80),
  },
});
