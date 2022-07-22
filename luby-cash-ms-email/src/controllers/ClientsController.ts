import { Request, Response } from 'express';
import knex from '../database/connection';
import { v4 as uuidv4 } from 'uuid'

import { Client } from '@interfaces/ClientInterfaces';
import { User } from '@interfaces/UserInterfaces';

import api from '../shared/services/api';
import sendMail from '../shared/services/mails';

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

  async create(user: User) { 
    if (user.monthly_income >= 500 && user.status_id !== 3) {
      sendMail('Você foi aprovado!');

      const createdClient = await knex('clients').insert({
        secure_id: uuidv4(), 
        user_id: user.secure_id, 
        balance: 200,
      });
  
      return createdClient;
    } else {
      sendMail('Você não foi aceito.');
    }
  }
}

export default ClientsController;