// UserListScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ImageBackground,
  Image,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { listenForChatList } from './firebaseChat';
import { png } from '../../../../assets/png';
import {
  width,
  height,
  colors,
  horizontalScale,
  platform,
  verticalScale,
} from '../../../../utils';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

// Types
type RootStackParamList = {
  navigate: (screen: string, params?: any) => void;
};

export const UserListScreen = () => {
  const { userId } = useSelector((state: any) => state.userAuthReducer);
  const currentUserId = userId;
  const navigation = useNavigation<RootStackParamList>();

  const [chatList, setChatList] = useState<any[]>([]);
  const [filteredList, setFilteredList] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch chats
  useEffect(() => {
    const unsubscribe = listenForChatList(currentUserId, data => {
      setChatList(data);
      setFilteredList(data); // default full list
    });
    return unsubscribe;
  }, [currentUserId]);

  // Search handler
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (!text.trim()) {
      setFilteredList(chatList);
    } else {
      const filtered = chatList.filter(item =>
        item.userName?.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredList(filtered);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={png.bg} style={{ width, height }}>
        <View style={styles.container}>
          {/* Search bar always visible */}
          <TextInput
            placeholder="Search User"
            placeholderTextColor={colors.white}
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={handleSearch}
          />

          {/* Case 1: Database empty */}
          {chatList.length === 0 ? (
            <View style={styles.center}>
              <Text style={styles.noUserText}>No users found</Text>
            </View>
          ) : /* Case 2: Search has no matches */
            filteredList.length === 0 ? (
              <View style={styles.center}>
                <Text style={styles.noResultText}>
                  No results for "{searchQuery}"
                </Text>
              </View>
            ) : (
              /* Case 3: Show filtered list */
              <FlatList
                data={filteredList}
                keyExtractor={item => item.userId}
                renderItem={({ item }) => {
                  const firstLetter = item.userName?.charAt(0).toUpperCase() || '?';
                  const profileUri = item.userProfile;
                  const timeLabel = item.timestamp
                    ? dayjs(item.timestamp).format('hh:mm A')
                    : '';

                  // ✅ Check if last message is unread
                  const isUnread =
                    item.lastMessageSenderId !== currentUserId && !item.lastMessageRead;

                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('MessagingScreen', {
                          chatId: item.chatId,
                          currentUserID: userId,
                          otherUserID: item.userId,
                        })
                      }
                      style={styles.row}>
                      {/* Avatar */}
                      {profileUri ? (
                        <Image source={{ uri: profileUri }} style={styles.avatarImage} />
                      ) : (
                        <View style={styles.avatarFallback}>
                          <Text style={styles.avatarFallbackText}>{firstLetter}</Text>
                        </View>
                      )}

                      {/* User Info */}
                      <View style={styles.rowCenter}>
                        <Text style={styles.name}>{item.userName || 'Unknown User'}</Text>
                        <Text style={styles.preview} numberOfLines={1}>
                          {item.lastMessage || 'No messages yet'}
                        </Text>
                      </View>

                      {/* Right side: Time + unread dot */}
                      <View style={styles.rowRight}>
                        <Text style={styles.time}>{timeLabel}</Text>
                        {isUnread && <View style={styles.unreadDot} />}
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />

            )}
        </View>
      </ImageBackground>
    </View>
  );
};

// ===== Styles =====
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: horizontalScale(16),
    paddingTop: platform == 'ios' ? '15%' : '10%',
  },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  row: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  avatarImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
    backgroundColor: '#ccc',
  },
  avatarFallback: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#4b5563',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarFallbackText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  rowCenter: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
  preview: {
    fontSize: 14,
    color: '#d1d5db',
    marginTop: 2,
  },
  rowRight: { alignItems: 'flex-end', marginLeft: 8 },
  time: { fontSize: 11, color: '#9ca3af' },
  badge: {
    marginTop: 6,
    backgroundColor: '#ef4444',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  badgeText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  searchInput: {
    height: verticalScale(50),
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: horizontalScale(15),
    paddingHorizontal: horizontalScale(16),
    marginBottom: verticalScale(12),
    color: colors.white,
  },
  noUserText: { fontSize: 16, color: colors.white },
  noResultText: { fontSize: 16, color: '#fca5a5' },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'green',
    marginTop: 6,
  },

});
