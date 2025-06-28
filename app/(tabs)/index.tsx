import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { MapPin, Bell } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { globalStyles } from '@/constants/styles';
import { RootState } from '@/store/store';
import { setSalons, setFeaturedSalons } from '@/store/slices/salonSlice';
import { mockSalons } from '@/data/mockData';
import { SalonCard } from '@/components/salon/SalonCard';
import { FeaturedCarousel } from '@/components/salon/FeaturedCarousel';
import { SearchBar } from '@/components/ui/SearchBar';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { salons, featuredSalons, isLoading } = useSelector((state: RootState) => state.salon);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    // Simulate API calls
    dispatch(setSalons(mockSalons));
    dispatch(setFeaturedSalons(mockSalons.slice(0, 3)));
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, []);

  const handleSearch = (query: string) => {
    // Implement search functionality
    console.log('Search query:', query);
  };

  return (
    <SafeAreaView style={globalStyles.safeArea} edges={['top']}>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={[styles.scrollContent, globalStyles.contentWithBottomPadding]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.header}>
          <View style={styles.locationContainer}>
            <MapPin size={16} color={colors.neutral[500]} />
            <Text style={styles.locationText}>Downtown, San Francisco</Text>
          </View>
          <View style={styles.headerRight}>
            <Bell size={24} color={colors.neutral[600]} />
          </View>
        </View>

        <View style={styles.greeting}>
          <Text style={styles.greetingText}>
            Hello, {user?.name?.split(' ')[0] || 'there'}! 👋
          </Text>
          <Text style={styles.greetingSubtext}>
            Find your perfect salon experience
          </Text>
        </View>

        <SearchBar 
          placeholder="Search salons, services..." 
          onSearch={handleSearch}
          style={styles.searchBar}
        />

        <View style={styles.section}>
          <Text style={globalStyles.heading3}>Featured Salons</Text>
          <FeaturedCarousel salons={featuredSalons} />
        </View>

        <View style={styles.section}>
          <Text style={globalStyles.heading3}>Near You</Text>
          <Text style={styles.sectionSubtitle}>
            {salons.length} salons available
          </Text>
          <View style={styles.salonsList}>
            {salons.map((salon) => (
              <SalonCard key={salon.id} salon={salon} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.white,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.neutral[600],
  },
  headerRight: {
    padding: 8,
  },
  greeting: {
    padding: 16,
    backgroundColor: colors.white,
  },
  greetingText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: colors.neutral[900],
    marginBottom: 4,
  },
  greetingSubtext: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.neutral[600],
  },
  searchBar: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  section: {
    padding: 16,
    backgroundColor: colors.white,
    marginTop: 8,
  },
  sectionSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: colors.neutral[500],
    marginTop: 4,
    marginBottom: 16,
  },
  salonsList: {
    gap: 12,
  },
});