import { Router } from 'express';
import LeaderBoardController from '../controllers/LeaderBoard.contoller';

const router = Router();

router.get('/home', (req, res) => LeaderBoardController.getLeaderBoard(req, res));
router.get('/away', (req, res) => LeaderBoardController.getLeaderBoardAway(req, res));
export default router;
