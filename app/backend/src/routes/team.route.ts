import { Router } from 'express';
import TeamsController from '../controllers/team.contoller';

const teamsRouter = Router();

const TeamController = new TeamsController();

teamsRouter.get('/', (req, res) => TeamController.findAll(req, res));
teamsRouter.get('/:id', (req, res) => TeamController.findById(req, res));

export default teamsRouter;
