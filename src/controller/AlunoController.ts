import { Request, Response } from 'express';
import { AlunoRepository } from '../repositories/AlunoRepository';
import { UserRepository } from '../repositories/UserRepository';

export class AlunoController {
    async createAluno(req: Request, res: Response): Promise<Response> {
        const {
            userId,
            dataNascimento,
            escolaridade,
            tipoEscola,
            materiasInteresse,
            numeroCelular
        } = req.body;

        try {
            // Verificar se o usuário existe
            console.log(`Verificando se o usuário com ID ${userId} existe.`);
            const user = await new UserRepository().findOne(userId);
            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'Usuário não encontrado' });
            }

            // Criar e salvar o novo aluno
            const newAluno = AlunoRepository.create({
                userId,
                dataNascimento: new Date(dataNascimento),
                escolaridade,
                tipoEscola,
                materiasInteresse,
                numeroCelular
            });

            console.log('Salvando o novo aluno no banco de dados.');
            await AlunoRepository.save(newAluno);

            return res.status(201).json({
                message: 'Aluno cadastrado com sucesso',
                aluno: newAluno
            });
        } catch (error) {
            console.error('Erro ao cadastrar aluno:', error); // Log detalhado do erro
            return res.status(500).json({
                message: 'Erro ao cadastrar aluno',
                error: error.message
            });
        }
    }
}
