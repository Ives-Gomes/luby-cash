import { Request, Response } from 'express';
import knex from '../database/connection';

import { Client } from '@interfaces/ClientInterfaces';

class ClientsController {
  async index(req: Request, res: Response) {
    const clients = await knex('clients').select('*');

    const serializedClients = clients.map((client: Client) => {
      return {
        id: client.id,
        user_id: client.user_id,
        balance: client.balance
      };
    });

    return res.json(serializedClients);
  }
}

export default ClientsController;