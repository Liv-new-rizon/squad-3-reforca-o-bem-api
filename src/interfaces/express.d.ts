import { JwtPayload } from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            /**
             * Payload do token JWT decodificado.
             * Inclui as informações do usuário para acesso em rotas autenticadas.
             */
            user?: JwtPayload | string;
        }
    }
}
