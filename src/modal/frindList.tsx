import React, {useState} from 'react';
import {
  Text,
  Modal,
  ImageBackground,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import {FriendCard, SearchInput} from '../components/molicues';
import {colors} from '../utils';
import {
  verticalScale,
  horizontalScale,
  width,
  height,
  platform,
} from '../utils';
import {png} from '../assets/png';

export const FriendList = ({participants, open, onClose}: any) => {
  const [search, setSearch] = useState('');
  const [friends, setFriends] = useState(participants.map((item:any)=>item.metaData));

  const handleRemove = (id: string) => {
    setFriends((prev: any) => prev.filter((friend: any) => friend.id !== id));
  };

  const handleMessage = (name: string) => {
    console.log(`Message sent to ${name}`);
  };

  console.log(friends,"===@@@ participants");
  

  return (
    <Modal visible={open}>
      <View style={{flex: 1}}>
        <ImageBackground source={png.bg} style={styles.container}>
          <SearchInput value={search} onChangeText={setSearch} />
          <Text style={styles.title}>Audience</Text>
          <FlatList
            data={friends}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <FriendCard
                name={item.fullName}
                image={item.profilePhoto}
                actionUri={png.userAdd}
                messageUri={png.userAdd}
                onRemove={() => handleRemove(item._id)}
                onMessage={() => handleMessage(item.fullName)}
              />
            )}
          />
        </ImageBackground>
      </View>
    </Modal>
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
    textAlign: 'center',
    marginBottom: verticalScale(12),
  },
});
