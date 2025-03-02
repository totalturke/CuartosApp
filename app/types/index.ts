// @/types/index.ts

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  created_at: string;
  updated_at: string;
}

export interface Location {
  id: string;
  name: string;
  state: string;
  image_url?: string;
  created_at: string;
}

export interface Property {
  id: string;
  host_id: string;
  location_id: string;
  title: string;
  description: string;
  price_per_night: number;
  bedrooms: number;
  bathrooms: number;
  max_guests: number;
  address: string;
  latitude?: number;
  longitude?: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  // Joined fields
  location?: Location;
  images?: PropertyImage[];
  amenities?: Amenity[];
  owner?: User;
  average_rating?: number;
}

export interface PropertyImage {
  id: string;
  property_id: string;
  image_url: string;
  is_primary: boolean;
}

export interface Amenity {
  id: string;
  name: string;
  icon: string;
}

export interface Booking {
  id: string;
  property_id: string;
  user_id: string;
  check_in_date: string;
  check_out_date: string;
  total_price: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  guests: number;
  created_at: string;
  updated_at: string;
  // Joined fields
  property?: Property;
}

export interface Review {
  id: string;
  property_id: string;
  user_id: string;
  booking_id: string;
  rating: number;
  comment?: string;
  created_at: string;
  updated_at: string;
  // Joined fields
  user?: User;
}

export interface Favorite {
  user_id: string;
  property_id: string;
  created_at: string;
  // Joined fields
  property?: Property;
}