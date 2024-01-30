import { UserRepositoryProtocol } from '../repositories/user-repository-protocol';
import { encryptingPass } from '../utils/encrypt-pass';
import { Response } from './protocols/response';

export interface SignUpUserRequest {
  email: string
  name: string
  password: string
}

export class SignUpUser {
  constructor(
    private userRepository: UserRepositoryProtocol
  ){}

  async execute({
    email,
    name,
    password
  }: SignUpUserRequest): Promise<Response> {

    const user = await this.userRepository.findUserByEmail(email);
    if(user) return {
      message:  'User already exists, try again with another email',
      statusCode: 409 
    };

    const passwordHash = await encryptingPass(password);

    await this.userRepository.signUp({
      email,
      name,
      password: passwordHash
    });

    return {
      message:  'User registered successfully',
      statusCode: 201 
    }; 
  }
}