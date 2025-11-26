import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
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
import {demoImg} from '../../../../assets';
import FastImage from 'react-native-fast-image';
// Redux
import {main} from '../../../../api/apiCall';
//
import {setUser} from '../../../../redux/reducer/users';
import {useDispatch, useSelector} from 'react-redux';
// Navigation
import {useNavigation} from '@react-navigation/native';
// import {createChatIfNotExists} from '../chat/firebaseChat';

// Types
type RootStackParamList = {
  navigate: (screen: string, params?: any) => void;
};

const highlights = [
  {id: '1', image: png.account},
  {id: '2', image: png.account},
  {id: '3', image: png.account},
  {id: '4', image: png.account},
  {id: '5', image: png.account},
  {id: '6', image: png.account},
];

export const Profile = () => {
  // Redux
  const {user, userId} = useSelector((state: any) => state.userAuthReducer);
  const dispatch = useDispatch();
  //Navigation
  const navigation = useNavigation<RootStackParamList>();

  const handleIsAuth = async () => {
    if (userId) {
      let response = await main.getSingleProfile({
        _id: userId,
      });
      if (response.data.profile) {
        dispatch(setUser(response.data.profile));
        console.log(response.data.profile, '===@@@');
      } else {
        navigation.navigate('bottom_tab');
      }
    } else {
      console.log('No user id found', '===@@@');
    }
  };

  useEffect(() => {
    handleIsAuth();
  }, []);

  // let otherUserID =
  //   userId == '688f957ce46b44ecdc0e5a36'
  //     ? '678bdedf37fe709646713ff7'
  //     : '688f957ce46b44ecdc0e5a36';
  // let currentUserID = userId;

  // const handleStartChat = async () => {
  //   const chatId = await createChatIfNotExists(
  //     currentUserID,
  //     user?.fullName,
  //     user?.profilePhoto,
  //     otherUserID,
  //     'rahulkirar',
  //     'https://images.unsplash.com/photo-1506794778202-cad84cf45f1a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
  //   );
  //   navigation.navigate('MessagingScreen', {
  //     chatId,
  //     currentUserID,
  //     otherUserID,
  //   });
  // };

  return (
    <ImageBackground source={png.bg} style={styles.container}>
      {/* Cover Image */}
      <View>
        <FastImage source={{uri: user?.coverPhoto}} style={styles.coverImage} />
        <TouchableOpacity
          onPress={() => navigation.navigate('editProfile')}
          style={{
            width: horizontalScale(20),
            height: horizontalScale(20),
            position: 'absolute',
            top: horizontalScale(10),
            right: horizontalScale(10),
          }}>
          <FastImage
            source={png.edit}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </TouchableOpacity>
      </View>

      {/* Profile Picture */}
      <View style={styles.profilePicWrapper}>
        <FastImage
          source={{uri: user?.profilePhoto}}
          style={styles.profilePic}
        />
      </View>

      {/* User Info */}
      <View style={styles.infoSection}>
        <Text style={styles.userName}>{user?.fullName}</Text>
        <View style={styles.row}>
          <FastImage source={png.account} style={styles.icon} />
          <Text style={styles.followerText}>150</Text>
        </View>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      {/* Highlights Section */}
      <Text style={styles.sectionTitle}>Highlights</Text>
      <FlatList
        data={highlights}
        horizontal
        keyExtractor={item => item.id}
        contentContainerStyle={styles.highlightsContainer}
        renderItem={() => (
          <View style={styles.highlightCard}>
            <FastImage source={{uri: demoImg}} style={styles.highlightImage} />
            {/* Play Button Overlay */}
            <View style={styles.playOverlay}>
              <FastImage source={png.play} style={styles.playIcon} />
            </View>
          </View>
        )}
      />
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
    alignItems: 'center',
    paddingHorizontal: horizontalScale(20),
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
