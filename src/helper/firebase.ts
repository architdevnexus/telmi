import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fcmToken = async () => {
    try {

        let token = await AsyncStorage.getItem('fcmToken');
        if (token) {
        console.log(token);

            return;
        }
        await messaging().registerDeviceForRemoteMessages();
        let fcmToken = await messaging().getToken();        
        await AsyncStorage.setItem('fcmToken', fcmToken);
    } catch (error) {
        console.log('Error retrieving or storing FCM Token:', error);
    }
};

export const requestPermissionForMessaging = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        fcmToken();
    }
}

