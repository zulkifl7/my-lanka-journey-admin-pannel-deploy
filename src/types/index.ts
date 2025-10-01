export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'user';
  avatar?: string;
  status: 'active' | 'inactive';
  lastLogin: Date;
  createdAt: Date;
}

export interface Country {
  id: string;
  name: string;
  slug: string;
  flag: string;
  currency: string;
  image: string;
  videoUrl?: string;
  posterUrl?: string;
  description: string;
  timezone: string;
  isActive: boolean;
  createdAt: Date;
}

export interface GalleryCity {
  id: string;
  name: string;
  countryId: string;
  image: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
}

export interface Location {
  id: string;
  name: string;
  cityId: string;
  latitude: number;
  longitude: number;
  address: string;
  description: string;
  images: string[];
  isActive: boolean;
  createdAt: Date;
}

export interface ActivityCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  isActive: boolean;
  createdAt: Date;
}

export interface Activity {
  id: string;
  title: string;
  slug: string;
  categoryId: string;
  locationId: string;
  description: string;
  price: number;
  duration: string;
  maxParticipants: number;
  images: string[];
  isActive: boolean;
  createdAt: Date;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId: string;
  details: string;
  timestamp: Date;
}

export interface DashboardMetrics {
  totalBookings: number;
  totalRevenue: number;
  activeUsers: number;
  popularPackages: number;
  revenueChange: number;
  bookingsChange: number;
  usersChange: number;
  reviewsChange: number;
}