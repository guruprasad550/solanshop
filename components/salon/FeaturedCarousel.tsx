import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { FeaturedSalonCard } from './FeaturedSalonCard';
import { Salon } from 'types/salon';

interface FeaturedCarouselProps {
  salons: Salon[];
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;
const CARD_SPACING = 16;

export function FeaturedCarousel({ salons }: FeaturedCarouselProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      decelerationRate="fast"
      snapToInterval={CARD_WIDTH + CARD_SPACING}
      snapToAlignment="start"
    >
      {salons.map((salon, index) => (
        <FeaturedSalonCard
          key={salon.id}
          salon={salon}
          style={[
            styles.card,
            { width: CARD_WIDTH },
            index === 0 && styles.firstCard,
            index === salons.length - 1 && styles.lastCard,
          ]}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  card: {
    marginRight: CARD_SPACING,
  },
  firstCard: {
    marginLeft: 0,
  },
  lastCard: {
    marginRight: 0,
  },
});