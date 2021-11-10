import axios, { AxiosResponse } from 'axios';
import $api from '../api';
import { LocalStorage } from 'node-localstorage';

class ContactService {
  static async getContacts() {
    try {
      
      const response = await $api.get(`api/v4/contacts`)
      
      
      return response.data._embedded.contacts;
    } catch (e) {
      console.log(e)
    }
  }
}

export default ContactService;