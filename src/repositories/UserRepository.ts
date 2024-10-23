import { MongoRepository } from 'typeorm';
import { User } from '../models/Users';
import { MongoDataSource } from '../config/database';

/**
 * Repositório da entidade User para encapsular o acesso aos dados.
 */
export class UserRepository {
    private repository: MongoRepository<User>;

    constructor() {
        // Inicializa o repositório do TypeORM
        this.repository = MongoDataSource.getMongoRepository(User);
    }

    /**
     * Encontra um usuário pelo e-mail.
     *
     * @param email - O e-mail do usuário.
     * @returns Uma Promise que resolve no usuário encontrado ou null.
     */
    async findByEmail(email: string): Promise<User | null> {
        return this.repository.findOne({ where: { email } });
    }

    /**
     * Encontra um usuário pelo ID.
     *
     * @param id - O ID do usuário.
     * @returns Uma Promise que resolve no usuário encontrado ou null.
     */
    async findOne(id: string): Promise<User | null> {
        return this.repository.findOne({ where: { id } });
    }

    /**
     * Salva um novo usuário ou atualiza um existente no banco de dados.
     *
     * @param user - O usuário a ser salvo ou atualizado.
     * @returns O usuário salvo ou atualizado.
     */
    async save(user: User): Promise<User> {
        return this.repository.save(user);
    }

    /**
     * Cria uma instância de usuário sem salvar no banco.
     *
     * @param userData - Os dados do usuário.
     * @returns A instância do usuário criada.
     */
    create(userData: Partial<User>): User {
        return this.repository.create(userData);
    }

    /**
     * Encontra todos os usuários no banco de dados.
     *
     * @returns Uma Promise que resolve em uma lista de usuários.
     */
    async findAll(): Promise<User[]> {
        return this.repository.find();
    }
}
