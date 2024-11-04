import { Request, Response } from 'express';
import { CustomError } from '../interfaces/CustomError';
import { AuthService } from '../services/AuthService';
import { UserRepository } from '../repositories/UserRepository';

/**
 * Controlador de autenticação.
 */
export class AuthController {
    private authService: AuthService;

    /**
     * Instancia o AuthService.
     */
    constructor() {
        this.authService = new AuthService();
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
}
