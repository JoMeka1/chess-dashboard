const BASE_URL = 'https://chess-dashboard-d56v.onrender.com/api';

export const chessApi = {

  async getPlayer(username: string) {
    const res = await fetch(`${BASE_URL}/player/${username}`);
    if (!res.ok) throw new Error(`Joueur introuvable`);
    const json = await res.json();
    return json.data;
  },

  async getStats(username: string) {
    const res = await fetch(`${BASE_URL}/player/${username}/stats`);
    if (!res.ok) throw new Error(`Stats introuvables`);
    const json = await res.json();
    return json.data;
  }
};