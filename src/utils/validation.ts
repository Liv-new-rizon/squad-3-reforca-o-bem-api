/**
 * Valida o formato de um e-mail utilizando uma expressão regular.
 *
 * @param email - O e-mail a ser validado.
 * @returns `true` se o e-mail estiver no formato correto, `false` caso contrário.
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida o formato da data de nascimento no formato DD/MM/AAAA.
 *
 * @param date - A data de nascimento como string.
 * @returns `true` se a data estiver no formato e valor correto, `false` caso contrário.
 */
export const validateBirthDate = (date: string): boolean => {
  const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}$/;
  if (!dateRegex.test(date)) return false;

  const [day, month, year] = date.split('/').map(Number);
  const dateObject = new Date(year, month - 1, day);

  return (
    dateObject.getFullYear() === year &&
    dateObject.getMonth() === month - 1 &&
    dateObject.getDate() === day
  );
};

/**
 * Valida se o nível de escolaridade é uma das opções permitidas.
 *
 * @param educationLevel - O nível de escolaridade.
 * @returns `true` se a escolaridade for válida, `false` caso contrário.
 */
export const validateEducationLevel = (educationLevel: string): boolean => {
  const validLevels = [
    'Ensino Médio (1º ano)',
    'Ensino Médio (2º ano)',
    'Ensino Médio (3º ano)',
  ];
  return validLevels.includes(educationLevel);
};

/**
 * Valida se o tipo de escola é uma das opções permitidas.
 *
 * @param schoolType - O tipo de escola.
 * @returns `true` se o tipo de escola for válido, `false` caso contrário.
 */
export const validateSchoolType = (schoolType: string): boolean => {
  const validTypes = ['Escola Pública', 'Escola Privada'];
  return validTypes.includes(schoolType);
};

/**
 * Valida se as matérias de interesse são todas válidas.
 *
 * @param subjects - Lista de matérias de interesse.
 * @returns `true` se todas as matérias forem válidas, `false` caso contrário.
 */
export const validateSubjectsOfInterest = (subjects: string[]): boolean => {
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
  return subjects.every((subject) => validSubjects.includes(subject));
};

/**
 * Formata e valida o número de telefone no formato (XX) XXXXX-XXXX.
 *
 * @param phone - O número de telefone como string.
 * @returns O número formatado se válido, `null` caso contrário.
 */
export const formatPhoneNumber = (phone: string): string | null => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length !== 11) return null;

  return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
};
