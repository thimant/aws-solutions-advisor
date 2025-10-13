import express from 'express';
import cors from 'cors';
import { config } from './config.js';
import recommendationsRouter from './routes/recommendations.js';

const app = express();
const PORT = config.PORT;

app.use(cors());
app.use(express.json());

app.use('/api', recommendationsRouter);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'AWS Solutions Advisor API' });
});

// Para desenvolvimento local
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📊 Knowledge Base ID: ${config.AWS_KNOWLEDGE_BASE_ID}`);
    console.log(`🧪 Modo Mock: ${config.USE_MOCK ? 'ATIVADO ✅' : 'DESATIVADO ❌'}`);
  });
}

// Exportar para Vercel
export default app;
