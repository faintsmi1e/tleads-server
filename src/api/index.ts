import axios from 'axios';
import {LocalStorage} from 'node-localstorage' ;


export const API_URL = 'https://zonest64.amocrm.ru';


const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  const localStorage = new LocalStorage('./scratch');
  console.log(localStorage.getItem('acessToken'));
  
  
  config.headers.Authorization = `Bearer ${localStorage.getItem('acessToken')}`;
  console.log(config.headers);
  return config;
})


export default $api;