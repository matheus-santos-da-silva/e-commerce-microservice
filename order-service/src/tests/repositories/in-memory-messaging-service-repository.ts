import { Message } from 'amqplib';
import { MessagingServiceRepository } from '../../infra/rabbitMQ/protocols/messaging-service-repository';

export class InMemoryMessagingServiceRepository implements MessagingServiceRepository {
  
  async consume(queue: string, callback: (message: Message) => void): Promise<any> {
    console.log('Mock consume');
    return true;
  }
  async start(): Promise<void> {
    console.log('Mock start');
  }
  async publishInQueue(queue: string, message: string): Promise<boolean> {
    console.log('Mock message');
    return true;
  }
}