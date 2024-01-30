import { describe, expect, it } from 'vitest';
import { SignUpUser } from '../services/sign-up-user';
import { InMemoryUserRepository } from '../repositories/in-memory-user-repository';

describe('SignUp User', () => {

  it('should be able to create a new user', async () => {
    
    const repository = new InMemoryUserRepository();
    const sut = new SignUpUser(repository);

    const result = await sut.execute({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: '123456'
    });

    expect(result.statusCode).toBe(201);
    expect(result.message).toBe('User registered successfully');
  });

  it('should not to be able to create a new user if email is already in use', async () => {
    
    const repository = new InMemoryUserRepository();
    const sut = new SignUpUser(repository);

    await sut.execute({
      email: 'johndoe@example.com',
      name: 'test',
      password: '12345'
    });

    const result = await sut.execute({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: '123456'
    });

    expect(result.statusCode).toBe(409);
    expect(result.message).toBe('User already exists, try again with another email');
  });

});