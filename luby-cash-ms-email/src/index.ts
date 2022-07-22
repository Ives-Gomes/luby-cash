import express from 'express';
import cors from 'cors';
import routes from './routes';

import consumer from './shared/services/kafka/consumer';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

consumer();

const port = 3334;

app.listen(port);
