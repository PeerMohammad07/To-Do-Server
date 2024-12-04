import IUser from "./IUser";

export default interface IUserRepository {
  createUser(name: string, email: string, password: string): Promise<IUser | null>
  checkUserExists(email : string):Promise<IUser|null>
  checkUser(userId: string): Promise<IUser | null>
  getAllUsers(): Promise<IUser[]>
} 