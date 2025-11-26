import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors, horizontalScale, verticalScale, width} from '../../utils';

interface ButtonProps {
  onPress: () => void;
  title: string;
}

export const AcceptButton: React.FC<ButtonProps> = ({onPress, title}) => (
  <TouchableOpacity style={styles.acceptButton} onPress={onPress}>
    <Text style={styles.acceptText}>{title}</Text>
  </TouchableOpacity>
);

export const DeclineButton: React.FC<ButtonProps> = ({onPress, title}) => (
  <TouchableOpacity style={styles.declineButton} onPress={onPress}>
    <Text style={styles.declineText}>{title}</Text>
  </TouchableOpacity>
);

export const Button = ({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity style={[styles.mainWrapper]} onPress={onPress}>
      <Text
        style={{
          color: '#000',
          fontSize: width * 0.045,
          textAlign: 'center',
          fontFamily: 'Inter',
          fontWeight: '600',
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    paddingVertical: width * 0.03,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.2,
    elevation: 5,
    shadowRadius: 3,
  },
  acceptButton: {
    backgroundColor: colors.green,
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(40),
    borderRadius: horizontalScale(12),
    alignItems: 'center',
    shadowColor: colors.green,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  declineButton: {
    borderWidth: 2,
    borderColor: colors.green,
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(40),
    borderRadius: horizontalScale(12),
    alignItems: 'center',
    shadowColor: colors.green,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  acceptText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: horizontalScale(16),
  },
  declineText: {
    color: colors.green,
    fontWeight: 'bold',
    fontSize: horizontalScale(16),
  },
});
