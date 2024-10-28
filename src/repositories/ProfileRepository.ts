import { MongoRepository } from 'typeorm';
import { Profile } from '../models';
import { MongoDataSource } from '../config/database';

/**
 * Repositório da entidade Profile para encapsular o acesso aos dados.
 */
export class ProfileRepository {
    private repository: MongoRepository<Profile>;

    constructor() {
        this.repository = MongoDataSource.getMongoRepository(Profile);
    }

    /**
     * Cria uma instância de Profile sem salvar no banco.
     *
     * @param ProfileData - Os dados do aluno.
     * @returns A instância do aluno criada.
     */
    create(profileData: Partial<Profile>): Profile {
        return this.repository.create(profileData);
    }

    /**
     * Salva um novo aluno no banco de dados.
     *
     * @param profile - O aluno a ser salvo.
     * @returns O aluno salvo.
     */
    async save(profile: Profile): Promise<Profile> {
        return this.repository.save(profile);
    }

    /**
     * Encontra um aluno pelo ID do usuário associado.
     *
     * @param userId - O ID do usuário associado ao aluno.
     * @returns Uma Promise que resolve no aluno encontrado ou undefined.
     */
    async findByUserId(userId: string): Promise<Profile | undefined> {
        return this.repository.findOne({ where: { userId } });
    }
}
