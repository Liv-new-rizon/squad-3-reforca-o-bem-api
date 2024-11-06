import { CustomError } from '../interfaces/CustomError';
import { UserRepository } from '../repositories/UserRepository';
import { comparePassword } from '../library/bcrypt';
import { JwtService } from '../library/jwt';

/**
 * Serviço de autenticação para lidar com lógica de login.
 */
export class AuthService {
    private userRepository: UserRepository;

    /**
     * Inicializa o UserRepository para operações de autenticação.
     */
    constructor() {
        this.userRepository = new UserRepository();
    }

    /**
     * Autentica o usuário e gera um token JWT.
     *
     * @param email - Email do usuário.
     * @param password - Senha do usuário.
     * @returns O token JWT gerado.
     * @throws CustomError se o usuário não for encontrado ou se as credenciais forem inválidas.
     */
    public async loginUser(email: string, password: string): Promise<string> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new CustomError('Usuário não encontrado', 404);
        }

        const isPasswordValid = await comparePassword(password, user.password);

        if (!isPasswordValid) {
            throw new CustomError('Credenciais inválidas', 401);
        }

        return JwtService.generateToken(
            { userId: user.id },
            process.env.JWT_SECRET!,
            '1h'
        );
    }
}
