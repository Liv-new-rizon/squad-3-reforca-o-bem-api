import { Entity, Column, ObjectIdColumn, BeforeInsert } from 'typeorm';
import bcrypt from 'bcrypt';

/**
 * Entidade User representando a tabela/coleção de usuários no MongoDB.
 */
@Entity('users')
export class User {
    /**
     * Identificador único do usuário.
     */
    @ObjectIdColumn()
    id: string;

    /**
     * Nome do usuário.
     */
    @Column()
    name: string;

    /**
     * E-mail do usuário, deve ser único e não pode ser nulo.
     */
    @Column({ unique: true, nullable: false })
    email: string;

    /**
     * Senha do usuário armazenada com hash.
     */
    @Column()
    password: string;

    /**
     * Armazenar o token do usuário
     */
    @Column({ nullable: true })
    token?: string;

    /**
     * Número de logins realizados pelo usuário.
     */
    @Column({ type: 'int', default: 0 })
    loginCount: number;

    /**
     * Data e hora do último login do usuário.
     */
    @Column({ type: 'date', nullable: true })
    lastLogin: Date;

    /**
     * Data de criação do usuário.
     */
    @Column({ type: 'date', default: () => 'NOW()' })
    createdAt: Date;

    /**
     * Valida o formato do e-mail antes de inserir no banco de dados.
     * @throws {Error} Se o e-mail estiver em um formato inválido.
     */
    @BeforeInsert()
    validateEmail(): void {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.email)) {
            throw new Error('O e-mail fornecido está em um formato inválido.');
        }
    }

    /**
     * Gera um hash para a senha antes de inseri-la no banco de dados.
     */
    @BeforeInsert()
    async hashPassword(): Promise<void> {
        if (!this.password.startsWith('$2b$')) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }
    }

    /**
     * Compara a senha fornecida com o hash armazenado.
     * @param candidatePassword - A senha fornecida para comparar.
     * @returns {Promise<boolean>} Retorna verdadeiro se as senhas coincidirem, falso caso contrário.
     */
    async comparePassword(candidatePassword: string): Promise<boolean> {
        return bcrypt.compare(candidatePassword, this.password);
    }
}
