import { Request, Response } from 'express';
import TeamService from '../services/team.service';

export default class TeamController {
  constructor(
    private teamService = new TeamService(),
  ) { }

  public async findAll(_req: Request, res: Response) {
    const serviceResponse = await this.teamService.findAll();
    res.status(200).json(serviceResponse);
  }

  public async findById(req: Request, res: Response) {
    const { id } = req.params;
    const serviceResponse = await this.teamService.findById(+id);
    if (serviceResponse === null) res.status(404).json('Id inexistente');
    res.status(200).json(serviceResponse);
  }
}
