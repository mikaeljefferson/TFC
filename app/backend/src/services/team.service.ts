import TeamsTable from '../database/models/team.model';
import ITeam from '../Interfaces/ITeam';

export default class TeamService {
  private teamModel = TeamsTable;
  public async findAll(): Promise<Array<ITeam>> {
    const allTeams = await this.teamModel.findAll();
    return allTeams;
  }

  public async findById(id:number): Promise<ITeam | null> {
    const allTeams = await this.teamModel.findByPk(id);
    return allTeams;
  }
}
