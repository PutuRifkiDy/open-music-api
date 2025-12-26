require('dotenv').config();
const amqp = require('amqplib');
const ConsumerService = require('./ConsumerService');
const Listener = require('./Listener');
const MailSender = require('./MailSender');

const init = async () => {
  const consumerService = new ConsumerService();
  const mailSender = new MailSender();
  const listener = new Listener(consumerService, mailSender);

  const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
  const channel = await connection.createChannel();

  await channel.assertQueue('export:playlists', {
    durable: true,
  });

  channel.consume('export:playlists', listener.listen, { noAck: true });
  console.log('Consumer berjalan...');
};

init();
