import { UserRepositoryProtocol } from './user-repository-protocol';

export class UserRepository implements UserRepositoryProtocol{
  signUp(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  signIn(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}