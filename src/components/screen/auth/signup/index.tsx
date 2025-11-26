import React, { useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import Video from 'react-native-video';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// Assets
import { main_BG_Video } from '../../../../assets';
import { png } from '../../../../assets/png';

// Utils & Constants
import { colors, horizontalScale, verticalScale } from '../../../../utils';

// Components
import { CustomButton, CustomInput } from '../../../atoms';

// Navigation
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// API
import { auth } from '../../../../api/apiCall';

// Formik
import { Formik } from 'formik';
import { validationSchema } from '../../../../helper/yupSchema';

// AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

// Types
type RootStackParamList = {
  login: undefined;
  opt_verification: undefined;
};

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'opt_verification'
>;

type signupType = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const Signup = () => {
  const navigation = useNavigation<NavigationProp>();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (values: signupType) => {
    setIsLoading(true);
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    let body = {
      fullName: values.fullName,
      email: values.email,
      password: values.password,
      deviceToken: fcmToken,
    };
    let response = await auth.signup(body);
    console.log(response);
    if (response.status === 201) {
      await AsyncStorage.setItem('otpEmail', values.email);
      setIsLoading(false);
      navigation.navigate('opt_verification');
    } else {
      Alert.alert('Error', response.data.message);
      setIsLoading(false);
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

          {/* Form Inputs */}

          <Formik
            initialValues={{
              fullName: '',
              email: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={validationSchema.signup}
            onSubmit={handleSignup}>
            {({
              handleChange,
              handleSubmit,
              handleBlur,
              values,
              touched,
              errors,
            }) => (
              <>
                <CustomInput
                  label="Full Name"
                  value={values.fullName}
                  placeholder="Enter your fullName"
                  onBlur={() => handleBlur('fullName')}
                  onChangeText={handleChange('fullName')}
                  error={(touched.fullName && errors.fullName) || ''}
                />
                <CustomInput
                  label="Email"
                  value={values.email}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  onBlur={() => handleBlur('email')}
                  onChangeText={handleChange('email')}
                  error={(touched.email && errors.email) || ''}
                />
                <CustomInput
                  label="Password"
                  value={values.password}
                  placeholder="Enter your password"
                  secureTextEntry
                  showToggle
                  showPassword={showPassword}
                  onTogglePassword={() => setShowPassword(!showPassword)}
                  onChangeText={handleChange('password')}
                  onBlur={() => handleBlur('password')}
                  error={(touched.password && errors.password) || ''}
                />
                <CustomInput
                  label="Confirm Password"
                  value={values.confirmPassword}
                  placeholder="Re-enter your password"
                  secureTextEntry
                  showToggle
                  showPassword={showConfirmPassword}
                  onTogglePassword={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  onBlur={() => handleBlur('confirmPassword')}
                  onChangeText={handleChange('confirmPassword')}
                  error={
                    (touched.confirmPassword && errors.confirmPassword) || ''
                  }
                />

                {/* Signup Button */}
                <CustomButton
                  title="Signup"
                  onPress={handleSubmit}
                  isLoading={isLoading}
                />
              </>
            )}
          </Formik>

          {/* Footer Link */}
          <View style={styles.footerLinks}>
            <Text style={styles.guestText}>Already have an account. </Text>
            <TouchableOpacity onPress={() => navigation.navigate('login')}>
              <Text style={styles.linkText}>Login</Text>
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
  },
  linkText: {
    fontSize: horizontalScale(18),
    fontWeight: '400',
    color: colors.green,
    textDecorationLine: 'underline',
  },
});
