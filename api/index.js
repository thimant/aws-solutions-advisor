// Vercel Serverless Function
import express from 'express';
import cors from 'cors';

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
    },
    {
      id: "pain-4",
      title: "Armazenamento de Conteúdo",
      description: "Gerenciar petabytes de mídia de forma eficiente",
      impact: "Alto",
      keywords: ["storage", "arquivamento", "custos"]
    }
  ],
  "Serviços Financeiros": [
    {
      id: "pain-5",
      title: "Conformidade Regulatória",
      description: "Atender requisitos do Banco Central e órgãos reguladores",
      impact: "Crítico",
      keywords: ["compliance", "regulação", "auditoria"]
    },
    {
      id: "pain-6",
      title: "Detecção de Fraudes",
      description: "Identificar transações fraudulentas em tempo real",
      impact: "Crítico",
      keywords: ["fraude", "ML", "segurança"]
    }
  ],
  "Saúde e Ciências Biológicas": [
    {
      id: "pain-7",
      title: "Segurança de Dados de Pacientes",
      description: "Proteção de informações médicas sensíveis (HIPAA/LGPD)",
      impact: "Crítico",
      keywords: ["HIPAA", "LGPD", "privacidade"]
    },
    {
      id: "pain-8",
      title: "Análise de Imagens Médicas",
      description: "Processar e analisar grandes volumes de imagens diagnósticas",
      impact: "Alto",
      keywords: ["imaging", "AI", "diagnóstico"]
    }
  ],
  "Óleo e Gás": [
    {
      id: "pain-9",
      title: "IoT em Campo",
      description: "Monitorar equipamentos remotos em tempo real",
      impact: "Alto",
      keywords: ["IoT", "sensores", "manutenção preditiva"]
    },
    {
      id: "pain-10",
      title: "Análise Sísmica",
      description: "Processar dados sísmicos para exploração",
      impact: "Alto",
      keywords: ["HPC", "big data", "geofísica"]
    }
  ],
  "Manufatura": [
    {
      id: "pain-11",
      title: "Manutenção Preditiva",
      description: "Prever falhas em equipamentos antes que ocorram",
      impact: "Alto",
      keywords: ["IoT", "ML", "downtime"]
    },
    {
      id: "pain-12",
      title: "Otimização da Cadeia de Suprimentos",
      description: "Melhorar eficiência logística e reduzir custos",
      impact: "Alto",
      keywords: ["supply chain", "otimização", "logística"]
    }
  ],
  "Varejo e Bens de Consumo": [
    {
      id: "pain-13",
      title: "Escalabilidade em Períodos de Pico",
      description: "Lidar com picos de demanda durante eventos promocionais",
      impact: "Alto",
      keywords: ["escalabilidade", "performance", "black friday"]
    },
    {
      id: "pain-14",
      title: "Experiência Omnichannel",
      description: "Integrar experiência online e offline perfeitamente",
      impact: "Alto",
      keywords: ["omnichannel", "integração", "customer experience"]
    }
  ]
};

const mockRecommendations = {
  recommendations: [
    {
      title: "Arquitetura Serverless com Lambda e API Gateway",
      description: "Solução escalável que se ajusta automaticamente à demanda, ideal para cargas de trabalho variáveis",
      awsServices: ["AWS Lambda", "Amazon API Gateway", "Amazon DynamoDB"],
      marketSolutions: ["Serverless Framework", "AWS SAM"],
      score: 95,
      category: "migracao-modernizacao",
      painPoint: "Escalabilidade"
    },
    {
      title: "Proteção de Dados com AWS Security Hub",
      description: "Centralização de segurança e conformidade com visibilidade completa",
      awsServices: ["AWS Security Hub", "Amazon GuardDuty", "AWS WAF"],
      marketSolutions: ["CloudGuard", "Prisma Cloud"],
      score: 92,
      category: "seguranca",
      painPoint: "Segurança"
    },
    {
      title: "Data Lake com S3 e Athena",
      description: "Armazenamento escalável e análise de grandes volumes de dados",
      awsServices: ["Amazon S3", "AWS Glue", "Amazon Athena"],
      marketSolutions: ["Databricks", "Snowflake"],
      score: 90,
      category: "dados-analytics",
      painPoint: "Análise de Dados"
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
  console.log(`POST /api/recommendations - Industry: ${industry}, PainPoints: ${painPoints?.length}`);
  res.json(mockRecommendations);
});

app.post('/api/service-info', (req, res) => {
  const { serviceName, painPoint } = req.body;
  console.log(`POST /api/service-info - Service: ${serviceName}`);
  res.json({
    description: `${serviceName} é um serviço AWS gerenciado que oferece alta disponibilidade, escalabilidade e segurança para suas aplicações.`,
    reason: `Este serviço foi recomendado porque ajuda a resolver a dor: "${painPoint}". Ele oferece recursos específicos que atendem às necessidades identificadas.`,
    benefits: [
