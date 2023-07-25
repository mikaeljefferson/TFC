import { NextFunction, Request, Response } from 'express';
import JWT from '../utils/tokenJwt';
import TeamsTable from '../database/models/team.model';

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

  static async validateNewMatch(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { homeTeamId, awayTeamId } = req.body;
    if (homeTeamId === awayTeamId) {
      return res.status(422).json({
        message: 'It is not possible to create a match with two equal teams',
      });
    }

    const checkHomeTeam = await TeamsTable.findByPk(homeTeamId);
    const checkAwayTeam = await TeamsTable.findByPk(awayTeamId);

    if (checkHomeTeam === null || checkAwayTeam === null) {
      return res.status(404).json({
        message: 'There is no team with such id!',
      });
    }
    next();
  }
}

export default JWTValidation;
