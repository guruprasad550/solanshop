import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Calendar, Clock, User, MapPin } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { globalStyles } from '@/constants/styles';
import { Button } from '@/components/ui/Button';
import type { Booking } from '@/types/salon';

interface BookingCardProps {
  booking: Booking;
}

export function BookingCard({ booking }: BookingCardProps) {
  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'upcoming':
        return colors.primary[500];
      case 'completed':
        return colors.success[500];
      case 'cancelled':
        return colors.error[500];
      case 'in-progress':
        return colors.warning[500];
      default:
        return colors.neutral[500];
    }
  };

  const getStatusText = (status: Booking['status']) => {
    switch (status) {
      case 'upcoming':
        return 'Upcoming';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      case 'in-progress':
        return 'In Progress';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const handleRebook = () => {
    // Implement rebook functionality
    console.log('Rebook appointment');
  };

  const handleViewDetails = () => {
    // Implement view details functionality
    console.log('View booking details');
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.salonInfo}>
          <Text style={styles.salonName}>{booking.salonName}</Text>
          <View style={[styles.status, { backgroundColor: getStatusColor(booking.status) }]}>
            <Text style={styles.statusText}>{getStatusText(booking.status)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.serviceInfo}>
          <Text style={styles.serviceName}>{booking.serviceName}</Text>
          <Text style={styles.price}>${booking.price}</Text>
        </View>

        <View style={styles.details}>
          <View style={styles.detailRow}>
            <Calendar size={16} color={colors.neutral[500]} />
            <Text style={styles.detailText}>{formatDate(booking.date)}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Clock size={16} color={colors.neutral[500]} />
            <Text style={styles.detailText}>
              {formatTime(booking.time)} ({booking.duration} min)
            </Text>
          </View>
          
          <View style={styles.detailRow}>
            <User size={16} color={colors.neutral[500]} />
            <Text style={styles.detailText}>{booking.staffName}</Text>
          </View>
        </View>

        {booking.notes && (
          <View style={styles.notes}>
            <Text style={styles.notesLabel}>Notes:</Text>
            <Text style={styles.notesText}>{booking.notes}</Text>
          </View>
        )}
      </View>

      <View style={styles.actions}>
        {booking.status === 'completed' && (
          <Button
            title="Book Again"
            onPress={handleRebook}
            variant="outline"
            style={styles.actionButton}
          />
        )}
        <Button
          title="View Details"
          onPress={handleViewDetails}
          variant="secondary"
          style={styles.actionButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    ...globalStyles.card,
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  salonInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  salonName: {
    ...globalStyles.heading4,
    flex: 1,
  },
  status: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
    color: colors.white,
    textTransform: 'uppercase',
  },
  content: {
    marginBottom: 16,
  },
  serviceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: colors.neutral[900],
  },
  price: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: colors.primary[500],
  },
  details: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.neutral[600],
  },
  notes: {
    marginTop: 12,
    padding: 12,
    backgroundColor: colors.neutral[50],
    borderRadius: 8,
  },
  notesLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: colors.neutral[700],
    marginBottom: 4,
  },
  notesText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: colors.neutral[600],
    lineHeight: 16,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 8,
  },
});