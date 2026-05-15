import { config } from '../../config/env.js';

const BASE_URL = 'https://api.chess.com/pub';

const headers = {
  'User-Agent': config.chessComUserAgent,
};

export const chesscomClient = {

  async getPlayer(username: string) {
    const res = await fetch(`${BASE_URL}/player/${username}`, { headers });
    
    if (res.status === 404) {
      const error: any = new Error(`Joueur "${username}" introuvable sur Chess.com`);
      error.status = 404;
      error.code = 'PLAYER_NOT_FOUND';
      throw error;
    }
    if (!res.ok) {
      const error: any = new Error(`Erreur Chess.com: ${res.status}`);
      error.status = res.status;
      error.code = 'CHESSCOM_ERROR';
      throw error;
    }
    
    return res.json();
  },

  async getStats(username: string) {
    const res = await fetch(`${BASE_URL}/player/${username}/stats`, { headers });
    
    if (!res.ok) {
      const error: any = new Error(`Erreur Chess.com stats: ${res.status}`);
      error.status = res.status;
      error.code = 'CHESSCOM_ERROR';
      throw error;
    }
    
    return res.json();
  }
};