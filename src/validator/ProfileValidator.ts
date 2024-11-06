import { Request, Response, NextFunction } from 'express';
import { UserRepository } from '../repositories/UserRepository';
import {
    validateBirthDate,
    validateEducationLevel,
    validateSchoolType,
    validateSubjectsOfInterest,
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
            phoneNumber
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

                if (errors.length > 0) {
                    return res.status(400).json({ errors });
                }
            } else {
                return res
                    .status(400)
                    .json({ message: 'Tipo de Perfil Inválido.' });
            }

            next();
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}
