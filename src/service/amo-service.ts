import axios, { AxiosResponse } from 'axios';
import $api from '../api';
import { LocalStorage } from 'node-localstorage';
import { ParsedQs } from 'qs';
import StatusService from './status-service';
import ContactService from './contact-service';
import ResponsibleService from './responsible-service';
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
    localStorage.setItem('accessToken', response.data.access_token);
    localStorage.setItem('refreshToken', response.data.refresh_token);
    console.log(localStorage.getItem('accessToken'))
    return response.data;
  }

  static async getLeads(query: ParsedQs) {
    let response: AxiosResponse
    if (query.query && typeof query.query === 'string') {
      const encodedQuery = encodeURI(query.query)
      console.log(String(encodedQuery))
      response = await $api.get(`api/v4/leads?query=${encodedQuery}`);
      console.log(response.data)
    }else {
      response = await $api.get('api/v4/leads');
    }
    
    
    const dataWithStatuses = await StatusService.getStatusesById(response.data)
    
    const [constacts, responsibleUsers] = await Promise.all([ContactService.getContacts(),ResponsibleService.getUsers(dataWithStatuses)]);
    
    dataWithStatuses._embedded.contacts = constacts
    return dataWithStatuses;
  }
}

export default AmoService;
