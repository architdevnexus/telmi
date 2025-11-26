import database from '@react-native-firebase/database';

export const getChatId = (uid1: string, uid2: string) => {
  return [uid1, uid2].sort().join('_');
};

// Create chat entry in userChats
export const createChatIfNotExists = async (
  currentUserID: string,
  currentUserName: string,
  currentUserProfile: string,
  otherUserID: string,
  otherUserName: string,
  otherUserProfile: string,
) => {
  const chatId = getChatId(currentUserID, otherUserID);

  const currentUserRef = database().ref(
    `userChats/${currentUserID}/${otherUserID}`,
  );
  const otherUserRef = database().ref(
    `userChats/${otherUserID}/${currentUserID}`,
  );

  const snapshot = await currentUserRef.once('value');

  if (!snapshot.exists()) {
    const timestamp = Date.now();

    // For current user's chat list → show other user's info
    const currentUserChatData = {
      lastMessage: '',
      timestamp,
      chatId,
      userName: otherUserName,
      userProfile: otherUserProfile,
    };

    // For other user's chat list → show current user's info
    const otherUserChatData = {
      lastMessage: '',
      timestamp,
      chatId,
      userName: currentUserName,
      userProfile: currentUserProfile,
    };

    await currentUserRef.set(currentUserChatData);
    await otherUserRef.set(otherUserChatData);
  }

  return chatId;
};

// Listen for chat list
export const listenForChatList = (
  currentUserID: string,
  callback: (list: any[]) => void,
) => {
  const ref = database().ref(`userChats/${currentUserID}`);

  const listener = ref.on('value', snapshot => {
    const data = snapshot.val() || {};
    const list = Object.keys(data).map(userId => ({
      userId,
      ...data[userId],
    }));
    callback(list);
  });

  return () => ref.off('value', listener);
};
