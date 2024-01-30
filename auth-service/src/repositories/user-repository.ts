import { User } from '../domain/user/User';
import { SignUpUserRequest } from '../services/sign-up-user';
import { UserRepositoryProtocol } from './user-repository-protocol';
import { UserDTO } from '../domain/user/UserDTO';
export class UserRepository implements UserRepositoryProtocol{

  async signUp({
    email,
    name,
    password,
  }: SignUpUserRequest): Promise<void> {
    const user = new User({
      email,
      name,
      password
    });

    await user.save();
  }

  signIn(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async findUserByEmail(email: string): Promise<UserDTO | null> {
    const user = await User.findOne({ email });

    if(user) {
      return user; 
    } else {
      return null;
    }
  }
}