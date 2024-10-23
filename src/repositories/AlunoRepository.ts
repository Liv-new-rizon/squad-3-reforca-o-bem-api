import { MongoDataSource } from '../config/database';
import { Aluno } from '../models/Aluno';

/**
 * Repositório para a entidade Aluno.
 */
export const AlunoRepository = MongoDataSource.getMongoRepository(Aluno);
