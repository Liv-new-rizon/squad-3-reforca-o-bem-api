import { Entity, ObjectIdColumn, Column, ManyToOne } from 'typeorm';
import { User } from './Users';

/**
 * Entidade Aluno, refletindo as informações complementares solicitadas.
 */
@Entity('alunos')
export class Aluno {
    @ObjectIdColumn()
    id: string;

    @ManyToOne(() => User, (user) => user.id)
    userId: string;

    @Column()
    dataNascimento: Date;

    @Column()
    escolaridade: string;

    @Column()
    tipoEscola: string;

    @Column('simple-array')
    materiasInteresse: string[];

    @Column()
    numeroCelular: string;
}
