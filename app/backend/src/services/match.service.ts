import Result from '../Interfaces/IResult';
import IModel from '../Interfaces/IMatchService';
import IMatch from '../Interfaces/IMatch';
import MatchModel from '../models/match.model';

export default class MatchesService {
  constructor(private model: IModel<IMatch> = new MatchModel()) {}
  async findAll(inProgress: string): Promise<Result<IMatch[]>> {
    const inProgressArg = inProgress ? (/true/i).test(inProgress) : undefined;
    const data = await this.model.findAllByField?.('inProgress', inProgressArg);
    return { status: 200, data: data || [] };
  }

  async findById(id: IMatch['id']): Promise<Result<IMatch>> {
    const data = await this.model.findById(id);
    if (data) return { status: 200, data };
    return { status: 404, data: { message: 'Match Not Found.' } };
  }
}
