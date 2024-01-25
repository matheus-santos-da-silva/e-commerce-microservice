export interface UserRepositoryProtocol {
  signUp(): Promise<void>
  signIn(): Promise<void>
}