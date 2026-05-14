import { config } from '../../config/env.js';

const BASE_URL = 'https://api.chess.com/pub';

const headers = {
  'User-Agent': config.chessComUserAgent,
};

export const chesscomClient = {

  async getPlayer(username: string) {
    const res = await fetch(`${BASE_URL}/player/${username}`, { headers });
    
    if (res.status === 404) {
      throw new Error(`Joueur "${username}" introuvable sur Chess.com`);
    }
    if (!res.ok) {
      throw new Error(`Erreur Chess.com: ${res.status}`);
    }
    
    return res.json();
  },

  async getStats(username: string) {
    const res = await fetch(`${BASE_URL}/player/${username}/stats`, { headers });
    
    if (!res.ok) {
      throw new Error(`Erreur Chess.com stats: ${res.status}`);
    }
    
    return res.json();
  }
};