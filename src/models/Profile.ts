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
    type: string;

    @Column()
    userId: string;

    // Campos comuns
    @Column()
    phoneNumber: string;

    // Campos específicos do aluno
    @Column({ nullable: true })
    birthDate?: Date;

    @Column({ nullable: true })
    educationLevel?: string;

    @Column({ nullable: true })
    schoolType?: string;

    @Column({ nullable: true })
    subjectsOfInterest?: string[];

    // Campos específicos do tutor
    @Column({ nullable: true })
    profession?: string;

    @Column({ nullable: true })
    classEntity?: string;

    @Column({ nullable: true })
    regionalCouncil?: string;

    @Column({ nullable: true })
    documentNumber?: string;

    @Column({ nullable: true })
    subjectsOfExpertise?: string[];
}
