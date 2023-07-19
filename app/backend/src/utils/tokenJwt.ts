import { JwtPayload, Secret, sign, SignOptions, verify } from 'jsonwebtoken';

export default class JWT {
  private static secret: Secret = process.env.JWT_SECRET || 'jwt_secret';

  private static jwtConfig: SignOptions = {
    expiresIn: '10d',
    algorithm: 'HS256',
  };

  static sign(payload: JwtPayload): string {
    return sign({ ...payload }, this.secret, this.jwtConfig);
  }

  static verify(token: string): JwtPayload | string {
    try {
      return verify(token, this.secret) as JwtPayload;
    } catch (error) {
      return 'Token must be a valid token';
    }
  }

  static removeBearerPrefix(token: string): string {
    if (token.startsWith('Bearer ')) {
      return token.substring(7);
    }
    return token;
  }
}
