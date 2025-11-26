import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Video from 'react-native-video';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// Assets
import { main_BG_Video } from '../../../../assets';
import { png } from '../../../../assets/png';

// Utils & Constants
import { colors, horizontalScale, verticalScale } from '../../../../utils';

// Components
import { CustomButton, CustomInput, IconButton } from '../../../atoms';

// Navigation
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Alert } from 'react-native';
// Formik
import { Formik } from 'formik';
// Yup Schema
import { validationSchema } from '../../../../helper/yupSchema';
// Login Type
import { loginType } from '../../../../helper';
// API
import { auth } from '../../../../api/apiCall';
// AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

// Redux
import { setToken, setUser, setUserId } from '../../../../redux/reducer/users';
import { useDispatch } from 'react-redux';

// Types
type RootStackParamList = {
  signup: undefined;
  forgot_password: undefined;
  bottom_tab: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const Login = () => {
  // Navigation
  const navigation = useNavigation<NavigationProp>();

  // Redux
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (values: loginType) => {
    //FCM TOKEN
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    //FCM TOKEN

    let response = await auth.login({ ...values, deviceToken: fcmToken });
    let userData = response.data.user;
    let token = response.data.jwtToken;
    if (userData) {
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('userId', userData._id);
      dispatch(setToken(token));
      dispatch(setUser(userData));
      dispatch(setUserId(userData._id));
      navigation.replace('bottom_tab');
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
          <Image source={png.logo} style={styles.logo} resizeMode="contain" />

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema.login}
            onSubmit={handleLogin}>
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

                {/* Password Input with Toggle */}
                <CustomInput
                  label="Password"
                  value={values.password}
                  placeholder="Enter your password"
                  secureTextEntry
                  showToggle
                  showPassword={showPassword}
                  onTogglePassword={() => setShowPassword(!showPassword)}
                  error={(touched.password && errors.password) || ''}
                  onChangeText={handleChange('password')}
                  onBlur={() => handleBlur('password')}
                />

                {/* Forgot Password */}
                <TouchableOpacity
                  style={styles.alignRight}
                  onPress={() => navigation.navigate('forgot_password')}>
                  <Text style={styles.guestText}>Forgot password</Text>
                </TouchableOpacity>

                {/* Login Button */}
                <CustomButton title="Login" onPress={handleSubmit} />
              </>
            )}
          </Formik>

          {/* Guest Login
          <TouchableOpacity style={styles.guestButton}>
            <Text style={styles.guestText}>Login As a Guest</Text>
          </TouchableOpacity> */}

          {/* Signup Link */}
          <View style={styles.footerLinks}>
            <Text style={styles.guestText}>Didn't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('signup')}>
              <Text style={styles.linkText}>Signup</Text>
            </TouchableOpacity>
          </View>

          {/* Social Login */}
          <View style={styles.socialContainer}>
            <IconButton
              onPress={() => console.log('Facebook icon pressed')}
              source={png.facebook}
            />
            <IconButton
              onPress={() => console.log('Google icon pressed')}
              source={png.google}
            />
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
  alignRight: {
    alignItems: 'flex-end',
  },
  guestButton: {
    justifyContent: 'center',
    alignItems: 'center',
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
  linkText: {
    fontSize: horizontalScale(18),
    fontWeight: '400',
    color: colors.green,
    textDecorationLine: 'underline',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
