import React from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, User, Mail, Lock } from 'lucide-react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { API_URL } from '@/constants/api';
import { colors } from 'constants/colors';
import { globalStyles } from 'constants/styles';
import { Input } from 'components/ui/Input';
import { Button } from 'components/ui/Button';

const signUpSchema = yup.object().shape({
  name: yup
    .string()
    .required('Full Name is required')
    .matches(/^[a-zA-Z\s]+$/, 'Full Name can only contain letters and spaces'),
  email: yup.string().email('Please enter a valid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export default function SignUpScreen() {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: signUpSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await fetch(`${API_URL}/api/auth/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            password: values.password,
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          if (data.errors && Array.isArray(data.errors)) {
            const errorMessages = data.errors.map((err: any) => err.msg).join('\n');
            throw new Error(errorMessages);
          }
          throw new Error(data.msg || 'An unknown error occurred during sign up.');
        }

        Alert.alert('Success', 'Account created successfully! Please sign in.');
        router.replace('/(auth)/signin');
      } catch (error: any) {
        console.error('Sign Up Error:', error);
        Alert.alert('Sign Up Failed', error.message || 'An unexpected error occurred.');
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
            <Text style={globalStyles.heading1}>Create Account</Text>
            <Text style={styles.subtitle}>Join us and discover amazing salon services</Text>
          </View>

          <View style={styles.form}>
            <Input
              label="Full Name"
              value={formik.values.name}
              onChangeText={formik.handleChange('name')}
              onBlur={formik.handleBlur('name')}
              placeholder="Enter your full name"
              leftIcon={<User size={20} color={colors.neutral[400]} />}
              error={formik.touched.name && Boolean(formik.errors.name)}
              errorMessage={formik.touched.name ? formik.errors.name : undefined}
            />
            
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
              placeholder="Create a password"
              secureTextEntry
              leftIcon={<Lock size={20} color={colors.neutral[400]} />}
              error={formik.touched.password && Boolean(formik.errors.password)}
              errorMessage={formik.touched.password ? formik.errors.password : undefined}
            />

            <Button
              title="Create Account"
              onPress={() => formik.handleSubmit()}
              isLoading={formik.isSubmitting}
              style={styles.signUpButton}
            />
          </View>

          <View style={styles.footer}>
            <Text style={styles.signInText}>
              Already have an account?{' '}
              <Text style={styles.signInLink} onPress={() => router.push('/(auth)/signin')}>
                Sign In
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
  signUpButton: {
    marginTop: 8,
  },
  footer: {
    marginTop: 32,
    alignItems: 'center',
  },
  signInText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.neutral[600],
  },
  signInLink: {
    fontFamily: 'Inter-SemiBold',
    color: colors.primary[500],
  },
});