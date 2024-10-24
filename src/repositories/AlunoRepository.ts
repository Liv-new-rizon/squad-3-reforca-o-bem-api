import { MongoRepository } from 'typeorm';
import { Aluno } from '../models/profiles/Aluno';
import { MongoDataSource } from '../config/database';

/**
 * Repositório da entidade Aluno para encapsular o acesso aos dados.
 */
export class AlunoRepository {
  private repository: MongoRepository<Aluno>;

  constructor() {
    // Inicializa o repositório do TypeORM
    this.repository = MongoDataSource.getMongoRepository(Aluno);
  }

  /**
   * Cria uma instância de aluno sem salvar no banco.
   *
   * @param alunoData - Os dados do aluno.
   * @returns A instância do aluno criada.
   */
  create(alunoData: Partial<Aluno>): Aluno {
    console.log('Criando instância de aluno:', alunoData);
    return this.repository.create(alunoData);
  }

  /**
   * Salva um novo aluno no banco de dados.
   *
   * @param aluno - O aluno a ser salvo.
   * @returns O aluno salvo.
   */
  async save(aluno: Aluno): Promise<Aluno> {
    console.log('Salvando novo aluno:', aluno);
    return this.repository.save(aluno);
  }

  /**
   * Encontra um aluno pelo ID do usuário associado.
   *
   * @param userId - O ID do usuário associado ao aluno.
   * @returns Uma Promise que resolve no aluno encontrado ou undefined.
   */
  async findByUserId(userId: string): Promise<Aluno | undefined> {
    console.log('Buscando aluno pelo userId:', userId);
    return this.repository.findOne({ where: { userId } });
  }
}
