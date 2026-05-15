import { statsService } from '../services/statsService.js';
import { Request, Response, NextFunction } from 'express';

export const statsController = {

  async getStats(req: Request<{ username: string }>, res: Response, next: NextFunction) {
    try {
      const { username } = req.params;
      const stats = await statsService.getStats(username);
      res.status(200).json({ data: stats });
    } catch (erreur) {
      next(erreur);
    }
  }
};