import { Channel, Connection, Message, connect } from 'amqplib';
import { MessagingServiceRepository } from './protocols/messaging-service-repository';

export class RabbitMQMessagingService implements MessagingServiceRepository{

  private conn!: Connection;
  private channel!: Channel;

  constructor(private uri: string) {
  }

  async start(): Promise<void> {
    this.conn = await connect(this.uri);
    this.channel = await this.conn.createChannel();
  }
  async publishInQueue(queue: string, message: string): Promise<boolean> {
    await this.channel.assertQueue(queue, { durable: true });
    return this.channel.sendToQueue(queue, Buffer.from(message));
  }
  async consume(queue: string, callback: (message: Message) => void) {
    await this.channel.assertQueue(queue, { durable: true });
    return this.channel.consume(queue, (message) => {
      if(message !== null) {
        callback(message);
        this.channel.ack;
      }
    });
  }

}