import { Channel, Connection, connect } from 'amqplib';
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
    return this.channel.sendToQueue(queue, Buffer.from(message));
  }

}