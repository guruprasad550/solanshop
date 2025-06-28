export interface Salon {
  id: string;
  name: string;
  logo: string;
  heroImage: string;
  rating: number;
  reviewCount: number;
  priceCategory: '$' | '$$' | '$$$' | '$$$$';
  distance: number;
  address: string;
  email: string;
  website?: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  operatingHours: {
    [key: string]: {
      open: string;
      close: string;
      isOpen: boolean;
    };
  };
  queueStatus: {
    current: number;
    estimated: number;
    averageWaitTime: number;
  };
  features: string[];
  images: string[];
}

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  price: number;
  category: ServiceCategory;
  image?: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  services: Service[];
}

export interface Staff {
  id: string;
  name: string;
  avatar: string;
  specialties: string[];
  rating: number;
  experience: number; // in years
  bio: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
  serviceId?: string;
  staffId?: string;
  images?: string[];
}

export interface Booking {
  id: string;
  salonId: string;
  salonName: string;
  staffId: string;
  staffName: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  duration: number;
  price: number;
  status: 'upcoming' | 'completed' | 'cancelled' | 'in-progress';
  notes?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences: {
    notifications: boolean;
    location: boolean;
  };
}