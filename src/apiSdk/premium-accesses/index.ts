import axios from 'axios';
import queryString from 'query-string';
import { PremiumAccessInterface, PremiumAccessGetQueryInterface } from 'interfaces/premium-access';
import { GetQueryInterface } from '../../interfaces';

export const getPremiumAccesses = async (query?: PremiumAccessGetQueryInterface) => {
  const response = await axios.get(`/api/premium-accesses${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createPremiumAccess = async (premiumAccess: PremiumAccessInterface) => {
  const response = await axios.post('/api/premium-accesses', premiumAccess);
  return response.data;
};

export const updatePremiumAccessById = async (id: string, premiumAccess: PremiumAccessInterface) => {
  const response = await axios.put(`/api/premium-accesses/${id}`, premiumAccess);
  return response.data;
};

export const getPremiumAccessById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/premium-accesses/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePremiumAccessById = async (id: string) => {
  const response = await axios.delete(`/api/premium-accesses/${id}`);
  return response.data;
};
