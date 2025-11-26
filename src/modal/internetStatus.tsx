import React, { useState, useEffect } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  Platform,
  Linking,
  Alert,
} from 'react-native';
import { colors } from '../utils';
import NetInfo from '@react-native-community/netinfo';
import { Button } from '../components/atoms';

export const InternetStatus = () => {
  const [isOffline, setIsOffline] = useState<boolean>(false);

  const checkInitialConnection = async () => {
    const state = await NetInfo.fetch();
    setIsOffline(!state.isConnected);
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOffline(!state.isConnected);
    });

    checkInitialConnection();

    return () => unsubscribe();
  }, []);

  return (
    <Modal visible={isOffline} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.mainCard}>
          <Text style={styles.modalTitle}>Connection Error</Text>
          <Text style={styles.modalText}>
            Oops! Looks like your device is not connected to the Internet.
          </Text>
          <Button label="Try Again" onPress={checkInitialConnection} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    color: colors.black,
    textAlign: 'center',
  },
  mainCard: {
    height: 300,
    width: '80%',
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    padding: 20,
  },
});
