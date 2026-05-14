import { chesscomClient } from '../integrations/chesscom/chesscomClient.js';

export const playerService = {

  async getProfile(username: string) {
    const [player, stats] = await Promise.all([
      chesscomClient.getPlayer(username),
      chesscomClient.getStats(username),
    ]);

    return {
      username: player.username,
      name: player.name,
      avatar: player.avatar,
      title: player.title ?? null,
      followers: player.followers,
      ratings: {
        blitz: stats.chess_blitz?.last?.rating ?? null,
        bullet: stats.chess_bullet?.last?.rating ?? null,
        rapid: stats.chess_rapid?.last?.rating ?? null,
      },
      winrate: calculerWinrate(stats.chess_blitz?.record),
    };
  }
};

function calculerWinrate(record: { win: number; loss: number; draw: number } | undefined) {
  if (!record) return null;
  const total = record.win + record.loss + record.draw;
  if (total === 0) return null;
  return Math.round((record.win / total) * 100);
}
