import { NextFunction, Request, Response } from 'express';
import JWT from '../utils/tokenJwt';

class JWTValidation {
  static async validateToken(req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const tokenWithoutBearer = token.replace('Bearer ', '');
    const validToken = JWT.verify(tokenWithoutBearer);

    if (validToken === 'Token must be a valid token') {
      return res.status(401).json({ message: validToken });
    }
    next();
  }
}

export default JWTValidation;
