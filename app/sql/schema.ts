-- Create tables for Mexico Rental Marketplace

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Locations table
CREATE TABLE locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  state TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Properties table
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  location_id UUID REFERENCES locations(id) ON DELETE CASCADE NOT NULL,
  host_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price_per_night DECIMAL(10, 2) NOT NULL,
  guests INTEGER NOT NULL,
  bedrooms INTEGER NOT NULL,
  beds INTEGER NOT NULL,
  bathrooms INTEGER NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Amenities table
CREATE TABLE amenities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Junction table for property amenities
CREATE TABLE property_amenities (
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE NOT NULL,
  amenity_id UUID REFERENCES amenities(id) ON DELETE CASCADE NOT NULL,
  PRIMARY KEY (property_id, amenity_id)
);

-- Bookings table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  check_in_date DATE NOT NULL,
  check_out_date DATE NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  guests INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (booking_id) -- One review per booking
);

-- Favorites table
CREATE TABLE favorites (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (user_id, property_id)
);

-- Insert sample amenities
INSERT INTO amenities (name, icon) VALUES
('WiFi', 'wifi'),
('Air Conditioning', 'fan'),
('Kitchen', 'utensils'),
('Pool', 'droplet'),
('Hot Tub', 'thermometer'),
('Free Parking', 'car'),
('TV', 'tv'),
('Washer', 'refresh-cw'),
('Dryer', 'wind'),
('Workspace', 'briefcase'),
('Pets Allowed', 'paw-print');

-- Insert sample locations in Mexico
INSERT INTO locations (name, state, image_url) VALUES
('Cancún', 'Quintana Roo', 'https://images.unsplash.com/photo-1552074284-5e88ef1aef18?q=80&w=1000'),
('Tulum', 'Quintana Roo', 'https://images.unsplash.com/photo-1559825481-12a05cc00344?q=80&w=1000'),
('Mexico City', 'CDMX', 'https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?q=80&w=1000'),
('Puerto Vallarta', 'Jalisco', 'https://images.unsplash.com/photo-1619059073563-2f35aef1a9a1?q=80&w=1000'),
('Oaxaca', 'Oaxaca', 'https://images.unsplash.com/photo-1585975985662-449adf7eab71?q=80&w=1000'),
('San Miguel de Allende', 'Guanajuato', 'https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?q=80&w=1000');