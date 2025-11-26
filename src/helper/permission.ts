import { 
    check, 
    request, 
    RESULTS, 
    Permission, 
    PERMISSIONS 
  } from 'react-native-permissions';
  import { Platform, Alert } from 'react-native';
  
  export const checkCameraAndMicPermissions = async (): Promise<boolean> => {
    const cameraPermission: Permission | undefined = Platform.select({
      ios: PERMISSIONS.IOS.CAMERA,
      android: PERMISSIONS.ANDROID.CAMERA,
    });
  
    const micPermission: Permission | undefined = Platform.select({
      ios: PERMISSIONS.IOS.MICROPHONE,
      android: PERMISSIONS.ANDROID.RECORD_AUDIO,
    });
  
    if (!cameraPermission || !micPermission) {
      console.warn('Platform not supported for permission check.');
      return false;
    }
  
    const checkAndRequest = async (perm: Permission, name: string): Promise<boolean> => {
      const result = await check(perm);
  
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log(`${name} is not available on this device.`);
          return false;
        case RESULTS.DENIED:
          console.log(`${name} permission denied. Requesting...`);
          const requestResult = await request(perm);
          return requestResult === RESULTS.GRANTED;
        case RESULTS.GRANTED:
          console.log(`${name} permission granted.`);
          return true;
        case RESULTS.BLOCKED:
          console.log(`${name} permission blocked.`);
          Alert.alert(
            `${name} Permission Required`,
            `Please enable ${name.toLowerCase()} permission from app settings.`,
            [{ text: 'OK' }]
          );
          return false;
        default:
          return false;
      }
    };
  
    const hasCamera = await checkAndRequest(cameraPermission, 'Camera');
    const hasMic = await checkAndRequest(micPermission, 'Microphone');
  
    return hasCamera && hasMic;
  };
  