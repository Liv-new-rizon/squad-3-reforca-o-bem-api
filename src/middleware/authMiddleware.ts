import { Request, Response, NextFunction } from 'express';
import { JwtService } from '../library/jwt';
import { CustomError } from '../interfaces/CustomError';
import { JwtPayloadCustom } from '../interfaces/JwtPayloadCustom';

/**
 * Middleware de autenticação para validar tokens JWT.
 *
 * Este middleware verifica se um token JWT válido foi fornecido no cabeçalho de autorização.
 * Caso o token seja válido, o payload do token é atribuído a `req.user`, permitindo o acesso
 * a rotas protegidas. Caso contrário, uma resposta de erro é retornada.
 *
 * @param req - Objeto de requisição do Express.
 * @param res - Objeto de resposta do Express.
 * @param next - Função de callback para passar o controle para o próximo middleware.
 * @returns Retorna uma resposta 401 se o token não for fornecido ou for inválido,
 *          caso contrário, passa o controle para o próximo middleware.
 */
export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = JwtService.verifyToken(
            token,
            process.env.JWT_SECRET!
        ) as JwtPayloadCustom;
        console.log('Decoded token payload:', decoded);
        req.user = decoded;
        next();
    } catch (error) {
        next(new CustomError('Token inválido ou expirado', 401));
    }
};
