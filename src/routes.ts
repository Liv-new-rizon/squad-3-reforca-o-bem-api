import { Router } from 'express';
import { HomeController } from './controller/HomeController';
import { register, login } from './controller/authController';
import {
  forgotPassword,
  resetUserPassword
} from '../src/controller/authController';

const router = Router();

router.get('/', new HomeController().hello);

// Rota para registro
router.post('/register', register);

// Rota para login
router.post('/login', login);

// Rota para solicitar a redefinição de senha
router.post('/forgot-password', forgotPassword);

// Rota para redefinir a senha
router.post('/reset-password', resetUserPassword);

export default router;
