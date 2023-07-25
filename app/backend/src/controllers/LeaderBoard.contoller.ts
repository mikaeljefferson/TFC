import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoard.service';

export default class LeaderBoardController {
  public static async getLeaderBoard(
    req: Request,
    res: Response,
  ): Promise<Response | void> {
    const leaderBoard = await LeaderBoardService.getLeaderBoard();
    return res.status(200).json(leaderBoard);
  }

  public static async getLeaderBoardAway(
    req: Request,
    res: Response,
  ): Promise<Response | void> {
    const leaderBoard = await LeaderBoardService.getLeaderBoardaway();
    return res.status(200).json(leaderBoard);
  }
}
