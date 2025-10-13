import dotenv from 'dotenv';

// Carregar variáveis de ambiente ANTES de qualquer outra coisa
dotenv.config();

export const config = {
  AWS_REGION: process.env.AWS_REGION || 'us-east-1',
  AWS_KNOWLEDGE_BASE_ID: process.env.AWS_KNOWLEDGE_BASE_ID || '16KU1G5RWH',
  PORT: process.env.PORT || 3000,
  USE_MOCK: process.env.USE_MOCK === 'true'
};

console.log(`🔧 Configuração carregada:`, {
  AWS_REGION: config.AWS_REGION,
  AWS_KNOWLEDGE_BASE_ID: config.AWS_KNOWLEDGE_BASE_ID,
  PORT: config.PORT,
  USE_MOCK: config.USE_MOCK
});
