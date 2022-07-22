import { Request, Response } from 'express';
import knex from '../database/connection';

import { Client } from '@interfaces/ClientInterfaces';

import api from '../shared/services/api';

class ClientsController {
  async index(req: Request, res: Response) {
    try {
      const clients = await knex('clients').select('*');
      
      const serializedClients: any = {};

      await Promise.all(
        clients.map(async (client: Client, index) => {
          const user = await api.get(`users/${client.user_id}`);
  
          serializedClients[index] = {
            id: client.id,
            user: user.data,
            balance: client.balance
          };
        })
      )

      return res.status(200).send(serializedClients);
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

export default ClientsController;