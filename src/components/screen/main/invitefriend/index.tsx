import React, { useState } from 'react';
import {
  Text,
  FlatList,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { FriendCard, SearchInput } from '../../../molicues';
import { colors } from '../../../../utils';
import {
  verticalScale,
  horizontalScale,
  width,
  height,
  platform,
} from '../../../../utils';
import { png } from '../../../../assets/png';
import FastImage from 'react-native-fast-image';

const mockFriends = [
  {
    id: '1',
    name: 'User Name',
    image:
      'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-souvenirpixels-414612.jpg&fm=jpg',
  },
  {
    id: '2',
    name: 'User Name',
    image:
      'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-souvenirpixels-414612.jpg&fm=jpg',
  },
  {
    id: '3',
    name: 'User Name',
    image:
      'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-souvenirpixels-414612.jpg&fm=jpg',
  },
  {
    id: '4',
    name: 'User Name',
    image:
      'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-souvenirpixels-414612.jpg&fm=jpg',
  },
];

export const InviteFriend = () => {
  const [search, setSearch] = useState('');
  const [friends, setFriends] = useState(mockFriends);

  const handleRemove = (id: string) => {
    setFriends(prev => prev.filter(friend => friend.id !== id));
  };
  const endpoit = ""
  const handleMessage = (name: string) => {

  };

  return (
    <ImageBackground source={png.bg} style={styles.container}>
      <SearchInput value={search} onChangeText={setSearch} />

      <FastImage source={png.videoCamera} style={styles.inviteImage} />
      <Text style={styles.inviteText}>Invite People To Chat</Text>

      <Text style={styles.title}>Audience</Text>
      <FlatList
        data={friends}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <FriendCard
            name={item.name}
            image={item.image}
            actionUri=""
            messageUri=""
            onRemove={() => handleRemove(item.id)}
            onMessage={() => handleMessage(item.name)}
          />
        )}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height,
    paddingTop: platform == 'ios' ? '15%' : '10%',
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: horizontalScale(15),
    borderWidth: 1,
    borderColor: colors.white,
    marginHorizontal: horizontalScale(16),
    height: verticalScale(50),
    paddingHorizontal: horizontalScale(16),
    marginBottom: verticalScale(12),
  },
  searchInput: {
    flex: 1,
    fontSize: horizontalScale(16),
    color: colors.white,
  },
  searchIcon: {
    width: horizontalScale(40),
    height: horizontalScale(40),
  },

  title: {
    color: colors.white,
    fontSize: horizontalScale(20),
    fontWeight: '600',
    marginBottom: verticalScale(12),
    paddingHorizontal: horizontalScale(12),
  },

  inviteImage: {
    width: horizontalScale(200),
    height: horizontalScale(100),
    marginVertical: verticalScale(16),
    alignSelf: 'center',
    resizeMode: 'contain',
  },

  inviteText: {
    color: colors.white,
    fontSize: horizontalScale(30),
    fontWeight: '600',
    alignSelf: 'center',
    marginBottom: verticalScale(16),
  },
});
