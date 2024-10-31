import { MongoRepository } from 'typeorm';
import { User } from '../models';
import { MongoDataSource } from '../config/database';
import { ObjectId } from 'mongodb';

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

    /**
     * Salva um novo usuário no banco de dados.
     *
     * @param user - O objeto do usuário a ser salvo.
     * @returns Uma `Promise` que resolve com o usuário salvo.
     */
    async save(user: User): Promise<User> {
        return this.repository.save(user);
    }

    /**
     * Cria uma instância de usuário sem salvar no banco.
     *
     * @param userData - Os dados parciais do usuário para criar uma nova instância de `User`.
     * @returns Uma nova instância de `User`, que ainda não foi salva no banco de dados.
     */
    create(userData: Partial<User>): User {
        return this.repository.create(userData);
    }

    /**
     * Encontra um usuário pelo `userId`.
     *
     * @param userId - O ID do usuário a ser encontrado.
     * @returns Uma `Promise` que resolve com o usuário encontrado ou `undefined` se não existir.
     */
    async findByUserId(userId: string): Promise<User | undefined> {
        return this.repository.findOne({
            where: { _id: new ObjectId(userId) }
        });
    }
}
