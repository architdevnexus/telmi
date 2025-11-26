import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Video from 'react-native-video';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {OtpInput} from 'react-native-otp-entry';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

// AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

// API
import {auth} from '../../../../api/apiCall';

// Assets (replace these with correct paths or values)
import {main_BG_Video} from '../../../../assets';
import {png} from '../../../../assets/png';

// Utils (replace with your actual utility functions or constants)
import {colors, horizontalScale, verticalScale} from '../../../../utils';

// Components
import {CustomButton} from '../../../atoms';

// Navigation Types
type RootStackParamList = {
  login: undefined;
  reset_password: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const OtpVerification = () => {
  const navigation = useNavigation<NavigationProp>();

  const [otp, setOtp] = useState('');
  const [verifyBtnStatus, setVerifyBtnStatus] = useState(true);

  const handleVerify = async () => {
    let email = await AsyncStorage.getItem('otpEmail');
    let isForget = await AsyncStorage.getItem('isForgot');

    if (otp.length === 4) {
      let body = {
        email: email,
        otp: otp,
      };
      console.log(body);

      let response = await auth.verifyOtp(body);
      console.log(response);
      if (response.status === 200) {
        if (isForget === 'true') {
          navigation.navigate('reset_password');
        } else {
          navigation.navigate('login');
        }
      } else {
        Alert.alert('Error', response.data.message);
      }
    } else {
      Alert.alert('Error', 'Please enter valid OTP');
    }
  };

  const handleResendOtp = async () => {
    let email = await AsyncStorage.getItem('otpEmail');
    let body = {
      email: email,
    };
    let response = await auth.resendOtp(body);
    console.log(response);
    if (response.status === 200) {
      Alert.alert('Success', response.data.message);
    } else {
      Alert.alert('Error', response.data.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Background Video */}
      <Video
        source={main_BG_Video}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
        repeat
        muted
      />

      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContainer}
        enableOnAndroid
        keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          {/* Logo */}
          <Image source={png.logo} style={styles.logo} resizeMode="center" />

          {/* Info Text */}
          <Text style={styles.instructionText}>
            OTP sent! Please check your email and enter the code to proceed
          </Text>

          {/* OTP Input */}
          <OtpInput
            numberOfDigits={4}
            focusColor={colors.white}
            autoFocus
            onTextChange={text => console.log(text)}
            onFilled={text => {
              setOtp(text);
              setVerifyBtnStatus(text.length !== 4);
            }}
            textInputProps={{
              accessibilityLabel: 'One-Time Password',
            }}
            theme={{
              containerStyle: styles.otpContainer,
              pinCodeContainerStyle: styles.pinCodeContainer,
              pinCodeTextStyle: styles.pinCodeText,
              focusStickStyle: styles.focusStick,
              focusedPinCodeContainerStyle: styles.activePinCodeContainer,
            }}
          />

          {/* Resend Link */}
          <TouchableOpacity onPress={handleResendOtp}>
            <Text style={styles.resendText}>Resend</Text>
          </TouchableOpacity>

          {/* Verify Button */}
          <CustomButton title="Verify" onPress={handleVerify} />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: horizontalScale(40),
    justifyContent: 'center',
  },
  logo: {
    width: '100%',
    height: verticalScale(100),
  },
  instructionText: {
    color: colors.white,
    marginVertical: verticalScale(20),
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  pinCodeContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.white,
    marginHorizontal: horizontalScale(5),
    height: horizontalScale(60),
    width: horizontalScale(60),
  },
  pinCodeText: {
    fontSize: horizontalScale(24),
    color: colors.white,
    fontWeight: '700',
    textAlign: 'center',
  },
  focusStick: {
    backgroundColor: colors.white,
  },
  activePinCodeContainer: {
    borderBottomColor: colors.white,
  },
  resendText: {
    color: colors.white,
    marginTop: verticalScale(20),
    textAlign: 'center',
    fontSize: horizontalScale(18),
  },
});
