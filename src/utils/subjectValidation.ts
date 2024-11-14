/**
 * Lista de matérias válidas para validação de interesses e especializações.
 */
export const validSubjects = [
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
    'Sociologia'
];

/**
 * Valida se as matérias fornecidas estão na lista de matérias válidas.
 *
 * @param subjects - Lista de matérias a serem validadas.
 * @returns `true` se todas as matérias forem válidas, `false` caso contrário.
 */
export const validateSubjects = (subjects: string[]): boolean => {
    return subjects.every((subject) => validSubjects.includes(subject));
};

/**
 * Funções específicas de validação para matérias de interesse e especialização.
 */
export const validateSubjectsOfInterest = validateSubjects;
export const validateSubjectsOfExpertise = validateSubjects;
