import axios from 'axios';
import { LocalStorage } from 'node-localstorage';

export const API_URL = 'https://zonest64.amocrm.ru';

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  const localStorage = new LocalStorage('./scratch');

  config.headers.Authorization = `Bearer ${localStorage.getItem('acessToken')}`;

  return config;
});

$api.interceptors.request.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.post(API_URL + '/oauth2/access_token', {
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          grant_type: 'refresh_token',
          refresh_token: localStorage.getItem('refreshToken'),
          redirect_uri: process.env.REDIRECT_URI,
        });
        localStorage.setItem('acessToken', response.data.access_token);
        localStorage.setItem('refreshToken', response.data.refresh_token);
        return $api.request(originalRequest);
      } catch (e) {
        console.log('не авторизован', e);
      }
    }
    throw error;
  }
);

export default $api;
