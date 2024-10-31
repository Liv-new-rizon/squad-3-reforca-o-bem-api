import { Request, Response } from 'express';
import { UserRepository } from '../repositories/UserRepository';
import { hashPassword } from '../library/bcrypt';
import { CustomError } from '../interfaces/CustomError';

/**
 * Controlador para operações relacionadas aos usuários.
 */
export class UserController {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  /**
   * Cria um novo usuário.
   */
  async createUser(req: Request, res: Response): Promise<Response> {
    const { name, email, password, confirmPassword } = req.body;

    try {
      if (password.length < 8) {
        throw new CustomError(
          'A senha deve conter pelo menos 8 caracteres',
          400,
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

      const newUser = await this.userRepository.create({
        name,
        email,
        password: hashedPassword,
      });

      await this.userRepository.save(newUser);

      return res.status(201).json({
        message: 'Usuário criado com sucesso',
        user: { id: newUser.id, email: newUser.email },
      });
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.status).json({ message: error.message });
      }

      return res
        .status(500)
        .json({ message: 'Erro desconhecido ao criar usuário' });
    }
  }
}
