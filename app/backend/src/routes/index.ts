import { Router } from 'express';
import teamsRouter from './team.route';
import loginRouter from './users.route';
import matchRouter from './match.router';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', loginRouter);
router.use('/matches', matchRouter);

export default router;
