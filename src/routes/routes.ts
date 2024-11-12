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
 * /profile/student:
 *   post:
 *     summary: Cadastrar um perfil de aluno
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
 *                 example: "01/01/2000"
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
 *                 example: "(XX) XXXXX-XXXX"
 *     responses:
 *       201:
 *         description: Perfil de aluno cadastrado com sucesso
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro no servidor
 */
router.post(
    '/profile/student',
    authenticateToken,
    profileValidator.validateProfile.bind(profileValidator),
    profileController.createProfile.bind(profileController)
);

/**
 * @swagger
 * /profile/tutor:
 *   post:
 *     summary: Cadastrar um perfil de tutor
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
 *               - profession
 *               - classEntity
 *               - subjectsOfExpertise
 *               - phoneNumber
 *             properties:
 *               type:
 *                 type: string
 *                 description: Tipo de perfil, deve ser "tutor" para tutores.
 *                 example: "tutor"
 *               profession:
 *                 type: string
 *                 description: Profissão do tutor.
 *                 example: "professor"
 *               classEntity:
 *                 type: string
 *                 description: Indica se o tutor possui entidade de classe (sim ou não).
 *                 example: "sim ou não"
 *                 enum: ["sim", "não"]
 *               regionalCouncil:
 *                 type: string
 *                 description: Conselho regional ou entidade de classe, obrigatório se classEntity for "sim".
 *                 example: "conselho regional ou entidade de classe"
 *               documentNumber:
 *                 type: string
 *                 description: Número de documento da entidade de classe, obrigatório se classEntity for "sim".
 *                 example: "12345678"
 *               subjectsOfExpertise:
 *                 type: array
 *                 description: Matérias de especialização.
 *                 items:
 *                   type: string
 *                   enum: ["Matemática", "Língua Portuguesa", "História", "Geografia", "Biologia", "Química", "Física", "Inglês", "Sociologia", "Filosofia", "Artes"]
 *               phoneNumber:
 *                 type: string
 *                 description: Número de celular formatado como (XX) XXXXX-XXXX.
 *                 example: "(XX) XXXXX-XXXX"
 *     responses:
 *       201:
 *         description: Perfil de tutor cadastrado com sucesso
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro no servidor
 */
router.post(
    '/profile/tutor',
    authenticateToken,
    profileValidator.validateProfile.bind(profileValidator),
    profileController.createTutorProfile.bind(profileController)
);

export default router;
