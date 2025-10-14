const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const industries = ["Publicidade e Marketing", "Mídia e Entretenimento", "Serviços Financeiros", "Saúde e Ciências Biológicas", "Óleo e Gás", "Manufatura", "Varejo e Bens de Consumo"];

const painPoints = {
  "Varejo e Bens de Consumo": [{ id: "p1", title: "Escalabilidade", description: "Picos de demanda", impact: "Alto", keywords: ["escala"] }]
};

const recommendations = [{ title: "Serverless", description: "Escalável", awsServices: ["Lambda"], marketSolutions: ["Serverless Framework"], score: 95, category: "migracao-modernizacao", painPoint: "Escalabilidade" }];

app.get('/api', function(req, res) {
  res.json({ status: 'ok', useMock: true });
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
