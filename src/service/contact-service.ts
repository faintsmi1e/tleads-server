import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import $api from '../api';
import { LocalStorage } from 'node-localstorage';

class ContactService {
  static async getContacts(data: any) {
    try {
      
      const contactsLength = data._embedded.leads.length;

      const contactsArray = [];
      for (let i = 0; i < contactsLength; i++) {
        contactsArray.push(data._embedded.leads[i]._embedded.contacts);
      }
      

      let requests: Array<Array<AxiosRequestConfig>> = contactsArray.map((contacts) =>
        contacts.map((contact: any) => {
          return $api.get(`api/v4/contacts/${contact.id}`);
        })
      );

      const responses = await Promise.all(
        requests.map((requests) => Promise.all(requests))
      );
      

      for (let i = 0; i < contactsLength; i++) {
        const responseData = responses[i].map(res => res.data);
        if (responseData) {
          data._embedded.leads[i]._embedded.contArr = responseData;
        }
        
      }
      return data;
    } catch (e) {
      console.log(e);
    }
  }
}

export default ContactService;
