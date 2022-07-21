import express from 'express';
import { Request, Response } from 'express';

const routes = express.Router();

routes.get('/users', async (req: Request, res: Response) => {
  res.send({ message: 'Microservice is coming...' });
});

export default routes;
