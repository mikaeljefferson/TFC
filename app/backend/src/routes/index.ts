import { Router } from 'express';
import teamsRouter from './team.route';
import loginRouter from './users.route';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', loginRouter);
export default router;
