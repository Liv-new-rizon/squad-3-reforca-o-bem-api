import { Router } from 'express';
import { UserController } from '../controller/UserController';
import { AuthController } from '../controller/AuthController';
import { ProfileController } from '../controller/ProfileController';
import { ProfileValidator } from '../validator/ProfileValidator';
import { authenticateToken } from '../middleware/AuthMiddleware';

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
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       400:
 *         description: Credenciais inválidas
 */
router.post('/auth/login', authController.login.bind(authController));

/**
 * @swagger
 * /profile:
 *   post:
 *     summary: Cadastrar um perfil de usuário
 *     tags: [Profiles]
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
  authenticateToken, // Middleware de autenticação
  profileValidator.validateProfile.bind(profileValidator),
  profileController.createProfile.bind(profileController),
);

export default router;
