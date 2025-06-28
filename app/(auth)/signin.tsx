import React from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Mail, Lock } from 'lucide-react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { API_URL } from '@/constants/api';
import { colors } from 'constants/colors';
import { globalStyles } from 'constants/styles';
import { Button } from 'components/ui/Button';
import { Input } from 'components/ui/Input';
import { loginSuccess } from 'store/slices/authSlice';

const signInSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

export default function SignInScreen() {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: signInSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await fetch(`${API_URL}/api/auth/signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.msg || 'An unknown error occurred.');
        }

        // The backend returns { token, user: { id, name, email } }
        // We can dispatch the user object to our Redux store.
        // Note: The API doesn't provide avatar or preferences, so we omit them.
        dispatch(loginSuccess(data.user));
        router.replace('/(tabs)');

      } catch (error: any) {
        Alert.alert('Sign In Failed', error.message || 'An unexpected error occurred.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleBackPress = () => {
    router.back();
  };

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Button
              onPress={handleBackPress}
              style={styles.backButton}
              textStyle={styles.backButtonText}
              leftIcon={<ArrowLeft size={20} color={colors.neutral[600]} />}
            />
            <Text style={globalStyles.heading1}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to continue to your account</Text>
          </View>

          <View style={styles.form}>
            <Input
              label="Email"
              value={formik.values.email}
              onChangeText={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              leftIcon={<Mail size={20} color={colors.neutral[400]} />}
              error={formik.touched.email && Boolean(formik.errors.email)}
              errorMessage={formik.touched.email ? formik.errors.email : undefined}
            />
            
            <Input
              label="Password"
              value={formik.values.password}
              onChangeText={formik.handleChange('password')}
              onBlur={formik.handleBlur('password')}
              placeholder="Enter your password"
              secureTextEntry
              leftIcon={<Lock size={20} color={colors.neutral[400]} />}
              error={formik.touched.password && Boolean(formik.errors.password)}
              errorMessage={formik.touched.password ? formik.errors.password : undefined}
            />

            <Button
              title="Sign In"
              onPress={() => formik.handleSubmit()}
              isLoading={formik.isSubmitting}
              style={styles.signInButton}
            />

            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </View>

          <View style={styles.footer}>
            <Text style={styles.signUpText}>
              Don't have an account?{' '}
              <Text style={styles.signUpLink} onPress={() => router.push('/(auth)/signup')}>
                Sign Up
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  header: {
    marginBottom: 32,
  },
  backButton: {
    alignSelf: 'flex-start',
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
    paddingVertical: 8,
    marginBottom: 16,
  },
  backButtonText: {
    color: colors.neutral[600],
  },
  subtitle: {
    ...globalStyles.body,
    marginTop: 8,
  },
  form: {
    flex: 1,
    gap: 20,
  },
  signInButton: {
    marginTop: 8,
  },
  forgotPassword: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.primary[500],
    textAlign: 'center',
    marginTop: 16,
  },
  footer: {
    marginTop: 32,
    alignItems: 'center',
  },
  signUpText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.neutral[600],
  },
  signUpLink: {
    fontFamily: 'Inter-SemiBold',
    color: colors.primary[500],
  },
});