import { Request, Response } from 'express';
import { AlunoRepository } from '../repositories/AlunoRepository';
import { UserRepository } from '../repositories/UserRepository';

/**
 * Controlador para as operações relacionadas aos alunos.
 */
export class AlunoController {
  private alunoRepository: AlunoRepository;

  constructor() {
    this.alunoRepository = new AlunoRepository();
  }

  /**
   * Cria um novo aluno associado a um usuário existente.
   *
   * @param req - Requisição HTTP contendo os dados do aluno.
   * @param res - Resposta HTTP.
   * @returns Resposta HTTP com o aluno criado ou erro.
   */
  async createAluno(req: Request, res: Response): Promise<Response> {
    const {
      userId,
      dataNascimento,
      escolaridade,
      tipoEscola,
      materiasInteresse,
      numeroCelular,
    } = req.body;

    try {
      // Verificar se o usuário existe usando o ID do usuário (userId)
      const user = await new UserRepository().findOne(userId);
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      // Criar e salvar o novo aluno vinculado ao userId
      const newAluno = this.alunoRepository.create({
        userId, // ID de referência do usuário
        dataNascimento: new Date(dataNascimento),
        escolaridade,
        tipoEscola,
        materiasInteresse,
        numeroCelular,
      });

      await this.alunoRepository.save(newAluno);

      return res.status(201).json({
        message: 'Aluno cadastrado com sucesso',
        aluno: newAluno,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Erro ao cadastrar aluno',
        error: error.message,
      });
    }
  }
}
