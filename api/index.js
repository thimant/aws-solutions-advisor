```javascript
// Vercel Serverless Function - CommonJS
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Mock data inline
const mockIndustries = {
  industries: [
    "Publicidade e Marketing",
    "Mídia e Entretenimento",
    "Serviços Financeiros",
    "Saúde e Ciências Biológicas",
    "Óleo e Gás",
    "Manufatura",
    "Varejo e Bens de Consumo"
  ]
};

const mockPainPoints = {
  "Publicidade e Marketing": [
    {
      id: "pain-1",
      title: "Análise de Dados em Tempo Real",
      description: "Necessidade de processar grandes volumes de dados de campanhas em tempo real",
      impact: "Alto",
      keywords: ["analytics", "big data", "tempo real"]
    },
    {
      id: "pain-2",
      title: "Personalização em Escala",
      description: "Criar experiências personalizadas para milhões de usuários",
      impact: "Alto",
      keywords: ["personalização", "ML", "segmentação"]
    }
  ],
  "Mídia e Entretenimento": [
    {
      id: "pain-3",
      title: "Streaming de Alta Qualidade",
      description: "Entregar conteúdo de vídeo com baixa latência globalmente",
      impact: "Crítico",
      keywords: ["streaming", "CDN", "latência"]
    }
  ],
  "Serviços Financeiros": [
    {
      id: "pain-5",
      title: "Conformidade Regulatória",
      description: "Atender requisitos do Banco Central e órgãos reguladores",
      impact: "Crítico",
      keywords: ["compliance", "regulação", "auditoria"]
    }
  ],
  "Saúde e Ciências Biológicas": [
    {
      id: "pain-7",
      title: "Segurança de Dados de Pacientes",
      description: "Proteção de informações médicas sensíveis (HIPAA/LGPD)",
      impact: "Crítico",
      keywords: ["HIPAA", "LGPD", "privacidade"]
    }
  ],
  "Óleo e Gás": [
    {
      id: "pain-9",
      title: "IoT em Campo",
      description: "Monitorar equipamentos remotos em tempo real",
      impact: "Alto",
      keywords: ["IoT", "sensores", "manutenção preditiva"]
    }
  ],
  "Manufatura": [
    {
      id: "pain-11",
      title: "Manutenção Preditiva",
      description: "Prever falhas em equipamentos antes que ocorram",
      impact: "Alto",
      keywords: ["IoT", "ML", "downtime"]
    }
  ],
  "Varejo e Bens de Consumo": [
    {
      id: "pain-13",
      title: "Escalabilidade em Períodos de Pico",
      description: "Lidar com picos de demanda durante eventos promocionais",
      impact: "Alto",
      keywords: ["escalabilidade", "performance", "black friday"]
    }
  ]
};

const mockRecommendations = {
  recommendations: [
    {
      title: "Arquitetura Serverless com Lambda e API Gateway",
      description: "Solução escalável que se ajusta automaticamente à demanda",
      awsServices: ["AWS Lambda", "Amazon API Gateway", "Amazon DynamoDB"],
      marketSolutions: ["Serverless Framework", "AWS SAM"],
      score: 95,
      category: "migracao-modernizacao",
      painPoint: "Escalabilidade"
    },
    {
      title: "Proteção de Dados com AWS Security Hub",
      description: "Centralização de segurança e conformidade",
      awsServices: ["AWS Security Hub", "Amazon GuardDuty", "AWS WAF"],
      marketSolutions: ["CloudGuard", "Prisma Cloud"],
      score: 92,
      category: "seguranca",
      painPoint: "Segurança"
    }
  ]
};

// Rotas
app.get('/api', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'API is running',
    useMock: true,
    timestamp: new Date().toISOString()
  });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'AWS Solutions Advisor API',
    useMock: true,
    version: '1.0.0'
  });
});

app.get('/api/industries', (req, res) => {
  console.log('GET /api/industries');
  res.json(mockIndustries);
});

app.get('/api/pain-points/:industry', (req, res) => {
  const { industry } = req.params;
  console.log(`GET /api/pain-points/${industry}`);
  const painPoints = mockPainPoints[industry] || [];
  res.json({ painPoints });
});

app.post('/api/recommendations', (req, res) => {
  const { industry, painPoints } = req.body;
  console.log(`POST /api/recommendations - Industry: ${industry}`);
  res.json(mockRecommendations);
});

app.post('/api/service-info', (req, res) => {
  const { serviceName, painPoint } = req.body;
  console.log(`POST /api/service-info - Service: ${serviceName}`);
  res.json({
    description: `${serviceName} é um serviço AWS gerenciado.`,
    reason: `Este serviço ajuda a resolver: ${painPoint}`,
    benefits: ["Escalabilidade", "Alta disponibilidade", "Segurança"],
    useCases: ["Aplicações empresariais", "Processamento de dados"]
  });
});

app.post('/api/generate-architecture', (req, res) => {
  const { services, title } = req.body;
  console.log(`POST /api/generate-architecture - Title: ${title}`);
  res.json({
    diagram: 'graph TB\n    User["👤 Usuário"] --> Service["☁️ AWS Services"]\n    Service --> Result["✅ Resultado"]',
    description: `Arquitetura usando ${services.length} serviços AWS`,
    dataFlow: ["Usuário acessa", "Serviços processam", "Resultado entregue"],
    benefits: ["Escalável", "Seguro", "Confiável"],
    security: ["Criptografia", "IAM", "CloudTrail"]
  });
});

// Export for Vercel
module.exports = app;
```
