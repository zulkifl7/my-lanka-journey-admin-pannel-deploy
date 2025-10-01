import { api } from './api';

export const getTripPlan = async (id: number) => {
  const response = await api.get(`admin/trip-plans/${ id }`);
  return response.data;
};