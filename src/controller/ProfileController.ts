import { Request, Response } from 'express';
import { ProfileRepository } from '../repositories/ProfileRepository';

/**
 * Controlador para operações relacionadas aos perfis.
 */
export class ProfileController {
    private profileRepository: ProfileRepository;

    /**
     * Instancia o ProfileRepository.
     */
    constructor() {
        this.profileRepository = new ProfileRepository();
    }

    /**
     * Cria um novo perfil de aluno associado a um usuário existente.
     *
     * @param req - Requisição contendo os dados do perfil de aluno a ser criado.
     * @param res - Resposta HTTP com o perfil criado ou uma mensagem de erro.
     * @returns Resposta com o perfil criado ou erro.
     */
    public async createProfile(req: Request, res: Response): Promise<Response> {
        const {
            type,
            birthDate,
            educationLevel,
            schoolType,
            subjectsOfInterest,
            phoneNumber
        } = req.body;

        const userId = req.user.userId;

        try {
            const newProfile = this.profileRepository.create({
                userId,
                type,
                birthDate: new Date(birthDate.split('/').reverse().join('-')),
                educationLevel,
                schoolType,
                subjectsOfInterest,
                phoneNumber
            });

            await this.profileRepository.save(newProfile);

            return res.status(201).json({
                message: 'Perfil cadastrado com sucesso',
                profile: newProfile
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao cadastrar perfil',
                error: error.message
            });
        }
    }

    /**
     * Cria um novo perfil de tutor associado a um usuário existente.
     *
     * @param req - Requisição contendo os dados do perfil de tutor a ser criado.
     * @param res - Resposta HTTP com o perfil criado ou uma mensagem de erro.
     * @returns Resposta com o perfil criado ou erro.
     */
    public async createTutorProfile(
        req: Request,
        res: Response
    ): Promise<Response> {
        const {
            profession,
            hasProfessionalAffiliation,
            regionalCouncil,
            documentNumber,
            subjectsOfExpertise,
            phoneNumber
        } = req.body;

        const userId = req.user.userId;

        try {
            const newTutorProfile = this.profileRepository.create({
                userId,
                type: 'Tutor',
                profession,
                hasProfessionalAffiliation,
                regionalCouncil,
                documentNumber,
                subjectsOfExpertise,
                phoneNumber
            });

            await this.profileRepository.save(newTutorProfile);

            return res.status(201).json({
                message: 'Perfil de tutor cadastrado com sucesso',
                profile: newTutorProfile
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao cadastrar perfil de tutor',
                error: error.message
            });
        }
    }
}
