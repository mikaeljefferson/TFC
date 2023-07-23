import { Request, Response } from 'express';
import MatchesService from '../services/match.service';

export default class MatchesController {
  constructor(private service = new MatchesService()) {}

  list = async (req: Request<unknown, unknown, unknown, { inProgress: string }>, res: Response) => {
    const result = await this.service.findAll(req.query.inProgress);
    return res.status(result.status).json(result.data);
  };

  findById = async (req: Request<{ id: string }>, res: Response) => {
    const result = await this.service.findById(Number(req.params.id));
    return res.status(result.status).json(result.data);
  };
}
