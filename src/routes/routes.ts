import { Router } from 'express';

import { UserController } from '../controller/UserController';
import { AuthController } from '../controller/AuthController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

const userController = new UserController();
const authController = new AuthController();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API para gestão de usuários
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Cadastrar um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - confirmPassword
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Reforca teste"
 *               email:
 *                 type: string
 *                 example: "testeReforca@gmail.com"
 *               password:
 *                 type: string
 *                 example: "12345678"
 *               confirmPassword:
 *                 type: string
 *                 example: "12345678"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Email já cadastrado ou inválido
 *       500:
 *         description: Erro ao criar usuário
 */
router.post('/api/users', userController.createUser.bind(userController));

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Fazer login
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "testeReforca@gmail.com"
 *               password:
 *                 type: string
 *                 example: "12345678"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       400:
 *         description: Credenciais inválidas
 */
router.post('/api/auth/login', authController.login.bind(authController));

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Retorna os dados do usuário logado
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do usuário logado
 *       401:
 *         description: Token não fornecido ou inválido
 */
router.get(
    '/api/users/me',
    authMiddleware,
    userController.getLoggedUser.bind(userController)
);

export default router;
