import { chesscomClient } from '../integrations/chesscom/chesscomClient.js';

export const statsService = {
    async getStats(username: string) {
        const stats = await chesscomClient.getStats(username);

        // Rapid
        const rapid = stats.chess_rapid?.last?.rating ?? null;
        const bestRapid = stats.chess_rapid?.best?.rating ?? null;
        const winrateRapid = stats.chess_rapid?.record?.win ?? null;
        const lossrateRapid = stats.chess_rapid?.record?.loss ?? null;
        const drawrateRapid = stats.chess_rapid?.record?.draw ?? null;

        // Bullet
        const bullet = stats.chess_bullet?.last?.rating ?? null;
        const bestBullet = stats.chess_bullet?.best?.rating ?? null;
        const winrateBullet = stats.chess_bullet?.record?.win ?? null;
        const lossrateBullet = stats.chess_bullet?.record?.loss ?? null;
        const drawrateBullet = stats.chess_bullet?.record?.draw ?? null;

        // Blitz
        const blitz = stats.chess_blitz?.last?.rating ?? null;
        const bestBlitz = stats.chess_blitz?.best?.rating ?? null;
        const winrateBlitz = stats.chess_blitz?.record?.win ?? null;
        const lossrateBlitz = stats.chess_blitz?.record?.loss ?? null;
        const drawrateBlitz = stats.chess_blitz?.record?.draw ?? null;

        return {
            rapid: {
              current: rapid,
              best: bestRapid,
              wins: winrateRapid,
              losses: lossrateRapid,
              draws: drawrateRapid,
            },
            bullet: {
              current: bullet,
              best: bestBullet,
              wins: winrateBullet,
              losses: lossrateBullet,
              draws: drawrateBullet,
            },
            blitz: {
              current: blitz,
              best: bestBlitz,
              wins: winrateBlitz,
              losses: lossrateBlitz,
              draws: drawrateBlitz,
            }
          };
    }
};
