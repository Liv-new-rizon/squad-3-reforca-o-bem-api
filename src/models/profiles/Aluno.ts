import { Entity, ObjectIdColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../Users';

/**
 * Entidade Aluno, refletindo as informações complementares solicitadas
 * Vinculada ao usuário por meio do campo userId
 */
@Entity('alunos')
export class Aluno {
  /**
   * Identificador único do aluno
   */
  @ObjectIdColumn()
  id: string;

  /**
   * Relacionamento com a entidade User
   * Indica que o aluno está vinculado a um usuário específico
   */
  @ManyToOne(() => User, (user) => user.id)
  userId: string;

  /**
   * Data de nascimento do aluno
   */
  @Column()
  dataNascimento: Date;

  /**
   * Escolaridade do aluno
   */
  @Column()
  escolaridade: string;

  /**
   * Tipo de escola do aluno (pública ou privada)
   */
  @Column()
  tipoEscola: string;

  /**
   * Lista de matérias de interesse do aluno
   */
  @Column('simple-array')
  materiasInteresse: string[];

  /**
   * Número de celular do aluno
   */
  @Column()
  numeroCelular: string;
}
