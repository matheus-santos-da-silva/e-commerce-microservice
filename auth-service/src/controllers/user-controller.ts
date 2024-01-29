import { Request, Response } from 'express';
import { SignUpUser, SignUpUserRequest } from '../services/sign-up-user';
import { UserRepository } from '../repositories/user-repository';

export class UserController {
  static async SignUp(request: Request, response: Response) {

    const data: SignUpUserRequest  = request.body;
    const userRepository = new UserRepository();

    const signUpUser = new SignUpUser(userRepository);
    const result = await signUpUser.execute({
      email: data.email,
      name: data.name,
      password: data.password
    });

    return response.status(result.statusCode).json({ message: result.message });
  }

  static async SignIn() {
    
  }
}