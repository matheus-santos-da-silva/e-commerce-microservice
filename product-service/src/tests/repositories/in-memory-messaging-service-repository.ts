import { MessagingServiceRepository } from '../../infra/rabbitMQ/protocols/messaging-service-repository';

export class InMemoryMessagingServiceRepository implements MessagingServiceRepository {
  async start(): Promise<void> {
    console.log('Mock start');
  }
  async publishInQueue(queue: string, message: string): Promise<boolean> {
    console.log('Mock message');
    return true;
  }
}