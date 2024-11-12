import { Request, Response, NextFunction } from 'express';
import { UserRepository } from '../repositories/UserRepository';
import {
    validateBirthDate,
    validateEducationLevel,
    validateSchoolType,
    validateSubjectsOfInterest,
    validateProfession,
    validateClassEntity,
    validateRegionalCouncil,
    validateDocumentNumber,
    validateSubjectsOfExpertise,
    formatPhoneNumber
} from '../utils/validation';

/**
 * Validador para verificar a integridade dos dados de perfil.
 */
export class ProfileValidator {
    /**
     * Valida os dados do perfil do usuário de acordo com o tipo de perfil.
     *
     * @param req - Objeto da solicitação HTTP.
     * @param res - Objeto de resposta HTTP.
     * @param next - Função para passar o controle para o próximo middleware.
     * @returns Uma resposta de erro, caso existam problemas de validação, ou `void` para prosseguir.
     */
    public async validateProfile(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> {
        const {
            type,
            birthDate,
            educationLevel,
            schoolType,
            subjectsOfInterest,
            phoneNumber,
            profession,
            classEntity,
            regionalCouncil,
            documentNumber,
            subjectsOfExpertise
        } = req.body;

        const errors: string[] = [];

        try {
            if (type === 'student') {
                if (!validateBirthDate(birthDate)) {
                    errors.push('Data inválida. Formato correto: DD/MM/AAAA.');
                }

                if (!validateEducationLevel(educationLevel)) {
                    errors.push('Escolaridade inválida.');
                }

                if (!validateSchoolType(schoolType)) {
                    errors.push('Tipo de Escola inválido.');
                }

                if (!validateSubjectsOfInterest(subjectsOfInterest)) {
                    errors.push('Matérias inválidas.');
                }

                const formattedPhone = formatPhoneNumber(phoneNumber);
                if (!formattedPhone) {
                    errors.push(
                        'Número de celular inválido. Deve conter 11 dígitos.'
                    );
                }

                const userId = req.user.userId;
                const user = await new UserRepository().findById(userId!);
                if (!user) {
                    errors.push('Usuário não encontrado.');
                }
            } else if (type === 'tutor') {
                if (!validateProfession(profession)) {
                    errors.push(
                        'Profissão inválida. Apenas letras são permitidas.'
                    );
                }

                if (!validateClassEntity(classEntity)) {
                    errors.push(
                        'Entidade de classe inválida. Escolha entre "sim" ou "não".'
                    );
                }

                if (classEntity === 'sim') {
                    if (!validateRegionalCouncil(regionalCouncil)) {
                        errors.push(
                            'Conselho Regional ou Entidade de Classe inválido.'
                        );
                    }

                    if (!validateDocumentNumber(documentNumber)) {
                        errors.push('Número de documento inválido.');
                    }
                }

                if (!validateSubjectsOfExpertise(subjectsOfExpertise)) {
                    errors.push('Matérias de especialização inválidas.');
                }

                const formattedPhone = formatPhoneNumber(phoneNumber);
                if (!formattedPhone) {
                    errors.push(
                        'Número de celular inválido. Deve conter 11 dígitos.'
                    );
                }

                const userId = req.user.userId;
                const user = await new UserRepository().findById(userId!);
                if (!user) {
                    errors.push('Usuário não encontrado.');
                }
            } else {
                return res
                    .status(400)
                    .json({ message: 'Tipo de Perfil Inválido.' });
            }

            if (errors.length > 0) {
                return res.status(400).json({ errors });
            }

            next();
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}
