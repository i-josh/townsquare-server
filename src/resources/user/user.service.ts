import User from "./user.interface.js";
import UserModel from "./user.model.js";

export default class UserService {
  public async register(body: object): Promise<User> {
    const user: User = await UserModel.create(body);
    return user;
  }

  public async getUser(email: string): Promise<User> {
    const user: User = await UserModel.findOne({ email });
    return user;
  }
}
