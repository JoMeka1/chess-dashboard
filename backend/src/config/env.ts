// src/config/env.ts

const requises = ['PORT', 'NODE_ENV', 'CHESS_COM_USER_AGENT'];

for (const variable of requises) {
  if (!process.env[variable]) {
    throw new Error(`Variable d'environnement manquante : ${variable}`);
  }
}

export const config = {
  port: Number(process.env.PORT),
  nodeEnv: process.env.NODE_ENV as string,
  chessComUserAgent: process.env.CHESS_COM_USER_AGENT as string,
};