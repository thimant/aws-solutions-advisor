const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const industries = ["Publicidade e Marketing", "Mídia e Entretenimento", "Serviços Financeiros", "Saúde e Ciências Biológicas", "Óleo e Gás", "Manufatura", "Varejo e Bens de Consumo"];

const painPoints = {
  "Publicidade e Marketing": [{ id: "p1", title: "Análise de Dados", description: "Processar dados", impact: "Alto", keywords: ["analytics"] }],
  "Mídia e Entretenimento": [{ id: "p2", title: "Streaming", description: "Baixa latência", impact: "Crítico", keywords: ["streaming"] }],
  "Serviços Financeiros": [{ id: "p3", title: "Conformidade", description: "Regulação", impact: "Crítico", keywords: ["compliance"] }],
  "Saúde e Ciências Biológicas": [{ id: "p4", title: "Segurança de Dados", description: "Proteção", impact: "Crítico", keywords: ["LGPD"] }],
  "Óleo e Gás": [{ id: "p5", title: "IoT", description: "Monitoramento", impact: "Alto", keywords: ["IoT"] }],
  "Manufatura": [{ id: "p6", title: "Manutenção Preditiva", description: "Prever falhas", impact: "Alto", keywords: ["ML"] }],
  "Varejo e Bens de Consumo": [{ id: "p7", title: "Escalabilidade", description: "Picos de demanda", impact: "Alto", keywords: ["escala"] }]
};

const recommendations = [
  { title: "Arquitetura Serverless", description: "Escalável", awsServices: ["Lambda", "API Gateway"], marketSolutions: ["Serverless Framework"], score: 95, category: "migracao-modernizacao", painPoint: "Escalabilidade" },
  { title: "AWS Security Hub", description: "Segurança", awsServices: ["Security Hub", "GuardDuty"], marketSolutions: ["CloudGuard"], score: 92, category: "seguranca", painPoint: "Segurança" }
];

app.get('/api', function(req, res) {
  res.json({ status: 'ok', useMock: true, timestamp: new Date().toISOString() });
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
  res.json({ description: "AWS Service", reason: "Solves problems", benefits: ["Scalable"], useCases: ["Enterprise"] });
});

app.post('/api/generate-architecture', function(req, res) {
  res.json({ diagram: 'graph TB\n A-->B', description: "Architecture", dataFlow: ["Step 1"], benefits: ["Scalable"], security: ["Encrypted"] });
});

module.exports = app;
