import { User } from '../domain/user/User';
import { SignUpUserRequest } from '../services/sign-up-user';
import { UserRepositoryProtocol } from './user-repository-protocol';
import { UserDTO } from '../domain/user/UserDTO';
import { SignInUserRequest } from '../services/sign-in-user';
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

  async findUserByEmail(email: string): Promise<UserDTO | null> {
    const user = await User.findOne({ email });

    if(user) {
      return user; 
    } else {
      return null;
    }
  }
}