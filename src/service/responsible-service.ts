import axios, { AxiosResponse } from 'axios';
import $api from '../api';
import { LocalStorage } from 'node-localstorage';

class ResponsibleService {
  static async getUsers(data: any) {
    try {
      const responsibleLength = data._embedded.leads.length;
      const responsibleIds = [];
      for (let i = 0; i < responsibleLength; i++) {
        responsibleIds.push(data._embedded.leads[i].responsible_user_id);
      }
      let requests = responsibleIds.map((id) =>
        $api.get(`api/v4/users/${id}`)
      );
      const responses = await Promise.all(requests);
      const responsibleUsers = responses.map((response) => response.data);
      for (let i = 0; i < responsibleLength; i++) {
        data._embedded.leads[i].resUser = responsibleUsers[i];
      }
      return data;
      
    } catch (e) {
      console.log(e)
    }
  }
}

export default ResponsibleService;