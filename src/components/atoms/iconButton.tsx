import React from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  GestureResponderEvent,
  ImageSourcePropType,
} from 'react-native';
import {colors, horizontalScale} from '../../utils';

type IconButtonProps = {
  onPress: (event: GestureResponderEvent) => void;
  source: ImageSourcePropType;
};

export const IconButton: React.FC<IconButtonProps> = ({onPress, source}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Image source={source} style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginHorizontal: horizontalScale(10),
    backgroundColor: colors.white,
    borderRadius: horizontalScale(50),
  },
  icon: {
    width: horizontalScale(35),
    height: horizontalScale(35),
  },
});