import { MongoRepository } from 'typeorm';
import { User } from '../models';
import { MongoDataSource } from '../config/database';

/**
 * Repositório da entidade `User` para encapsular o acesso aos dados.
 * Este repositório fornece métodos para operações CRUD na coleção de usuários.
 */
export class UserRepository {
  private repository: MongoRepository<User>;

  /**
   * Cria uma instância de `UserRepository` e inicializa o repositório do TypeORM.
   */
  constructor() {
    this.repository = MongoDataSource.getMongoRepository(User);
  }

  /**
   * Encontra um usuário pelo e-mail.
   *
   * @param email - O e-mail do usuário a ser encontrado.
   * @returns Uma `Promise` que resolve com o usuário encontrado ou `undefined` caso não exista.
   */
  async findByEmail(email: string): Promise<User | undefined> {
    return this.repository.findOne({ where: { email } });
  }

  public async findById(id: string): Promise<User | undefined> {
    return this.repository.findOne({ where: { id } });
  }

  public async save(user: User): Promise<User> {
    return this.repository.save(user);
  }

  public async create(userData: Partial<User>): Promise<User> {
    return this.repository.create(userData);
  }
}
