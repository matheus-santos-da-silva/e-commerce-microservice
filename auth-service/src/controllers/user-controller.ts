import { Request, Response } from 'express';
import { SignUpUser, SignUpUserRequest } from '../services/sign-up-user';
import { UserRepository } from '../repositories/user-repository';
import { SignInUser, SignInUserRequest } from '../services/sign-in-user';

export class UserController {
  static async SignUp(request: Request, response: Response) {

    const { email, name, password }: SignUpUserRequest  = request.body;
    const userRepository = new UserRepository();

    const signUpUser = new SignUpUser(userRepository);
    const result = await signUpUser.execute({
      email: email,
      name: name,
      password: password
    });

    return response.status(result.statusCode).json({ message: result.message });
  }

  static async SignIn(request: Request, response: Response) {
    
    const { email, password }: SignInUserRequest = request.body;
    const userRepository = new UserRepository();

    const signInUser = new SignInUser(userRepository);
    const result = await signInUser.execute({
      email,
      password
    });

    return response.status(result.statusCode).json({
      message: result.message, 
      token: result.token
    });
  }
}