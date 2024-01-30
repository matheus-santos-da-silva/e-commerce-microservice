import { SignUpUserRequest } from '../services/sign-up-user';
import { UserDTO } from '../domain/user/UserDTO';
export interface UserRepositoryProtocol {
  signUp(props: SignUpUserRequest): Promise<void>
  signIn(): Promise<void>
  findUserByEmail(email: string):Promise<UserDTO | null>
}