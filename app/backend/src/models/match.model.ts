import IModel from '../Interfaces/IMatchService';
import IMatch from '../Interfaces/IMatch';
import Match from '../database/models/match.model';

export default class MatchModel implements IModel<IMatch> {
  constructor(private sequelizeModel = Match) {}

  async findAll(): Promise<IMatch[]> {
    return (await this.sequelizeModel.findAll()).map(
      ({ dataValues }) => dataValues,
    );
  }

  async findById(id: IMatch['id']): Promise<IMatch | null> {
    return (await this.sequelizeModel.findByPk(id))?.dataValues || null;
  }

  async findAllByField(
    field: keyof IMatch,
    value: number | boolean | undefined,
  ): Promise<IMatch[] | null> {
    return (
      await this.sequelizeModel.findAll({
        where: value !== undefined ? { [field]: value } : undefined,
        include: [
          { association: 'homeTeam', attributes: ['teamName'] },
          { association: 'awayTeam', attributes: ['teamName'] },
        ],
      })
    ).map(({ dataValues }) => dataValues);
  }
}
