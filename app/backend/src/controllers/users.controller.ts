import { Request, Response } from 'express';
import LoginService from '../services/users.service';
import mapStatusHTTP from '../utils/mapError';
import JWT from '../utils/tokenJwt';

export default class LoginController {
  constructor(
    private loginService = new LoginService(),
  ) { }

  public async login(req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.loginService.login(req.body);

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }
    return res.status(200).json(serviceResponse.data);
  }

  public async getUserRole(req: Request, res: Response): Promise<Response> {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const token = JWT.removeBearerPrefix(authHeader);

    const userRole = await this.loginService.getUserRoleFromToken(token);

    if (!userRole) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    return res.status(200).json({ role: userRole });
  }
}
