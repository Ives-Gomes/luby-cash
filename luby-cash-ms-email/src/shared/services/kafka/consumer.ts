import { Kafka } from 'kafkajs';

import ClientsController from '../../../controllers/ClientsController';

export default async function consumer() {
  try {
    const kafka = new Kafka({
      clientId: 'ms-emails',
      brokers: ['localhost:9092'],
    })

    const consumer = kafka.consumer({groupId: 'kafka_1'});
  
    await consumer.connect();
  
    await consumer.subscribe({ topic: 'luby-cash-topic', fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const user = message.value?.toString()
				
				const userJson = JSON.parse(user as string);

				const clientsController = new ClientsController();

				clientsController.create(userJson);
      },
    })
  } catch (err) {
    console.log(err);
    throw new Error('Falha ao consumir kafka')

  }
}