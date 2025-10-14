const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

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
  "Varejo e Bens de Consumo": [
    { id: "pain-1", title: "Escalabilidade", description: "Lidar com picos de demanda", impact: "Alto", keywords: ["escalabilidade"] }
  ]
};

const mockRecommendations = {
  recommendations: [
    {
      title: "Arquitetura Serverless",
      description: "Solução escalável",
      awsServices: ["AWS Lambda", "API Gateway"],
      marketSolutions: ["Serverless Framework"],
      score: 95,
      category: "migracao-modernizacao",
      painPoint: "Escalabilidade"
    }
  ]
};

app.get('/api', function(req, res) {
  res.json({ status: 'ok', message: 'API is running', useMock: true });
});

app.get('/api/industries', function(req, res) {
  res.json(mockIndustries);
});

app.get('/api/pain-points/:industry', function(req, res) {
  var industry = req.params.industry;
  var painPoints = mockPainPoints[industry] || [];
  res.json({ painPoints: painPoints });
});

app.post('/api/recommendations', function(req, res) {
  res.json(mockRecommendations);
});

app.post('/api/service-info', function(req, res) {
  res.json({
    description: "Serviço AWS gerenciado",
    reason: "Resolve problemas de escalabilidade",
    benefits: ["Escalabilidade", "Segurança"],
    useCases: ["Aplicações empresariais"]
  });
});

app.post('/api/generate-architecture', function(req, res) {
  res.json({
    diagram: 'graph TB\n    User --> Service\n    Service --> Result',
    description: "Arquitetura AWS",
    dataFlow: ["Usuário acessa", "Serviços processam"],
    benefits: ["Escalável", "Seguro"],
    security: ["Criptografia", "IAM"]
  });
});

module.exports = app;
