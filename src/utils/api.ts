import axios from 'axios';
import { User } from '../store/types';

const apiClient = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:5000',
  withCredentials: true
});

// login api
export const loginAsync = async (user: User) => {
  return await apiClient.post('/api/user/login', user);

};

//  login api for test
export const testloginApi = async () => {
  return ;
};

// 회원가입 api
export const postUserAsync = async (user: User) => {
  return await apiClient.post('/api/user/register', {
    ...user,
  });
};

const api = {
  loginAsync,
  postUserAsync,
  testloginApi
};

export default api;