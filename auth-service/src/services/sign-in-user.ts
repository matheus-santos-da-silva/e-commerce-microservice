import { UserRepositoryProtocol } from '../repositories/user-repository-protocol';
import { Response } from './protocols/response';
import { createUserToken } from '../utils/create-user-token';
import { comparePassword } from '../utils/compare-password';

export interface SignInUserRequest {
  email: string
  password: string
}

export class SignInUser {
  
  constructor(
    private userRepository: UserRepositoryProtocol
  ) {}

  async execute({
    email,
    password
  }: SignInUserRequest): Promise<Response> {

    const user = await this.userRepository.findUserByEmail(email);
    if(!user) return { 
      message: 'User not found',
      statusCode: 404
    };

    const checkPassword = await comparePassword({
      password1: password,
      password2: user.password
    });
    
    if(!checkPassword) return {
      message: 'Wrong password',
      statusCode: 401
    };

    const token = await createUserToken({
      externalId: user.id,
      email,
      name: user.name
    });

    return {
      message: 'User logged successfully',
      statusCode: 200,
      token
    };

  }

}