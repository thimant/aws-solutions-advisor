const industries = [
  "E-commerce", "Fintech", "Healthcare", "Educação",
  "Mídia e Entretenimento", "IoT e Manufatura", "Governo",
  "Varejo", "Logística", "Telecomunicações"
];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  res.status(200).json({ industries });
}
