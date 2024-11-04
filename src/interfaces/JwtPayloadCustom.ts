/**
 * Interface que define o payload customizado para o token JWT.
 * Inclui o identificador único do usuário.
 */
export interface JwtPayloadCustom {
    /** Identificador único do usuário */
    userId: string;
}
