import { Router } from 'express';
import MatchController from '../controllers/match.controller';
import Validations from '../middleware/tokenValidate';

const matchRouter = Router();

const matchController = new MatchController();

matchRouter.get(
  '/',
  (req, res) => matchController.getAllMatches(req, res),
);

matchRouter.patch(
  '/:id/finish',
  Validations.validateToken,
  (req, res) => matchController.setMatchStatus(req, res),
);

matchRouter.patch(
  '/:id',
  Validations.validateToken,
  (req, res) => matchController.setMatchGoals(req, res),
);

export default matchRouter;
