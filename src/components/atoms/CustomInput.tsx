import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInputProps,
} from 'react-native';
import { horizontalScale, verticalScale, colors } from '../../utils';
import { png } from '../../assets/png';

interface CustomInputProps extends TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  showToggle?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  error?: string;
  onBlur?: () => void;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  secureTextEntry = false,
  showToggle = false,
  showPassword = false,
  onTogglePassword,
  error,
  onBlur
}) => {
  return (
    <View style={styles.inputGroup}>
      <Text style={[styles.label, { color: error ? colors.red : colors.white }]}>{label}</Text>
      <View style={styles.passwordWrapper}>
        <TextInput
          style={[styles.input, { borderColor: error ? colors.red : colors.white }]}
          value={value}
          onChangeText={onChangeText}
          placeholder={error ? error : placeholder}
          placeholderTextColor={error ? colors.red : colors.offWhite}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry && !showPassword}
          autoCapitalize="none"
          onBlur={onBlur}
        />
        {showToggle && (
          <TouchableOpacity onPress={onTogglePassword} style={styles.eyeButton}>
            <Image
              source={
                showPassword
                  ? png.eye_off
                  : png.eye
              }
              style={styles.eyeIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputGroup: {
    marginVertical: verticalScale(10),
  },
  label: {
    fontSize: horizontalScale(16),
    fontWeight: '500',
    marginBottom: verticalScale(8),
  },
  input: {
    width: '100%',
    height: verticalScale(60),
    borderWidth: 1,
    borderRadius: horizontalScale(10),
    paddingHorizontal: horizontalScale(20),
    paddingRight: horizontalScale(50),
    color: colors.white,
    fontSize: horizontalScale(16),
    fontWeight: '500',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  passwordWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  eyeButton: {
    position: 'absolute',
    right: horizontalScale(20),
    top: verticalScale(18),
  },
  eyeIcon: {
    width: horizontalScale(25),
    height: horizontalScale(25),
  },
});
