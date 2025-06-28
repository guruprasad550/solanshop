import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { Star, MapPin, Clock, Users } from 'lucide-react-native';
import { colors } from 'constants/colors';
import { globalStyles } from 'constants/styles';
import { Salon } from 'types/salon';

interface SalonCardProps {
  salon: Salon;
}

export function SalonCard({ salon }: SalonCardProps) {
  const handlePress = () => {
    router.push(`/salon/${salon.id}` as any);
  };

  const getCurrentStatus = () => {
    const now = new Date();
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const daySchedule = salon.operatingHours[currentDay];
    
    if (daySchedule?.isOpen) {
      return 'Open';
    }
    return 'Closed';
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress} activeOpacity={0.8}>
      <Image source={{ uri: salon.logo }} style={styles.image} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{salon.name}</Text>
          <View style={styles.rating}>
            <Star size={14} color={colors.accent[500]} fill={colors.accent[500]} />
            <Text style={styles.ratingText}>{salon.rating}</Text>
            <Text style={styles.reviewCount}>({salon.reviewCount})</Text>
          </View>
        </View>

        <View style={styles.details}>
          <View style={styles.detailRow}>
            <MapPin size={14} color={colors.neutral[500]} />
            <Text style={styles.detailText}>{salon.distance} km • {salon.address}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Clock size={14} color={colors.neutral[500]} />
            <Text style={styles.detailText}>{getCurrentStatus()}</Text>
            <Text style={styles.priceCategory}>{salon.priceCategory}</Text>
          </View>

          <View style={styles.detailRow}>
            <Users size={14} color={colors.neutral[500]} />
            <Text style={styles.detailText}>
              {salon.queueStatus.current} in queue • {salon.queueStatus.averageWaitTime} min wait
            </Text>
          </View>
        </View>

        <View style={styles.features}>
          {salon.features.slice(0, 3).map((feature, index) => (
            <View key={index} style={styles.feature}>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
          {salon.features.length > 3 && (
            <Text style={styles.moreFeatures}>+{salon.features.length - 3} more</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    ...globalStyles.card,
    flexDirection: 'row',
    marginBottom: 8,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  name: {
    ...globalStyles.heading4,
    flex: 1,
    marginRight: 8,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: colors.neutral[900],
  },
  reviewCount: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: colors.neutral[500],
  },
  details: {
    gap: 4,
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: colors.neutral[600],
    flex: 1,
  },
  priceCategory: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: colors.success[600],
  },
  features: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  feature: {
    backgroundColor: colors.primary[50],
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  featureText: {
    fontFamily: 'Inter-Regular',
    fontSize: 10,
    color: colors.primary[700],
  },
  moreFeatures: {
    fontFamily: 'Inter-Regular',
    fontSize: 10,
    color: colors.neutral[500],
    marginLeft: 4,
  },
});