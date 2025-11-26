import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import database from '@react-native-firebase/database';
import {png} from '../../../../assets/png';
import {
  width,
  height,
  colors,
  horizontalScale,
  platform,
  verticalScale
} from '../../../../utils';

export const MessagingScreen = ({route}: any) => {
  const {chatId, currentUserID, otherUserID} = route.params;
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState('');

  useEffect(() => {
    const ref = database().ref(`messages/${chatId}`);

    const listener = ref.on('value', snapshot => {
      const data = snapshot.val() || {};
      const list = Object.keys(data).map(key => ({
        id: key,
        ...data[key],
      }));
      setMessages(list.sort((a, b) => a.timestamp - b.timestamp));

      // ✅ Mark all messages from the other user as read
      list.forEach(msg => {
        if (msg.senderId !== currentUserID && !msg.readBy?.[currentUserID]) {
          database()
            .ref(`messages/${chatId}/${msg.id}/readBy/${currentUserID}`)
            .set(true);
        }
      });

      // ✅ Also mark lastMessageRead in userChats
      if (list.length > 0) {
        const lastMsg = list[list.length - 1];
        if (lastMsg.senderId !== currentUserID) {
          database()
            .ref(`userChats/${currentUserID}/${otherUserID}`)
            .update({lastMessageRead: true});
        }
      }
    });

    return () => ref.off('value', listener);
  }, [chatId]);

  const sendMessage = async () => {
    if (!text.trim()) {
      return;
    }

    const messageData = {
      senderId: currentUserID,
      text,
      timestamp: Date.now(),
      readBy: {
        [currentUserID]: true, // sender auto-marks as read
      },
    };

    await database().ref(`messages/${chatId}`).push(messageData);

    // Update last message in userChats
    // For current user (sender) - mark as read
    await database().ref(`userChats/${currentUserID}/${otherUserID}`).update({
      lastMessage: text,
      timestamp: Date.now(),
      lastMessageSenderId: currentUserID,
      lastMessageRead: true, // sender always sees it as read
    });

    // For other user (receiver) - mark as unread
    await database().ref(`userChats/${otherUserID}/${currentUserID}`).update({
      lastMessage: text,
      timestamp: Date.now(),
      lastMessageSenderId: currentUserID,
      lastMessageRead: false, // receiver sees dot until they open chat
    });

    setText('');
  };

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={png.bg}
        style={{
          width,
          height,
          padding: horizontalScale(20),
          paddingTop: platform == 'ios' ? '15%' : '10%',
        }}>
        <FlatList
          data={messages}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            const isSender = item.senderId === currentUserID;
            return (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: isSender ? 'flex-end' : 'flex-start',
                  marginVertical: 4,
                  alignItems: 'center',
                  paddingHorizontal: horizontalScale(10),
                }}>
                <View style={{alignItems: 'flex-end', maxWidth: '70%'}}>
                  <View
                    style={{
                      backgroundColor: isSender
                        ? colors.oliveGreen
                        : colors.orange,
                      padding: horizontalScale(10),
                      borderRadius: horizontalScale(10),
                    }}>
                    <Text style={{color: colors.white}}>{item.text}</Text>
                  </View>
                  {/* ✅ Read/Unread status for sender */}
                  {isSender && (
                    <Text
                      style={{
                        fontSize: 10,
                        color: item.readBy?.[otherUserID]
                          ? 'lightgreen'
                          : 'gray',
                        marginLeft: 6,
                      }}>
                      {item.readBy?.[otherUserID] ? 'Read' : 'Sent'}
                    </Text>
                  )}
                </View>
              </View>
            );
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            padding: horizontalScale(10),
            gap: horizontalScale(8),
          }}>
          <TextInput
            value={text}
            onChangeText={setText}
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: colors.offWhite,
              padding: horizontalScale(10),
              color: colors.white,
              borderRadius: horizontalScale(50),
            }}
            placeholderTextColor={colors.white}
            placeholder="Type a message..."
          />
          <TouchableOpacity style={styles.sentIcon} onPress={sendMessage}>
            <Image source={png.sent} style={{width: 15, height: 15}} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

// ===== Styles =====
const styles = StyleSheet.create({
  container: {flex: 1},
  bubbleRow: {flexDirection: 'row', paddingHorizontal: 10, marginVertical: 4},
  left: {justifyContent: 'flex-start'},
  right: {justifyContent: 'flex-end'},
  bubble: {
    maxWidth: '78%',
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(8),
    borderRadius: horizontalScale(16),
  },
  meBubble: {backgroundColor: '#111827', borderTopRightRadius: 4},
  themBubble: {backgroundColor: '#e5e7eb', borderTopLeftRadius: 4},
  bubbleText: {fontSize: 15, lineHeight: 20},
  meText: {color: '#fff'},
  themText: {color: '#111827'},
  meta: {alignSelf: 'flex-end', fontSize: 10, marginTop: 4, opacity: 0.7},
  composer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: horizontalScale(10),
    borderTopWidth: 1,
    borderTopColor: colors.offWhite,
    gap: horizontalScale(8),
  },
  input: {
    flex: 1,
    minHeight: verticalScale(40),
    maxHeight: verticalScale(120),
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(8),
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: horizontalScale(16),
  },
  sendBtn: {
    paddingHorizontal: horizontalScale(14),
    height: verticalScale(40),
    borderRadius: horizontalScale(16),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111827',
  },
  sendText: {color: '#fff', fontWeight: '700'},
  sentIcon: {
    width: horizontalScale(40),
    height: horizontalScale(40),
    backgroundColor: colors.orange,
    borderRadius: horizontalScale(25),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
