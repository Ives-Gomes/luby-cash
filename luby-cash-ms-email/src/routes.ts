import express from 'express';

import ClientsController from './controllers/ClientsController';

const routes = express.Router();

const clientsController = new ClientsController();

routes.get('/clients', clientsController.index);
routes.post('/clients/pix', clientsController.pix);

export default routes;
