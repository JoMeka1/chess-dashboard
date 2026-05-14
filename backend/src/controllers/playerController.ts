import { playerService } from '../services/playerService.js';
import { Request, Response, NextFunction } from 'express';

export const playerController = {

  async getProfile(req: Request<{ username: string }>, res: Response, next: NextFunction) {
    try {
      const { username } = req.params;
      const profile = await playerService.getProfile(username);
      res.status(200).json({ data: profile });
    } catch (erreur) {
      next(erreur);
    }
  }
};