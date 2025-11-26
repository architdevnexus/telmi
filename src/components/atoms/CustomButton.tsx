import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, horizontalScale, verticalScale } from '../../utils';

// loader
import { ActivityIndicator } from 'react-native';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
}

export const CustomButton: React.FC<CustomButtonProps> = ({ title, onPress, isLoading }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <LinearGradient
        style={styles.gradient}
        colors={[colors.white, colors.green]}>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color={colors.black}
            style={styles.activityIndicator}
          />
        ) : (
          <Text style={styles.text}>{title}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: verticalScale(60),
    borderRadius: horizontalScale(60),
    overflow: 'hidden',
    marginVertical: verticalScale(20),
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: horizontalScale(18),
    fontWeight: '600',
    color: colors.white,
  },
  activityIndicator: {
    marginLeft: horizontalScale(10),
    width: horizontalScale(40),
    height: horizontalScale(40),
  },
});
