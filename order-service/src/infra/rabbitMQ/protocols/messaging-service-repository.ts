import { Message } from 'amqplib';

export interface MessagingServiceRepository {
  start(): Promise<void>
  publishInQueue(queue: string, message: string): Promise<boolean>
  consume(queue: string, callback: (message: Message) => void): Promise<any>
}