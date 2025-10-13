// Dicionário de informações sobre serviços AWS
export const awsServicesInfo = {
  'Amazon QuickSight': {
    description: 'Amazon QuickSight é um serviço de Business Intelligence (BI) nativo da nuvem que permite criar visualizações interativas, realizar análises ad-hoc e obter insights de negócios a partir de seus dados.',
    benefits: [
      'Visualizações interativas e dashboards em tempo real',
      'Machine Learning integrado para insights automáticos',
      'Escalabilidade para milhões de usuários',
      'Integração nativa com fontes de dados AWS',
      'Acesso via mobile e web'
    ],
    useCases: [
      'Dashboards executivos e operacionais',
      'Análise de métricas de negócio',
      'Relatórios self-service para usuários',
      'Análise preditiva com ML'
    ]
  },
  'Amazon Athena': {
    description: 'Amazon Athena é um serviço de consulta interativa que facilita a análise de dados no Amazon S3 usando SQL padrão, sem necessidade de infraestrutura.',
    benefits: [
      'Consultas SQL direto no S3',
      'Sem servidor - pague apenas pelas consultas executadas',
      'Integração com AWS Glue Data Catalog',
      'Suporte para formatos Parquet, ORC, JSON, CSV',
      'Resultados em segundos'
    ],
    useCases: [
      'Análise de logs e dados não estruturados',
      'Consultas ad-hoc em data lakes',
      'Análise de dados de clickstream',
      'Processamento de dados de IoT'
    ]
  },
  'Amazon Redshift': {
    description: 'Amazon Redshift é um data warehouse totalmente gerenciado que permite analisar petabytes de dados usando SQL e ferramentas de BI existentes.',
    benefits: [
      'Performance até 10x mais rápida que data warehouses tradicionais',
      'Escalabilidade de gigabytes a petabytes',
      'Integração com ferramentas de BI populares',
      'Criptografia de dados em repouso e em trânsito',
      'Backup automático e recuperação'
    ],
    useCases: [
      'Data warehousing empresarial',
      'Análise de grandes volumes de dados',
      'Consolidação de dados de múltiplas fontes',
      'Relatórios e analytics complexos'
    ]
  },
  'AWS IoT Core': {
    description: 'AWS IoT Core é um serviço gerenciado que permite conectar dispositivos IoT à nuvem de forma segura e processar mensagens de bilhões de dispositivos.',
    benefits: [
      'Conectividade segura para bilhões de dispositivos',
      'Processamento de mensagens em tempo real',
      'Integração com outros serviços AWS',
      'Regras para roteamento de mensagens',
      'Gerenciamento de dispositivos em escala'
    ],
    useCases: [
      'Monitoramento de equipamentos industriais',
      'Smart cities e infraestrutura conectada',
      'Dispositivos wearables e saúde',
      'Automação residencial e predial'
    ]
  },
  'AWS Lambda': {
    description: 'AWS Lambda é um serviço de computação serverless que executa código em resposta a eventos, gerenciando automaticamente os recursos computacionais.',
    benefits: [
      'Sem servidores para gerenciar',
      'Escalabilidade automática',
      'Pagamento apenas pelo tempo de execução',
      'Integração com 200+ serviços AWS',
      'Suporte para múltiplas linguagens'
    ],
    useCases: [
      'Processamento de dados em tempo real',
      'APIs e backends serverless',
      'Automação de tarefas',
      'Processamento de arquivos e imagens'
    ]
  },
  'Amazon S3': {
    description: 'Amazon S3 (Simple Storage Service) é um serviço de armazenamento de objetos que oferece escalabilidade, disponibilidade de dados, segurança e performance.',
    benefits: [
      'Durabilidade de 99.999999999% (11 noves)',
      'Escalabilidade ilimitada',
      'Classes de armazenamento para otimização de custos',
      'Versionamento e proteção de dados',
      'Integração com análise e ML'
    ],
    useCases: [
      'Data lakes e big data analytics',
      'Backup e recuperação de desastres',
      'Armazenamento de conteúdo e mídia',
      'Arquivamento de longo prazo'
    ]
  },
  'Amazon Kinesis Data Streams': {
    description: 'Amazon Kinesis Data Streams é um serviço para coletar e processar grandes fluxos de dados em tempo real.',
    benefits: [
      'Processamento de streaming em tempo real',
      'Escalabilidade elástica',
      'Durabilidade e replicação de dados',
      'Integração com analytics e ML',
      'Baixa latência'
    ],
    useCases: [
      'Análise de logs em tempo real',
      'Processamento de eventos de IoT',
      'Análise de clickstream',
      'Detecção de fraudes em tempo real'
    ]
  },
  'AWS Greengrass': {
    description: 'AWS IoT Greengrass estende os recursos da AWS para dispositivos edge, permitindo executar computação local, mensagens e sincronização de dados.',
    benefits: [
      'Execução local de código Lambda',
      'Operação offline e sincronização',
      'ML inference no edge',
      'Segurança de dispositivos',
      'Gerenciamento remoto'
    ],
    useCases: [
      'Manufatura inteligente',
      'Veículos conectados',
      'Automação industrial',
      'Processamento local de dados'
    ]
  },
  'Amazon SageMaker': {
    description: 'Amazon SageMaker é um serviço totalmente gerenciado para construir, treinar e implantar modelos de machine learning em escala.',
    benefits: [
      'Notebooks Jupyter integrados',
      'Algoritmos otimizados e pré-construídos',
      'Treinamento distribuído automático',
      'Deploy com um clique',
      'MLOps integrado'
    ],
    useCases: [
      'Previsão de demanda',
      'Detecção de anomalias',
      'Personalização de recomendações',
      'Análise preditiva'
    ]
  },
  'AWS WAF': {
    description: 'AWS WAF (Web Application Firewall) protege aplicações web contra exploits comuns que podem afetar disponibilidade, comprometer segurança ou consumir recursos excessivos.',
    benefits: [
      'Proteção contra ataques OWASP Top 10',
      'Regras personalizáveis',
      'Integração com CloudFront e ALB',
      'Monitoramento em tempo real',
      'Bloqueio automático de IPs maliciosos'
    ],
    useCases: [
      'Proteção de APIs e aplicações web',
      'Prevenção de DDoS',
      'Bloqueio de bots maliciosos',
      'Conformidade de segurança'
    ]
  },
  'Amazon RDS': {
    description: 'Amazon RDS (Relational Database Service) facilita configurar, operar e escalar bancos de dados relacionais na nuvem.',
    benefits: [
      'Gerenciamento automatizado',
      'Backup e recuperação automáticos',
      'Alta disponibilidade com Multi-AZ',
      'Escalabilidade vertical e horizontal',
      'Suporte para MySQL, PostgreSQL, Oracle, SQL Server'
    ],
    useCases: [
      'Aplicações web e mobile',
      'E-commerce',
      'Sistemas ERP e CRM',
      'Aplicações empresariais'
    ]
  },
  'Amazon DynamoDB': {
    description: 'Amazon DynamoDB é um banco de dados NoSQL totalmente gerenciado que oferece performance rápida e previsível com escalabilidade perfeita.',
    benefits: [
      'Performance de milissegundos em qualquer escala',
      'Escalabilidade automática',
      'Backup e restauração point-in-time',
      'Criptografia em repouso',
      'Replicação global'
    ],
    useCases: [
      'Aplicações mobile e web',
      'Gaming',
      'IoT',
      'Catálogos de produtos'
    ]
  }
};

export function getServiceInfo(serviceName) {
  // Tenta encontrar o serviço exato
  if (awsServicesInfo[serviceName]) {
    return awsServicesInfo[serviceName];
  }
  
  // Tenta encontrar por correspondência parcial
  const serviceKey = Object.keys(awsServicesInfo).find(key => 
    serviceName.toLowerCase().includes(key.toLowerCase()) || 
    key.toLowerCase().includes(serviceName.toLowerCase())
  );
  
  if (serviceKey) {
    return awsServicesInfo[serviceKey];
  }
  
  // Retorna informação genérica
  return {
    description: `${serviceName} é um serviço gerenciado da AWS que oferece recursos escaláveis e seguros para suas aplicações em nuvem.`,
    benefits: [
      'Escalabilidade automática',
      'Alta disponibilidade',
      'Segurança integrada',
      'Pagamento conforme o uso',
      'Integração com ecossistema AWS'
    ],
    useCases: [
      'Aplicações empresariais',
      'Processamento de dados',
      'Soluções em nuvem',
      'Modernização de infraestrutura'
    ]
  };
}
