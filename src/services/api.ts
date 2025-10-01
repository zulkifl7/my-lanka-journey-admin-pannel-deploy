import axios from 'axios';
import { Country, Location, ActivityCategory } from '../types';

export const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true, // Enable sending cookies with requests
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers.Accept = 'application/json';
    return config;
});

// Country API functions
export const getCountries = async () => {
  const response = await api.get('/admin/countries');
  return response.data;
};

export const addCountry = async (country: Omit<Country, 'id' | 'createdAt'>): Promise<Country> => {
  const response = await api.post('/admin/countries', country);
  return response.data;
};

export const updateCountry = async (id: number, country: Partial<Country>): Promise<Country> => {
  const response = await api.put(`/admin/countries/${ id }`, country);
  return response.data;
};

export const deleteCountry = async (id: number): Promise<void> => {
  await api.delete(`/admin/countries/${ id }`);
};

// Location API functions
export const getLocations = async () => {
  const response = await api.get('/admin/locations');
  return response.data;
};

export const addLocation = async (location: Omit<Location, 'id' | 'createdAt'>): Promise<Location> => {
  const response = await api.post('/admin/locations', location);
  return response.data;
};

export const updateLocation = async (id: number, location: Partial<Location>): Promise<Location> => {
  const response = await api.put(`/admin/locations/${ id }`, location);
  return response.data;
};

export const deleteLocation = async (id: number): Promise<void> => {
  await api.delete(`/admin/locations/${ id }`);
};

// Activity Category API functions
export const getActivityCategories = async () => {
  const response = await api.get('/admin/activity-categories');
  return response.data;
};

export const addActivityCategory = async (category: Omit<ActivityCategory, 'id' | 'createdAt'>): Promise<ActivityCategory> => {
  const response = await api.post('/admin/activity-categories', category);
  return response.data;
};

export const updateActivityCategory = async (id: number, category: Partial<ActivityCategory>): Promise<ActivityCategory> => {
  const response = await api.put(`/admin/activity-categories/${ id }`, category);
  return response.data;
};

export const deleteActivityCategory = async (id: number): Promise<void> => {
  await api.delete(`/admin/activity-categories/${ id }`);
};

// Activity API functions
export const getActivities = async () => {
  const response = await api.get('/admin/activities');
  return response.data;
};

export const getActivity = async (id: number) => {
  const response = await api.get(`/admin/activities/${id}`);
  return response.data;
};

export const addActivity = async (activity: FormData | Omit<Activity, 'id' | 'createdAt'>): Promise<Activity> => {
  const config = {
    headers: {
      'Content-Type': activity instanceof FormData ? 'multipart/form-data' : 'application/json',
    },
  };
  const response = await api.post('/admin/activities', activity, config);
  return response.data;
};

export const updateActivity = async (id: number, activity: Partial<Activity>): Promise<Activity> => {
  const response = await api.put(`/admin/activities/${id}`, activity);
  return response.data;
};

// Gallery City API functions
export const getGalleryCities = async () => {
  const response = await api.get('/admin/gallery-cities');
  return response.data;
};

export const getGalleryCity = async (id: number) => {
  const response = await api.get(`/admin/gallery-cities/${id}`);
  return response.data;
};

export const addGalleryCity = async (galleryCity: Omit<GalleryCity, 'id' | 'createdAt'>): Promise<GalleryCity> => {
  const response = await api.post('/admin/gallery-cities', galleryCity);
  return response.data;
};

export const updateGalleryCity = async (id: number, galleryCity: Partial<GalleryCity>): Promise<GalleryCity> => {
  const response = await api.put(`/admin/gallery-cities/${id}`, galleryCity);
  return response.data;
};

export const deleteGalleryCity = async (id: number): Promise<void> => {
  await api.delete(`/admin/gallery-cities/${id}`);
};

export const deleteActivity = async (id: number): Promise<void> => {
  await api.delete(`/admin/activities/${id}`);
};