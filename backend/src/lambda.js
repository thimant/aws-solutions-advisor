import serverless from 'serverless-http';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { config } from './config.js';
import recommendationsRouter from './routes/recommendations.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', recommendationsRouter);

app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'AWS Solutions Advisor API',
    environment: process.env.AWS_EXECUTION_ENV || 'local'
  });
});

// Export handler para Lambda
export const handler = serverless(app);
