import { Router } from 'express';
import LoginController from '../controllers/users.controller';
import Validations from '../middleware/auth';
import JWTValidations from '../middleware/tokenValidate';

const loginController = new LoginController();

const router = Router();

router.post('/', Validations.validateLogin, (req, res) => loginController.login(req, res));

router.get(
  '/role',
  JWTValidations.validateToken,
  (req, res) => loginController.getUserRole(req, res),
);
export default router;
