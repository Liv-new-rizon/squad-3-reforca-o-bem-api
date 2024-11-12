import { Request, Response } from 'express';
import { CustomError } from '../interfaces/CustomError';
import { AuthService } from '../services/AuthService';
import { UserRepository } from '../repositories/UserRepository';
import { JwtPayloadCustom } from '../interfaces/JwtPayloadCustom';

/**
 * Controlador de autenticação.
 */
export class AuthController {
    private authService: AuthService;
    private userRepository: UserRepository;

    /**
     * Instancia o AuthService.
     */
    constructor() {
        this.authService = new AuthService();
        this.userRepository = new UserRepository();
    }

    /**
     * Realiza o login do usuário, gerando e retornando o token JWT.
     *
     * @param req - Requisição contendo email e senha do usuário.
     * @param res - Resposta HTTP com o token JWT ou uma mensagem de erro.
     * @returns Resposta com o token JWT gerado ou erro.
     */
    public async login(req: Request, res: Response): Promise<Response> {
        try {
            const { email, password } = req.body;
            const token = await this.authService.loginUser(email, password);

            const user = await this.userRepository.findByEmail(email);
            if (user) {
                user.token = token; // Atribuir o token ao campo `token` do usuário
                await this.userRepository.save(user); // Salvar o usuário com o token atualizado
            }

            return res.status(200).json({
                message: 'Login bem-sucedido',
                token
            });
        } catch (error) {
            if (error instanceof CustomError) {
                return res
                    .status(error.status)
                    .json({ message: 'Credenciais inválidas' });
            }
            return res
                .status(500)
                .json({ message: 'Erro interno de servidor' });
        }
    }

    async logout(req: Request, res: Response): Promise<Response> {
        const userId = (req.user as JwtPayloadCustom).userId;
        const userRepository = new UserRepository();

        const user = await userRepository.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        user.token = null; // Invalida o token removendo-o do banco
        await userRepository.save(user);

        return res
            .status(200)
            .json({ message: 'Logout realizado com sucesso' });
    }
}
