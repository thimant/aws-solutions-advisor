const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const industries = ["Publicidade e Marketing", "Mídia e Entretenimento", "Serviços Financeiros", "Saúde e Ciências Biológicas", "Óleo e Gás", "Manufatura", "Varejo e Bens de Consumo"];

const painPoints = {
  "Publicidade e Marketing": [
    { id: "p1", title: "Análise de Dados em Tempo Real", description: "Processar grandes volumes de dados de campanhas", impact: "Alto", keywords: ["analytics", "big data"] },
    { id: "p2", title: "Personalização em Escala", description: "Criar experiências personalizadas", impact: "Alto", keywords: ["personalização", "ML"] }
  ],
  "Mídia e Entretenimento": [
    { id: "p3", title: "Streaming de Alta Qualidade", description: "Entregar conteúdo com baixa latência", impact: "Crítico", keywords: ["streaming", "CDN"] },
    { id: "p4", title: "Armazenamento de Conteúdo", description: "Gerenciar petabytes de mídia", impact: "Alto", keywords: ["storage", "arquivamento"] }
  ],
  "Serviços Financeiros": [
    { id: "p5", title: "Conformidade Regulatória", description: "Atender requisitos do Banco Central", impact: "Crítico", keywords: ["compliance", "regulação"] },
    { id: "p6", title: "Detecção de Fraudes", description: "Identificar transações fraudulentas", impact: "Crítico", keywords: ["fraude", "ML"] }
  ],
  "Saúde e Ciências Biológicas": [
    { id: "p7", title: "Segurança de Dados de Pacientes", description: "Proteção de informações médicas", impact: "Crítico", keywords: ["HIPAA", "LGPD"] },
    { id: "p8", title: "Análise de Imagens Médicas", description: "Processar imagens diagnósticas", impact: "Alto", keywords: ["imaging", "AI"] }
  ],
  "Óleo e Gás": [
    { id: "p9", title: "IoT em Campo", description: "Monitorar equipamentos remotos", impact: "Alto", keywords: ["IoT", "sensores"] },
    { id: "p10", title: "Análise Sísmica", description: "Processar dados sísmicos", impact: "Alto", keywords: ["HPC", "big data"] }
  ],
  "Manufatura": [
    { id: "p11", title: "Manutenção Preditiva", description: "Prever falhas em equipamentos", impact: "Alto", keywords: ["IoT", "ML"] },
    { id: "p12", title: "Otimização da Cadeia de Suprimentos", description: "Melhorar eficiência logística", impact: "Alto", keywords: ["supply chain", "otimização"] }
  ],
  "Varejo e Bens de Consumo": [
    { id: "p13", title: "Escalabilidade em Períodos de Pico", description: "Lidar com picos de demanda", impact: "Alto", keywords: ["escalabilidade", "performance"] },
    { id: "p14", title: "Experiência Omnichannel", description: "Integrar experiência online e offline", impact: "Alto", keywords: ["omnichannel", "integração"] }
  ]
};

const recommendations = [
  { title: "Arquitetura Serverless com Lambda", description: "Solução escalável que se ajusta automaticamente", awsServices: ["AWS Lambda", "API Gateway", "DynamoDB"], marketSolutions: ["Serverless Framework", "AWS SAM"], score: 95, category: "migracao-modernizacao", painPoint: "Escalabilidade" },
  { title: "Proteção de Dados com Security Hub", description: "Centralização de segurança", awsServices: ["Security Hub", "GuardDuty", "WAF"], marketSolutions: ["CloudGuard", "Prisma Cloud"], score: 92, category: "seguranca", painPoint: "Segurança" },
  { title: "Data Lake com S3 e Athena", description: "Armazenamento e análise de dados", awsServices: ["S3", "Glue", "Athena"], marketSolutions: ["Databricks", "Snowflake"], score: 90, category: "dados-analytics", painPoint: "Análise de Dados" }
];

app.get('/api', function(req, res) {
  res.json({ status: 'ok', useMock: true, timestamp: new Date().toISOString() });
});

app.get('/api/health', function(req, res) {
  res.json({ status: 'ok', message: 'AWS Solutions Advisor API', useMock: true, version: '1.0.0' });
});

app.get('/api/industries', function(req, res) {
  res.json({ industries: industries });
});

app.get('/api/pain-points/:industry', function(req, res) {
  var pts = painPoints[req.params.industry] || [];
  res.json({ painPoints: pts });
});

app.post('/api/recommendations', function(req, res) {
  res.json({ recommendations: recommendations });
});

app.post('/api/service-info', function(req, res) {
  var serviceName = req.body.serviceName || "AWS Service";
  var painPoint = req.body.painPoint || "problema";
  res.json({ 
    description: serviceName + " é um serviço AWS gerenciado que oferece alta disponibilidade e escalabilidade.",
    reason: "Este serviço foi recomendado porque ajuda a resolver: " + painPoint,
    benefits: ["Escalabilidade", "Alta disponibilidade", "Segurança", "Custo otimizado"],
    useCases: ["Aplicações empresariais", "Processamento de dados", "Analytics"]
  });
});

app.post('/api/generate-architecture', function(req, res) {
  var services = req.body.services || [];
  var title = req.body.title || "Arquitetura";
  res.json({ 
    diagram: 'graph TB\n    User["Usuario"] --> Service["AWS Services"]\n    Service --> Result["Resultado"]',
    description: "Arquitetura usando " + services.length + " serviços AWS para " + title,
    dataFlow: ["Usuário acessa a aplicação", "Serviços AWS processam os dados", "Resultado é entregue ao usuário"],
    benefits: ["Escalável", "Seguro", "Confiável", "Alta disponibilidade"],
    security: ["Criptografia em trânsito e repouso", "IAM para controle de acesso", "CloudTrail para auditoria", "VPC para isolamento de rede"]
  });
});

module.exports = app;
