import { useEffect } from 'react';
import { router } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

export default function Index() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Simulate checking authentication status
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        router.replace('/(tabs)');
      } else {
        router.replace('/(auth)/welcome');
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [isAuthenticated]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary[500]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
});