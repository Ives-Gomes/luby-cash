import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
const port = 3334;

app.get('/', async (req, res) => {
  res.send({ message: 'Microservice is coming...' });
});

app.listen(port);
