import { Router } from 'express';
import { HomeController } from '../controller/HomeController';
import { UserController } from '../controller/UserController';
import { AuthController } from '../controller/AuthController'; // Importação corrigida para usar a classe AuthController

const router = Router();
const homeController = new HomeController();
const userController = new UserController();
const authController = new AuthController(); // Instância do AuthController

/**
 * @swagger
 * tags:
 *   name: Home
 *   description: Rota inicial
 */
router.get('/', homeController.hello);

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
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Email já cadastrado ou inválido
 *       500:
 *         description: Erro ao criar usuário
 */
router.post('/api/users', (req, res) => userController.createUser(req, res));

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Listar todos os usuários
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *       500:
 *         description: Erro ao buscar usuários
 */
router.get('/api/users', (req, res) => userController.getAllUsers(req, res));

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Buscar um usuário pelo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: O ID do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao buscar usuário
 */
router.get('/api/users/:id', (req, res) =>
    userController.getUserById(req, res)
);

/**
 * @swagger
 * /api/users/email/{email}:
 *   get:
 *     summary: Buscar um usuário pelo email
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: O email do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao buscar usuário
 */
router.get('/api/users/email/:email', (req, res) =>
    userController.getUserByEmail(req, res)
);

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
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       400:
 *         description: Credenciais inválidas
 */
router.post('/api/auth/login', (req, res) => authController.login(req, res));

/**
 * @swagger
 * /api/auth/reset-password-request:
 *   post:
 *     summary: Solicitar redefinição de senha
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Solicitação de redefinição de senha enviada
 *       404:
 *         description: Usuário não encontrado
 */
router.post('/api/auth/reset-password-request', (req, res) =>
    authController.forgotPassword(req, res)
);

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Redefinir a senha usando o token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - newPassword
 *             properties:
 *               token:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Senha redefinida com sucesso
 *       400:
 *         description: Token inválido ou expirado
 */
router.post('/api/auth/reset-password', (req, res) =>
    authController.resetPassword(req, res)
);

export default router;
