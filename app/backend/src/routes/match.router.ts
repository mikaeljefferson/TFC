import { Router } from 'express';
import MatchController from '../controllers/match.controller';

const matchRouter = Router();
const matchController = new MatchController();

matchRouter.get('/', matchController.list);
matchRouter.get('/:id', matchController.findById);

export default matchRouter;
