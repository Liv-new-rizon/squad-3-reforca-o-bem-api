import { Entity, ObjectIdColumn, Column, ObjectId } from 'typeorm';

/**
 * Entidade Profile, refletindo as informações complementares solicitadas
 * Vinculada ao usuário por meio do campo userId.
 */
@Entity('profile')
export class Profile {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  userId: string;

  @Column()
  birthDate: Date;

  @Column()
  educationLevel: string;

  @Column()
  schoolType: string;

  @Column()
  subjectsOfInterest: string[];

  @Column()
  phoneNumber: string;
}
