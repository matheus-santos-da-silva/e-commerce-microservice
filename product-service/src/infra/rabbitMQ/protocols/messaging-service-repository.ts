export interface MessagingServiceRepository {
  start(): Promise<void>
  publishInQueue(queue: string, message: string): Promise<boolean>
}