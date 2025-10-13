```javascript
// Vercel Serverless Function wrapper
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import recommendationsRouter from '../backend/src/routes/recommendations.js';

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get('/api', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'API is running',
    useMock: process.env.USE_MOCK === 'true'
  });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'AWS Solutions Advisor API',
    useMock: process.env.USE_MOCK === 'true'
  });
});

// Rotas principais
app.use('/api', recommendationsRouter);

export default app;
```
