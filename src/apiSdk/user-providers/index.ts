import axios from 'axios';
import queryString from 'query-string';
import { UserProviderInterface, UserProviderGetQueryInterface } from 'interfaces/user-provider';
import { GetQueryInterface } from '../../interfaces';

export const getUserProviders = async (query?: UserProviderGetQueryInterface) => {
  const response = await axios.get(`/api/user-providers${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createUserProvider = async (userProvider: UserProviderInterface) => {
  const response = await axios.post('/api/user-providers', userProvider);
  return response.data;
};

export const updateUserProviderById = async (id: string, userProvider: UserProviderInterface) => {
  const response = await axios.put(`/api/user-providers/${id}`, userProvider);
  return response.data;
};

export const getUserProviderById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/user-providers/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteUserProviderById = async (id: string) => {
  const response = await axios.delete(`/api/user-providers/${id}`);
  return response.data;
};
