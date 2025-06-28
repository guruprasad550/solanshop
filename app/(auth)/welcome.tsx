import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Sparkles, Calendar, MapPin } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { globalStyles } from '@/constants/styles';
import { Button } from '@/components/ui/Button';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const handleGetStarted = () => {
    router.push('/(auth)/signin');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[colors.primary[500], colors.secondary[500]]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop' }}
              style={styles.logo}
            />
            <Text style={styles.title}>Welcome to{'\n'}Salon Booking</Text>
            <Text style={styles.subtitle}>
              Discover and book appointments at the best salons near you
            </Text>
          </View>

          <View style={styles.features}>
            <View style={styles.feature}>
              <MapPin size={32} color={colors.white} />
              <Text style={styles.featureText}>Find nearby salons</Text>
            </View>
            <View style={styles.feature}>
              <Calendar size={32} color={colors.white} />
              <Text style={styles.featureText}>Easy booking</Text>
            </View>
            <View style={styles.feature}>
              <Sparkles size={32} color={colors.white} />
              <Text style={styles.featureText}>Premium services</Text>
            </View>
          </View>

          <View style={styles.footer}>
            <Button
              title="Get Started"
              onPress={handleGetStarted}
              style={styles.button}
              textStyle={styles.buttonText}
            />
            <Text style={styles.signInText}>
              Already have an account?{' '}
              <Text style={styles.signInLink} onPress={() => router.push('/(auth)/signin')}>
                Sign In
              </Text>
            </Text>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  header: {
    alignItems: 'center',
    marginTop: height * 0.08,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    lineHeight: 38,
    color: colors.white,
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 24,
    color: colors.white,
    textAlign: 'center',
    opacity: 0.9,
  },
  features: {
    alignItems: 'center',
    gap: 32,
  },
  feature: {
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: colors.white,
  },
  footer: {
    width: '100%',
    alignItems: 'center',
    gap: 16,
  },
  button: {
    width: '100%',
    backgroundColor: colors.white,
    paddingVertical: 16,
  },
  buttonText: {
    color: colors.primary[500],
    fontFamily: 'Inter-SemiBold',
  },
  signInText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.white,
    opacity: 0.9,
  },
  signInLink: {
    fontFamily: 'Inter-SemiBold',
    textDecorationLine: 'underline',
  },
});