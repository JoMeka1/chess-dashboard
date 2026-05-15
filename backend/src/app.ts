import express from 'express';
import { playerController } from './controllers/playerController.js';
import { statsController } from './controllers/statsController.js';
import { errorHandler } from './middlewares/errorHandler.js';
import cors from 'cors';


const app = express();

app.use(express.json());

app.use(cors({
  origin: 'https://chess-dashboard-five.vercel.app'
}));

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/api/player/:username', playerController.getProfile);

app.get('/api/player/:username/stats', statsController.getStats);

app.use(errorHandler);

export default app;