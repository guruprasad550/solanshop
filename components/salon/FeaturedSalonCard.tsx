import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ViewStyle } from 'react-native';
import { router } from 'expo-router';
import { Star, MapPin } from 'lucide-react-native';
import { colors } from 'constants/colors';
import { globalStyles } from 'constants/styles';
import { Salon } from 'types/salon';

interface FeaturedSalonCardProps {
  salon: Salon;
  style?: ViewStyle;
}

export function FeaturedSalonCard({ salon, style }: FeaturedSalonCardProps) {
  const handlePress = () => {
    router.push(`/salon/${salon.id}` as any);
  };

  return (
    <TouchableOpacity style={[styles.card, style]} onPress={handlePress} activeOpacity={0.9}>
      <Image source={{ uri: salon.heroImage }} style={styles.image} />
      
      <View style={styles.overlay}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.name}>{salon.name}</Text>
            <View style={styles.rating}>
              <Star size={14} color={colors.accent[500]} fill={colors.accent[500]} />
              <Text style={styles.ratingText}>{salon.rating}</Text>
            </View>
          </View>
          
          <View style={styles.location}>
            <MapPin size={14} color={colors.white} />
            <Text style={styles.locationText}>{salon.distance} km away</Text>
          </View>
          
          <Text style={styles.priceCategory}>{salon.priceCategory}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    ...globalStyles.shadow,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-end',
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: colors.white,
    flex: 1,
    marginRight: 8,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: colors.white,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  locationText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: colors.white,
    opacity: 0.9,
  },
  priceCategory: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: colors.success[400],
  },
});