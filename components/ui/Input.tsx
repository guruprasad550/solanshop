import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { colors } from 'constants/colors';

interface InputProps extends TextInputProps {
  label: string;
  leftIcon?: React.ReactNode;
  error?: boolean;
  errorMessage?: string;
  style?: object;
}

export function Input({ label, leftIcon, error, errorMessage, style, ...props }: InputProps) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputContainer, error && styles.inputContainerError]}>
        {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}
        <TextInput
          style={styles.input}
          placeholderTextColor={colors.neutral[400]}
          {...props}
        />
      </View>
      {/* Conditionally render the error message when it exists */}
      {errorMessage && (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.neutral[700],
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral[50],
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.neutral[200],
    height: 52,
  },
  inputContainerError: {
    borderColor: colors.danger?.[500] || '#EF4444', // Red border for error
  },
  iconContainer: {
    paddingLeft: 16,
    paddingRight: 12,
  },
  input: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: colors.neutral[900],
    paddingRight: 16,
  },
  errorMessage: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: colors.danger?.[500] || '#EF4444', // Red color for error message
    marginTop: 4,
  },
});