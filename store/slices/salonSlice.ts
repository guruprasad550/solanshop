import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Salon, Review } from '@/types/salon';

interface SalonState {
  salons: Salon[];
  featuredSalons: Salon[];
  currentSalon: Salon | null;
  reviews: Review[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  filters: {
    priceRange: string[];
    distance: number;
    rating: number;
    categories: string[];
  };
}

const initialState: SalonState = {
  salons: [],
  featuredSalons: [],
  currentSalon: null,
  reviews: [],
  isLoading: false,
  error: null,
  searchQuery: '',
  filters: {
    priceRange: [],
    distance: 50,
    rating: 0,
    categories: [],
  },
};

const salonSlice = createSlice({
  name: 'salon',
  initialState,
  reducers: {
    setSalons: (state, action: PayloadAction<Salon[]>) => {
      state.salons = action.payload;
    },
    setFeaturedSalons: (state, action: PayloadAction<Salon[]>) => {
      state.featuredSalons = action.payload;
    },
    setCurrentSalon: (state, action: PayloadAction<Salon | null>) => {
      state.currentSalon = action.payload;
    },
    setReviews: (state, action: PayloadAction<Review[]>) => {
      state.reviews = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    updateFilters: (state, action: PayloadAction<Partial<SalonState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
});

export const {
  setSalons,
  setFeaturedSalons,
  setCurrentSalon,
  setReviews,
  setLoading,
  setError,
  setSearchQuery,
  updateFilters,
} = salonSlice.actions;
export default salonSlice.reducer;