// Mock data para testes sem Knowledge Base
export const mockIndustries = {
  industries: [
    "Varejo",
    "Financeiro",
    "Saúde",
    "Manufatura",
    "Educação",
    "Telecomunicações",
    "Energia",
    "Governo"
  ]
};

export const mockPainPoints = {
  "Varejo": [
    {
      id: "retail-1",
      title: "Escalabilidade em períodos de pico",
      description: "Dificuldade em lidar com aumento de tráfego durante Black Friday e datas comemorativas",
      impact: "Alto",
      keywords: ["escalabilidade", "performance", "disponibilidade"]
    },
    {
      id: "retail-2",
      title: "Análise de dados de clientes",
      description: "Necessidade de processar grandes volumes de dados para personalização",
      impact: "Alto",
      keywords: ["analytics", "big data", "personalização"]
    },
    {
      id: "retail-3",
      title: "Segurança de pagamentos",
      description: "Garantir conformidade PCI-DSS e proteção de dados de cartão",
      impact: "Crítico",
      keywords: ["segurança", "compliance", "PCI-DSS"]
    }
  ],
  "Financeiro": [
    {
      id: "finance-1",
      title: "Conformidade regulatória",
      description: "Atender requisitos de LGPD, BACEN e outras regulamentações",
      impact: "Crítico",
      keywords: ["compliance", "regulatório", "LGPD"]
    },
    {
      id: "finance-2",
      title: "Detecção de fraudes",
      description: "Identificar transações fraudulentas em tempo real",
      impact: "Alto",
      keywords: ["fraude", "machine learning", "tempo real"]
    },
    {
      id: "finance-3",
      title: "Disaster Recovery",
      description: "Garantir continuidade de negócios e recuperação rápida",
      impact: "Crítico",
      keywords: ["DR", "backup", "continuidade"]
    }
  ]
};

export const mockRecommendations = {
  recommendations: [
    {
      title: "Arquitetura Serverless com Auto Scaling",
      description: "Utilize AWS Lambda e API Gateway para escalar automaticamente durante picos de demanda, pagando apenas pelo uso real",
      awsServices: ["AWS Lambda", "API Gateway", "DynamoDB", "CloudFront"],
      marketSolutions: ["Serverless Framework", "AWS SAM", "Terraform"],
      score: 95,
      category: "migracao-modernizacao",
      painPoint: "Escalabilidade em períodos de pico"
    },
    {
      title: "Data Lake com Analytics em Tempo Real",
      description: "Construa um data lake com S3 e processe dados em tempo real com Kinesis para insights instantâneos",
      awsServices: ["Amazon S3", "Kinesis Data Streams", "Athena", "QuickSight"],
      marketSolutions: ["Apache Kafka", "Databricks", "Snowflake"],
      score: 92,
      category: "dados-analytics",
      painPoint: "Análise de dados de clientes"
    },
    {
      title: "Segurança Multi-Camadas com WAF",
      description: "Implemente WAF, Shield e GuardDuty para proteção abrangente contra ameaças",
      awsServices: ["AWS WAF", "Shield Advanced", "GuardDuty", "Security Hub"],
      marketSolutions: ["Cloudflare", "Akamai", "Imperva"],
      score: 98,
      category: "seguranca",
      painPoint: "Segurança de pagamentos"
    },
    {
      title: "Machine Learning para Detecção de Fraudes",
      description: "Use SageMaker para treinar modelos de ML que identificam padrões fraudulentos",
      awsServices: ["Amazon SageMaker", "Fraud Detector", "Lambda", "EventBridge"],
      marketSolutions: ["DataRobot", "H2O.ai", "Kount"],
      score: 94,
      category: "ai-ml",
      painPoint: "Detecção de fraudes"
    },
    {
      title: "Estratégia de Backup Multi-Região",
      description: "Configure replicação cross-region e backup automatizado para garantir RPO/RTO baixos",
      awsServices: ["AWS Backup", "S3 Cross-Region Replication", "RDS Multi-AZ", "Route 53"],
      marketSolutions: ["Veeam", "Commvault", "Rubrik"],
      score: 96,
      category: "banco-dados",
      painPoint: "Disaster Recovery"
    }
  ]
};
