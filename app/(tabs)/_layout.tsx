import { Tabs } from 'expo-router';
import { Chrome as Home, Search, Calendar } from 'lucide-react-native';
import { colors } from 'constants/colors';
import { Platform } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary[500],
        tabBarInactiveTintColor: colors.neutral[400],
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopWidth: 1,
          borderTopColor: colors.neutral[200],
          paddingTop: 8,
          paddingBottom: Platform.select({
            ios: 8,
            android: 16, // Extra padding for Android devices with navigation buttons
            web: 8,
          }),
          height: Platform.select({
            ios: 64,
            android: 80, // Increased height for Android to accommodate navigation buttons
            web: 64,
          }),
          // Add safe area padding for devices with home indicators
          paddingHorizontal: 16,
        },
        tabBarLabelStyle: {
          fontFamily: 'Inter-Medium',
          fontSize: 12,
          marginTop: 4,
          marginBottom: Platform.select({
            android: 8, // Extra bottom margin for Android
            default: 0,
          }),
        },
        tabBarItemStyle: {
          paddingVertical: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="shops"
        options={{
          title: 'Shops',
          tabBarIcon: ({ size, color }) => (
            <Search size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ size, color }) => (
            <Calendar size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}