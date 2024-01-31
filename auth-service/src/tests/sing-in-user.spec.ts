import { describe, expect, it } from 'vitest';
import { InMemoryUserRepository } from '../repositories/in-memory-user-repository';
import { SignUpUser } from '../services/sign-up-user';
import { SignInUser } from '../services/sign-in-user';
 
describe('SignIn User', () => {
  
  it('should be able to signIn user', async () => {
    
    const userRepository = new InMemoryUserRepository();
    const signUpUser = new SignUpUser(userRepository);

    await signUpUser.execute({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: '12345'
    });

    const sut = new SignInUser(userRepository);
    const result = await sut.execute({
      email: 'johndoe@example.com',
      password: '12345'
    });

    expect(result.message).toBe('User logged successfully');
    expect(result.statusCode).toBe(200);
  });

  it('should not to be able to signIn if user not exists', async () => {
    
    const userRepository = new InMemoryUserRepository();

    const sut = new SignInUser(userRepository);
    const result = await sut.execute({
      email: 'johndoe@example.com',
      password: '12345'
    });

    expect(result.message).toBe('User not found');
    expect(result.statusCode).toBe(404);
  });

  it('should not to be able to signIn if the password is wrong', async () => {
    
    const userRepository = new InMemoryUserRepository();

    const signUpUser = new SignUpUser(userRepository);

    await signUpUser.execute({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: '12345'
    });
    
    const sut = new SignInUser(userRepository);
    const result = await sut.execute({
      email: 'johndoe@example.com',
      password: '1234'
    });

    expect(result.message).toBe('Wrong password');
    expect(result.statusCode).toBe(401);
  });

});