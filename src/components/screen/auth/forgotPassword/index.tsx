import React, {useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import Video from 'react-native-video';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

// Assets
import {main_BG_Video} from '../../../../assets';
import {png} from '../../../../assets/png';

// Utils & Constants
import {colors, horizontalScale, verticalScale} from '../../../../utils';

// Components
import {CustomButton, CustomInput} from '../../../atoms';

// Navigation
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

// API
import {auth} from '../../../../api/apiCall';
// Formik
import {Formik} from 'formik';
import {validationSchema} from '../../../../helper/yupSchema';
// AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

// Types
type RootStackParamList = {
  login: undefined;
  opt_verification: undefined;
};

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'login',
  'opt_verification'
>;

export const ForgotPassword = () => {
  // Navigation
  const navigation = useNavigation<NavigationProp>();

  // State Hooks

  const handleForgotPassword = async (values: any) => {
    if (values.email.length === 0) {
      Alert.alert('Error', 'Please enter email');
      return;
    }

    let body = {
      email: values.email,
    };
    let response = await auth.forgotPassword(body);
    console.log(response);
    if (response.status === 200) {
      await AsyncStorage.setItem('otpEmail', values.email);
      await AsyncStorage.setItem('isForgot', 'true');
      navigation.navigate('opt_verification');
    } else {
      Alert.alert('Error', response.data.message);
    }
  };

  // Render
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

          {/* Form */}
          <Formik
            initialValues={{
              email: '',
            }}
            validationSchema={validationSchema.forgotPassword}
            onSubmit={handleForgotPassword}>
            {({
              handleChange,
              handleSubmit,
              handleBlur,
              values,
              touched,
              errors,
            }) => (
              <>
                {/* Email Input */}
                <CustomInput
                  label="Email"
                  value={values.email}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  onBlur={() => handleBlur('email')}
                  onChangeText={handleChange('email')}
                  error={(touched.email && errors.email) || ''}
                />

                {/* Login Button */}
                <CustomButton title="Continue" onPress={handleSubmit} />
              </>
            )}
          </Formik>

          {/* Signup Link */}
          <View style={styles.footerLinks}>
            <TouchableOpacity onPress={() => navigation.navigate('login')}>
              <Text style={styles.guestText}>Back to Login</Text>
            </TouchableOpacity>
          </View>
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
  guestText: {
    fontSize: horizontalScale(18),
    fontWeight: '400',
    color: colors.white,
  },
  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: verticalScale(20),
  },
});
