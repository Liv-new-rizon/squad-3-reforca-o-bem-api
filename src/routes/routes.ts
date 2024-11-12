import { Router } from 'express';
import { UserController } from '../controller/UserController';
import { AuthController } from '../controller/AuthController';
import { authenticateToken } from '../middlewares/authMiddleware';
import { ProfileController } from '../controller/ProfileController';
import { ProfileValidator } from '../validator/ProfileValidator';

const router = Router();

const userController = new UserController();
const authController = new AuthController();
const profileController = new ProfileController();
const profileValidator = new ProfileValidator();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API para gestão de usuários
 */

/**
 * @swagger
 * /users:
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
router.post('/users', userController.createUser.bind(userController));

/**
 * @swagger
 * /auth/login:
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
router.post('/auth/login', authController.login.bind(authController));

/**
 * @swagger
 * /users/me:
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
    '/users/me',
    authenticateToken,
    userController.getLoggedUser.bind(userController)
);

/**
 * @swagger
 * /profile:
 *   post:
 *     summary: Cadastrar um perfil de usuário
 *     tags: [Profiles]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - birthDate
 *               - educationLevel
 *               - schoolType
 *               - subjectsOfInterest
 *               - phoneNumber
 *             properties:
 *               type:
 *                 type: string
 *                 description: Tipo de perfil, deve ser "student" para estudantes.
 *                 example: "student"
 *               birthDate:
 *                 type: string
 *                 format: date
 *                 description: Data de nascimento no formato DD/MM/AAAA.
 *               educationLevel:
 *                 type: string
 *                 description: Escolaridade.
 *                 enum: ["Ensino Médio (1º ano)", "Ensino Médio (2º ano)", "Ensino Médio (3º ano)"]
 *               schoolType:
 *                 type: string
 *                 description: Tipo de escola.
 *                 enum: ["Escola Pública", "Escola Privada"]
 *               subjectsOfInterest:
 *                 type: array
 *                 description: Matérias de interesse.
 *                 items:
 *                   type: string
 *                   enum: ["Língua Portuguesa", "Inglês", "Artes", "Educação Física", "Matemática", "Física", "Química", "Biologia", "História", "Geografia", "Filosofia", "Sociologia"]
 *               phoneNumber:
 *                 type: string
 *                 description: Número de celular formatado como (XX) XXXXX-XXXX.
 *     responses:
 *       201:
 *         description: Perfil cadastrado com sucesso
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro no servidor
 */
router.post(
    '/profile',
    authenticateToken,
    profileValidator.validateProfile.bind(profileValidator),
    profileController.createProfile.bind(profileController)
);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Fazer logout
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Logout realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Logout realizado com sucesso"
 *       401:
 *         description: Token não fornecido ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token inválido ou expirado"
 */
router.post(
    '/auth/logout',
    authenticateToken,
    authController.logout.bind(authController)
);

export default router;
