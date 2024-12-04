import { Model } from "mongoose";
import IUser from "../../infrastructure/interfaces/IUser";
import IUserRepository from "../../infrastructure/interfaces/IUserRepository";


class UserRepository implements IUserRepository {
  private user: Model<IUser>;

  constructor(user: Model<IUser>) {
    this.user = user;
  }

  async checkUserExists(email: string): Promise<IUser | null> {
    return this.user.findOne({ email });
  }

  async createUser(name: string, email: string, password: string): Promise<IUser | null> {
    const newUser = new this.user({ name, email, password });
    return newUser.save();
  }

  async checkUser(userId: string): Promise<IUser | null> {
    return this.user.findById(userId);
  }

  async getAllUsers(): Promise<IUser[]> {
    return this.user.find();
  }
}

export default UserRepository;