import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Filter, MapPin } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { globalStyles } from '@/constants/styles';
import { mockSalons } from '@/data/mockData';
import { SalonCard } from '@/components/salon/SalonCard';
import { SearchBar } from '@/components/ui/SearchBar';
import { Button } from '@/components/ui/Button';

export default function ShopsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSalons, setFilteredSalons] = useState(mockSalons);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredSalons(mockSalons);
    } else {
      const filtered = mockSalons.filter(salon =>
        salon.name.toLowerCase().includes(query.toLowerCase()) ||
        salon.address.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSalons(filtered);
    }
  };

  const handleFilter = () => {
    // Implement filter functionality
    console.log('Open filters');
  };

  const renderSalon = ({ item }: { item: typeof mockSalons[0] }) => (
    <SalonCard salon={item} />
  );

  return (
    <SafeAreaView style={globalStyles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={globalStyles.heading2}>Find Salons</Text>
          <View style={styles.locationContainer}>
            <MapPin size={16} color={colors.neutral[500]} />
            <Text style={styles.locationText}>Downtown, San Francisco</Text>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <SearchBar
            placeholder="Search salons, services..."
            value={searchQuery}
            onSearch={handleSearch}
            style={styles.searchBar}
          />
          <Button
            onPress={handleFilter}
            style={styles.filterButton}
            leftIcon={<Filter size={20} color={colors.neutral[600]} />}
          />
        </View>

        <View style={styles.resultsHeader}>
          <Text style={styles.resultsText}>
            {filteredSalons.length} salon{filteredSalons.length !== 1 ? 's' : ''} found
          </Text>
        </View>

        <FlatList
          data={filteredSalons}
          renderItem={renderSalon}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[styles.list, globalStyles.contentWithBottomPadding]}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  header: {
    padding: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  locationText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.neutral[600],
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.white,
  },
  searchBar: {
    flex: 1,
    margin: 0,
  },
  filterButton: {
    backgroundColor: colors.neutral[100],
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
  },
  resultsHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.white,
  },
  resultsText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.neutral[600],
  },
  list: {
    padding: 16,
    gap: 12,
  },
});