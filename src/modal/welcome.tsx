import React from 'react';
import {Modal, View, Text, StyleSheet} from 'react-native';
import {colors} from '../utils/colors_palette';
import {verticalScale, horizontalScale} from '../utils';
import {AcceptButton} from '../components/atoms';

interface WelcomeModalProps {
  visible: boolean;
  onContinue: () => void;
  userData: any;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({
  visible,
  onContinue,
  userData,
}) => {
  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.greeting}>Hi {userData.fullName}</Text>
          <Text style={styles.title}>Wellcome!</Text>
          <AcceptButton onPress={onContinue} title="Continue" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(17, 54, 57, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: colors.white,
    borderRadius: horizontalScale(20),
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(50),
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  greeting: {
    fontSize: horizontalScale(18),
    fontWeight: '600',
    color: colors.black,
    marginBottom: verticalScale(4),
  },
  userName: {
    color: colors.black,
    fontWeight: '600',
  },
  title: {
    fontSize: horizontalScale(24),
    fontWeight: '400',
    color: colors.black,
    marginBottom: verticalScale(16),
  },
  message: {
    fontSize: horizontalScale(16),
    color: colors.lightGray,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: verticalScale(24),
    lineHeight: verticalScale(20),
  },
});
