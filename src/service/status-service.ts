import axios, { AxiosResponse } from 'axios';
import $api from '../api';
import { LocalStorage } from 'node-localstorage';

class StatusService {
  static async getStatusesById(data: any) {
    try {
      const leadsLength = data._embedded.leads.length;
      const StatusesIds = [];
      for (let i = 0; i < leadsLength; i++) {
        StatusesIds.push(data._embedded.leads[i].status_id);
      }
      let requests = StatusesIds.map((status) =>
        $api.get(`api/v4/leads/pipelines/4831720/statuses/${status}`)
      );
      const responses = await Promise.all(requests);
      const statuses = responses.map((response) => response.data);
     
      for (let i = 0; i < leadsLength; i++) {
        data._embedded.leads[i].status = statuses[i];
      }
      return data;
    } catch (e) {
      console.log(e)
    }
  }
}

export default StatusService;
