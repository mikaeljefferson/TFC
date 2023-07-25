import { QueryTypes } from 'sequelize';
import sequelize from '../database/models';
import getHome from '../Interfaces/IQuerry';
import getAway from '../Interfaces/IQuerryAway';

export default class LeaderBoardService {
  public static async getLeaderBoard(): Promise<unknown> {
    const allTeams = await sequelize.query(getHome, { type: QueryTypes.SELECT });
    return allTeams;
  }

  public static async getLeaderBoardaway(): Promise<unknown> {
    const allTeams = await sequelize.query(getAway, { type: QueryTypes.SELECT });
    return allTeams;
  }
}
