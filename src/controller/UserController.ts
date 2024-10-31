import { Request, Response } from 'express';
import { UserRepository } from '../repositories/UserRepository';
import { hashPassword } from '../library/bcrypt';
import { CustomError } from '../interfaces/CustomError';
import { JwtPayloadCustom } from 'interfaces/JwtPayloadCustom';

/**
 * Controlador para operações relacionadas aos usuários.
 * Este controlador fornece métodos para criar um novo usuário e para buscar os dados do usuário logado.
 */
export class UserController {
    private userRepository: UserRepository;

    /**
     * Cria uma instância de `UserController` e inicializa o repositório de usuários.
     */
    constructor() {
        this.userRepository = new UserRepository();
    }

    /**
     * Cria um novo usuário.
     *
     * Valida o tamanho da senha, verifica se as senhas coincidem e se o email já está cadastrado.
     * Cria um hash da senha e salva o novo usuário no banco de dados.
     *
     * @param req - Objeto de requisição do Express contendo os dados do usuário (nome, email, senha, confirmPassword).
     * @param res - Objeto de resposta HTTP do Express.
     * @returns Uma resposta HTTP com status 201 e os dados do usuário criado, ou um erro.
     */
    async createUser(req: Request, res: Response): Promise<Response> {
        const { name, email, password, confirmPassword } = req.body;

        try {
            if (password.length < 8) {
                throw new CustomError(
                    'A senha deve conter pelo menos 8 caracteres',
                    400
                );
            }

            if (password !== confirmPassword) {
                throw new CustomError('As senhas não coincidem', 400);
            }

            const existingUser = await this.userRepository.findByEmail(email);
            if (existingUser) {
                throw new CustomError('Email já cadastrado', 400);
            }

            const hashedPassword = await hashPassword(password);
            const newUser = this.userRepository.create({
                name,
                email,
                password: hashedPassword
            });

            await this.userRepository.save(newUser);

            return res.status(201).json({
                message: 'Usuário criado com sucesso',
                user: { id: newUser.id, email: newUser.email }
            });
        } catch (error) {
            if (error instanceof CustomError) {
                return res
                    .status(error.status)
                    .json({ message: error.message });
            }
            return res
                .status(500)
                .json({ message: 'Erro desconhecido ao criar usuário' });
        }
    }

    /**
     * Retorna os dados do usuário logado.
     *
     * Este método busca o usuário logado com base no `userId` presente no payload do token JWT.
     *
     * @param req - Objeto de requisição do Express contendo o token JWT decodificado em `req.user`.
     * @param res - Objeto de resposta HTTP do Express.
     * @returns Uma resposta HTTP com os dados do usuário logado ou uma mensagem de erro.
     */
    async getLoggedUser(req: Request, res: Response): Promise<Response> {
        try {
            const userId = (req.user as JwtPayloadCustom).userId;
            console.log('Fetching user with ID:', userId);
            const user = await this.userRepository.findByUserId(userId);

            if (!user) {
                throw new CustomError('Usuário não encontrado', 404);
            }

            return res.status(200).json({
                message: 'Dados do usuário logado',
                user: { id: user.id, name: user.name, email: user.email }
            });
        } catch (error) {
            console.error('Erro no método getLoggedUser:', error);
            return res
                .status(500)
                .json({ message: 'Erro ao buscar dados do usuário' });
        }
    }
}
