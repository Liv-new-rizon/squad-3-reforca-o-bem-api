import { Request, Response, NextFunction } from 'express';
import { UserRepository } from '../repositories/UserRepository';

/**
 * Validador para verificar a integridade dos dados de perfil.
 */
export class ProfileValidator {
  public async validateProfile(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const {
      type,
      birthDate,
      educationLevel,
      schoolType,
      subjectsOfInterest,
      phoneNumber,
    } = req.body;

    const errors: string[] = [];

    try {
      if (type === 'student') {
        if (!this.validateBirthDate(birthDate)) {
          errors.push('Data inválida. Formato correto: DD/MM/AAAA.');
        }

        const validEducationLevels = [
          'Ensino Médio (1º ano)',
          'Ensino Médio (2º ano)',
          'Ensino Médio (3º ano)',
        ];
        if (!validEducationLevels.includes(educationLevel)) {
          errors.push('Escolaridade inválida.');
        }

        const validSchoolTypes = ['Escola Pública', 'Escola Privada'];
        if (!validSchoolTypes.includes(schoolType)) {
          errors.push('Tipo de Escola inválido.');
        }

        const validSubjects = [
          'Língua Portuguesa',
          'Inglês',
          'Artes',
          'Educação Física',
          'Matemática',
          'Física',
          'Química',
          'Biologia',
          'História',
          'Geografia',
          'Filosofia',
          'Sociologia',
        ];
        if (
          !subjectsOfInterest.every((subject: string) =>
            validSubjects.includes(subject),
          )
        ) {
          errors.push('Matérias inválidas.');
        }

        const formattedPhone = this.formatPhoneNumber(phoneNumber);
        if (!formattedPhone) {
          errors.push('Número de celular inválido. Deve conter 11 dígitos.');
        }

        // Verificar se o usuário existe usando o ID do usuário em `req.userId`
        const userId = req.userId; // Middleware de autenticação deve preencher `req.userId`
        const user = await new UserRepository().findById(userId!);
        if (!user) {
          errors.push('Usuário não encontrado.');
        }

        if (errors.length > 0) {
          return res.status(400).json({ errors });
        }
      } else {
        return res.status(400).json({ message: 'Tipo de Perfil Inválido.' });
      }

      next();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  private validateBirthDate(date: string): boolean {
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}$/;
    if (!date) return false;
    if (!dateRegex.test(date)) return false;

    const [day, month, year] = date.split('/').map(Number);
    const dateObject = new Date(year, month - 1, day);

    return (
      dateObject.getFullYear() === year &&
      dateObject.getMonth() === month - 1 &&
      dateObject.getDate() === day
    );
  }

  private formatPhoneNumber(phone: string): string | null {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length !== 11) return null;
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(
      7,
    )}`;
  }
}
