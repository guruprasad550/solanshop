import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Mail, Lock } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { globalStyles } from '@/constants/styles';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/store/slices/authSlice';

export default function SignInScreen() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      dispatch(loginSuccess({
        id: '1',
        name: 'John Doe',
        email: email,
        avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
        preferences: {
          notifications: true,
          location: true,
        },
      }));
      setIsLoading(false);
      router.replace('/(tabs)');
    }, 1500);
  };

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
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              leftIcon={<Mail size={20} color={colors.neutral[400]} />}
            />
            
            <Input
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry
              leftIcon={<Lock size={20} color={colors.neutral[400]} />}
            />

            <Button
              title="Sign In"
              onPress={handleSignIn}
              isLoading={isLoading}
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