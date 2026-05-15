import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): Response => {
    const status = err.status || 500;
    const message = err.message || 'Une erreur interne est survenue';
    const code = err.code || 'INTERNAL_SERVER_ERROR';
    return res.status(status).json({ error: { code, message } });
};
