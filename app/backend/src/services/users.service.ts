import * as bcrypt from 'bcryptjs';
import UserModel from '../models/users.model';
import ILogin from '../Interfaces/ILogin';
import  IUser  from '../Interfaces/IUser';
import IUserModel  from '../Interfaces/IuserModel';
import { ServiceMessage, ServiceResponse } from '../Interfaces/IResponse';
import JWT from '../utils/tokenJwt';
import  IToken  from '../Interfaces/IToken';

export default class UserService {
  constructor(
    private loginModel: IUserModel = new UserModel(),
    private jwtService = JWT,
  ) { }

  public async login(data: ILogin): Promise<ServiceResponse<ServiceMessage | IToken>> {
    const user = await this.loginModel.findByEmail(data.email);

    if (user && bcrypt.compareSync(data.password, user.password)) {
      const { email } = user as IUser;
      const token = this.jwtService.sign({ email });
      return { status: 'SUCCESSFUL', data: { token } };
    }

    return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
  }

  public async getUserRoleFromToken(token: string): Promise<string | null> {
    const decodedToken = await this.jwtService.verify(token);

    if (typeof decodedToken === 'string') {
      console.error('Erro ao decodificar o token:', decodedToken);
      return null;
    }

    const { email } = decodedToken;
    const userRole = await this.loginModel.findByRole(email);

    return userRole;
  }
}
