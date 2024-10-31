import { MongoRepository } from 'typeorm';
import { User } from '../models/Users';
import { MongoDataSource } from '../config/database';

/**
 * Repositório da entidade User para encapsular o acesso aos dados.
 */
export class UserRepository {
  private repository: MongoRepository<User>;

  constructor() {
    this.repository = MongoDataSource.getMongoRepository(User);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
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
