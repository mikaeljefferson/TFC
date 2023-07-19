import User from '../database/models/user.model';
import  IUser  from '../Interfaces/IUser';
import  IUserModel  from '../Interfaces/IuserModel';

export default class UserModel implements IUserModel {
  private model = User;

  async findByEmail(email: IUser['email']): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) return null;
    const { id, password, username, role } = user;
    return { id, email, password, username, role };
  }
  async findByRole(email: IUser['email']): Promise<string | null> {
    const user = await this.model.findOne({
      where: { email },
      attributes: ['role'],
    });

    if (!user) {
      return null;
    }

    return user.role;
  }
}
