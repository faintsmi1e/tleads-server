import axios from 'axios';
import $api from '../api';
import { LocalStorage } from 'node-localstorage';
import { ParsedQs } from 'qs';
class AmoService {
  static async authorization(authKey: string) {
    const localStorage = new LocalStorage('./scratch');
    const response = await axios.post(
      'https://zonest64.amocrm.ru/oauth2/access_token',
      {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: 'authorization_code',
        code: authKey,
        redirect_uri: process.env.REDIRECT_URI,
      }
    );
    localStorage.setItem('acessToken', response.data.access_token);
    localStorage.setItem('refreshToken', response.data.refresh_token);
    console.log(localStorage.getItem('acessToken'))
    return response.data;
  }

  static async getLeads(query: ParsedQs) {
    
    const response = await $api.get('api/v4/leads');
    return response.data;
  }
}

export default AmoService;
