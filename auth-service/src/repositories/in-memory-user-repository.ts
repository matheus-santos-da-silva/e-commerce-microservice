
import { UserDTO } from '../domain/user/UserDTO';
import { SignUpUserRequest } from '../services/sign-up-user';
import { UserRepositoryProtocol } from './user-repository-protocol';
import { randomUUID } from 'node:crypto';

export class InMemoryUserRepository implements UserRepositoryProtocol {

  items: UserDTO[] = [];

  async signUp(props: SignUpUserRequest): Promise<void> {
    const user = { id: randomUUID(), ...props };
    this.items.push(user);
  }
  
  signIn(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  
  async findUserByEmail(email: string): Promise<UserDTO | null> {
    const user = this.items.find((item) => item.email === email);
    if(!user) return null;
    return user;
  }

}