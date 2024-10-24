import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { User } from '../models/Users';
import { Aluno } from '../models/profiles/Aluno';

dotenv.config();

/**
 * Configuração do DataSource do MongoDB com TypeORM.
 */
export const MongoDataSource = new DataSource({
  type: 'mongodb',
  url: process.env.DB_CONNECTION_STRING || '',
  database: process.env.DB_DATABASE || 'reforca',
  synchronize: false,
  logging: true,
  entities: [User, Aluno],
});

/**
 * Função para inicializar a conexão com o MongoDB.
 */
export const connectDB = async () => {
  try {
    await MongoDataSource.initialize();
    console.log('MongoDB connected successfully with TypeORM!');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
