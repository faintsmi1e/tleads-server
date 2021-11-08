import express from 'express';
import AmoServise from '../service/amo-servise';
import {LocalStorage} from 'node-localstorage' 

class LeadController {
  async getAll(req: express.Request, res: express.Response) {
    try {
      const leads = await AmoServise.getLeads();
      res.json(leads);
    } catch (e) {
      console.log(e);
    }
  }
  async authorization(req: express.Request, res: express.Response) {
    try {
      const authorizationKey = req.params.authKey;
      const tokens = await AmoServise.authorization(authorizationKey);
      res.send(tokens);
    } catch (e) {
      console.log(e);
      res.status(400).send('bad request');
    }
  }
}

export default new LeadController();
