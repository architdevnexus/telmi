import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { colors, horizontalScale, verticalScale } from '../../../utils';
import FastImage from 'react-native-fast-image';

interface FriendCardProps {
  name: string;
  image: string;
  onRemove: () => void;
  onMessage: () => void;   // function callback
  actionUri: string;
  messageUri: string;
}

export const FriendCard: React.FC<FriendCardProps> = ({
  name,
  image,
  onRemove,
  onMessage,
  actionUri,
  messageUri,
}) => {

  return (
    <View style={styles.card}>
      <FastImage source={{ uri: image }} style={styles.avatar} />

      <Text style={styles.name}>{name}</Text>

      <View style={styles.buttonRow}>
        {/* Remove Button */}
        <TouchableOpacity
          style={styles.iconButton}
          onPress={onRemove}
          activeOpacity={0.7}
        >
          <FastImage
            source={{ uri: actionUri }}
            style={{ width: 20, height: 20 }}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* Message Button */}
        <TouchableOpacity
          style={styles.iconButton}
          onPress={onMessage}
          activeOpacity={0.7}
        >
          <FastImage
            source={{ uri: messageUri }}
            style={{ width: 20, height: 20 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: horizontalScale(10),
    padding: horizontalScale(12),
    marginBottom: verticalScale(12),
    marginHorizontal: horizontalScale(16),
  },
  avatar: {
    width: horizontalScale(50),
    height: horizontalScale(50),
    borderRadius: horizontalScale(25),
  },
  name: {
    flex: 1,
    marginLeft: horizontalScale(12),
    fontSize: horizontalScale(16),
    color: colors.black,
    fontWeight: '500',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: horizontalScale(8),
  },
  iconButton: {
    backgroundColor: colors.green,
    padding: horizontalScale(10),
    borderRadius: horizontalScale(10),
  },
});
