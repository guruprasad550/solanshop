import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar, Clock } from 'lucide-react-native';
import { colors } from 'constants/colors';
import { globalStyles } from 'constants/styles';
import { RootState } from 'store/store';
import { setBookings } from 'store/slices/bookingSlice';
import { mockBookings } from 'data/mockData';
import { BookingCard } from 'components/booking/BookingCard';

export default function OrdersScreen() {
  const dispatch = useDispatch();
  const { bookings, isLoading } = useSelector((state: RootState) => state.booking);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    // Simulate API call
    dispatch(setBookings(mockBookings));
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await loadBookings();
    setRefreshing(false);
  }, []);

  const upcomingBookings = bookings.filter(booking => booking.status === 'upcoming');
  const pastBookings = bookings.filter(booking => booking.status === 'completed');

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
          <Text style={globalStyles.heading2}>My Bookings</Text>
          <Text style={styles.headerSubtitle}>
            Manage your appointments and history
          </Text>
        </View>

        {upcomingBookings.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Calendar size={20} color={colors.primary[500]} />
              <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
            </View>
            <View style={styles.bookingsList}>
              {upcomingBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </View>
          </View>
        )}

        {pastBookings.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Clock size={20} color={colors.neutral[500]} />
              <Text style={styles.sectionTitle}>Past Appointments</Text>
            </View>
            <View style={styles.bookingsList}>
              {pastBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </View>
          </View>
        )}

        {bookings.length === 0 && (
          <View style={styles.emptyState}>
            <Calendar size={48} color={colors.neutral[400]} />
            <Text style={styles.emptyTitle}>No Bookings Yet</Text>
            <Text style={styles.emptySubtitle}>
              Start exploring salons and book your first appointment
            </Text>
          </View>
        )}
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
    padding: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  headerSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.neutral[600],
    marginTop: 4,
  },
  section: {
    backgroundColor: colors.white,
    marginTop: 8,
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: colors.neutral[900],
  },
  bookingsList: {
    gap: 12,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 48,
    backgroundColor: colors.white,
    marginTop: 32,
    marginHorizontal: 16,
    borderRadius: 12,
  },
  emptyTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: colors.neutral[900],
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.neutral[600],
    textAlign: 'center',
    lineHeight: 20,
  },
});