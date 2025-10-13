import express from 'express';
import { getRecommendations, getIndustries, getPainPoints } from '../services/knowledgeBaseService.js';
import { getServiceInfo } from '../data/awsServicesInfo.js';

const router = express.Router();

router.get('/industries', async (req, res) => {
  try {
    const data = await getIndustries();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar indústrias', details: error.message });
  }
});

router.get('/pain-points/:industry', async (req, res) => {
  try {
    const { industry } = req.params;
    const data = await getPainPoints(industry);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar dores de negócio', details: error.message });
  }
});

router.post('/recommendations', async (req, res) => {
  try {
    const { industry, painPoints } = req.body;
    
    if (!industry || !painPoints || painPoints.length === 0) {
      return res.status(400).json({ error: 'Indústria e dores de negócio são obrigatórios' });
    }
    
    const data = await getRecommendations(industry, painPoints);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao gerar recomendações', details: error.message });
  }
});

router.post('/service-info', async (req, res) => {
  try {
    const { serviceName, painPoint } = req.body;
    
    if (!serviceName) {
      return res.status(400).json({ error: 'Nome do serviço é obrigatório' });
    }
    
    const serviceInfo = getServiceInfo(serviceName);
    
    // Adiciona o motivo da recomendação
    const response = {
      ...serviceInfo,
      reason: `Este serviço foi recomendado porque ajuda a resolver a dor: "${painPoint}". ${serviceInfo.description}`
    };
    
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar informações do serviço', details: error.message });
  }
});

router.post('/generate-architecture', async (req, res) => {
  try {
    const { services, title, painPoint } = req.body;
    
    if (!services || services.length === 0) {
      return res.status(400).json({ error: 'Lista de serviços é obrigatória' });
    }
    
    // Gerar diagrama Well-Architected
    const diagram = generateWellArchitectedDiagram(services, title);
    
    // Gerar recomendações baseadas nos 6 pilares do Well-Architected Framework
    const wellArchitectedPillars = generateWellArchitectedRecommendations(services);
    
    // Gerar descrição e fluxo
    const architecture = {
      diagram: diagram,
      description: `Esta arquitetura de referência utiliza ${services.length} serviços AWS seguindo as melhores práticas do AWS Well-Architected Framework para resolver: "${painPoint}". A solução é projetada com foco em excelência operacional, segurança, confiabilidade, eficiência de performance, otimização de custos e sustentabilidade.`,
      dataFlow: generateDataFlow(services),
      wellArchitected: wellArchitectedPillars,
      benefits: [
        'Arquitetura em camadas seguindo padrões de design AWS',
        'Escalabilidade horizontal e vertical',
        'Alta disponibilidade com Multi-AZ',
        'Recuperação de desastres (DR) integrada',
        'Monitoramento proativo e observabilidade',
        'Segurança em profundidade (Defense in Depth)',
        'Otimização de custos com Right Sizing'
      ],
      security: [
        'Criptografia de dados em trânsito (TLS 1.2+) e em repouso (AES-256)',
        'Princípio do menor privilégio com IAM',
        'Logs centralizados com CloudTrail e CloudWatch',
        'Proteção contra DDoS com AWS Shield',
        'WAF para proteção de aplicações web',
        'Secrets Manager para credenciais',
        'VPC com subnets públicas e privadas',
        'Security Groups e NACLs configurados'
      ]
    };
    
    res.json(architecture);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao gerar arquitetura', details: error.message });
  }
});

function getServiceIcon(serviceName) {
  const serviceIcons = {
    'Lambda': '⚡',
    'S3': '🗄️',
    'DynamoDB': '🔷',
    'RDS': '🗃️',
    'API Gateway': '🚪',
    'CloudFront': '🌐',
    'QuickSight': '📊',
    'Athena': '🔍',
    'Redshift': '📈',
    'Kinesis': '🌊',
    'SageMaker': '🤖',
    'IoT Core': '📡',
    'Greengrass': '🔌',
    'WAF': '🛡️',
    'GuardDuty': '👁️',
    'Shield': '🔰',
    'CloudWatch': '📉',
    'SNS': '📢',
    'SQS': '📬',
    'EventBridge': '🔔',
    'Step Functions': '🔄',
    'ECS': '🐳',
    'EKS': '☸️',
    'EC2': '💻',
    'VPC': '🔒',
    'Route 53': '🗺️',
    'Cognito': '👤',
    'Secrets Manager': '🔐'
  };
  
  for (const [key, icon] of Object.entries(serviceIcons)) {
    if (serviceName.includes(key)) {
      return icon;
    }
  }
  return '☁️';
}

function generateWellArchitectedDiagram(services, title) {
  // Categorizar serviços por camada
  const layers = {
    presentation: [],
    application: [],
    data: [],
    security: [],
    monitoring: [],
    networking: []
  };
  
  services.forEach(service => {
    if (service.includes('CloudFront') || service.includes('Route 53') || service.includes('API Gateway')) {
      layers.presentation.push(service);
    } else if (service.includes('Lambda') || service.includes('ECS') || service.includes('EKS') || service.includes('EC2') || service.includes('Step Functions')) {
      layers.application.push(service);
    } else if (service.includes('S3') || service.includes('DynamoDB') || service.includes('RDS') || service.includes('Redshift') || service.includes('Athena')) {
      layers.data.push(service);
    } else if (service.includes('WAF') || service.includes('Shield') || service.includes('GuardDuty') || service.includes('Cognito') || service.includes('Secrets Manager')) {
      layers.security.push(service);
    } else if (service.includes('CloudWatch') || service.includes('X-Ray')) {
      layers.monitoring.push(service);
    } else if (service.includes('VPC') || service.includes('PrivateLink')) {
      layers.networking.push(service);
    } else {
      layers.application.push(service);
    }
  });
  
  // Criar diagrama com arquitetura em camadas
  let diagram = 'graph TB\n';
  diagram += '    subgraph Internet["🌐 Internet"]\n';
  diagram += '        User["👤 Usuário/Cliente"]\n';
  diagram += '    end\n\n';
  
  // Camada de Apresentação
  if (layers.presentation.length > 0) {
    diagram += '    subgraph Presentation["📱 Camada de Apresentação"]\n';
    layers.presentation.forEach((service, idx) => {
      const icon = getServiceIcon(service);
      const shortName = service.replace('Amazon ', '').replace('AWS ', '');
      diagram += `        P${idx}["${icon} ${shortName}"]\n`;
    });
    diagram += '    end\n\n';
  }
  
  // Camada de Aplicação
  if (layers.application.length > 0) {
    diagram += '    subgraph Application["⚙️ Camada de Aplicação"]\n';
    layers.application.forEach((service, idx) => {
      const icon = getServiceIcon(service);
      const shortName = service.replace('Amazon ', '').replace('AWS ', '');
      diagram += `        A${idx}["${icon} ${shortName}"]\n`;
    });
    diagram += '    end\n\n';
  }
  
  // Camada de Dados
  if (layers.data.length > 0) {
    diagram += '    subgraph Data["💾 Camada de Dados"]\n';
    layers.data.forEach((service, idx) => {
      const icon = getServiceIcon(service);
      const shortName = service.replace('Amazon ', '').replace('AWS ', '');
      diagram += `        D${idx}["${icon} ${shortName}"]\n`;
    });
    diagram += '    end\n\n';
  }
  
  // Camada de Segurança (cross-cutting)
  if (layers.security.length > 0) {
    diagram += '    subgraph Security["🔐 Segurança"]\n';
    layers.security.forEach((service, idx) => {
      const icon = getServiceIcon(service);
      const shortName = service.replace('Amazon ', '').replace('AWS ', '');
      diagram += `        S${idx}["${icon} ${shortName}"]\n`;
    });
    diagram += '    end\n\n';
  }
  
  // Camada de Monitoramento (cross-cutting)
  if (layers.monitoring.length > 0) {
    diagram += '    subgraph Monitoring["📊 Monitoramento"]\n';
    layers.monitoring.forEach((service, idx) => {
      const icon = getServiceIcon(service);
      const shortName = service.replace('Amazon ', '').replace('AWS ', '');
      diagram += `        M${idx}["${icon} ${shortName}"]\n`;
    });
    diagram += '    end\n\n';
  }
  
  // Conexões
  diagram += '    User -->|HTTPS| ';
  if (layers.presentation.length > 0) {
    diagram += 'P0\n';
    if (layers.security.length > 0) {
      diagram += '    S0 -.->|Protege| P0\n';
    }
    if (layers.application.length > 0) {
      diagram += '    P0 --> A0\n';
    }
  } else if (layers.application.length > 0) {
    diagram += 'A0\n';
  }
  
  if (layers.application.length > 0 && layers.data.length > 0) {
    diagram += '    A0 --> D0\n';
  }
  
  if (layers.monitoring.length > 0) {
    if (layers.application.length > 0) {
      diagram += '    A0 -.->|Logs/Métricas| M0\n';
    }
    if (layers.data.length > 0) {
      diagram += '    D0 -.->|Logs/Métricas| M0\n';
    }
  }
  
  // Estilos
  diagram += '\n    classDef presentationStyle fill:#FF9900,stroke:#232F3E,stroke-width:2px,color:#000\n';
  diagram += '    classDef applicationStyle fill:#FF9900,stroke:#232F3E,stroke-width:2px,color:#000\n';
  diagram += '    classDef dataStyle fill:#3F8624,stroke:#232F3E,stroke-width:2px,color:#fff\n';
  diagram += '    classDef securityStyle fill:#DD344C,stroke:#232F3E,stroke-width:2px,color:#fff\n';
  diagram += '    classDef monitoringStyle fill:#8C4FFF,stroke:#232F3E,stroke-width:2px,color:#fff\n';
  
  return diagram;
}

function generateMermaidDiagram(services, title) {
  // Mapeamento de serviços para ícones/emojis
  const serviceIcons = {
    'Lambda': '⚡',
    'S3': '🗄️',
    'DynamoDB': '🔷',
    'RDS': '🗃️',
    'API Gateway': '🚪',
    'CloudFront': '🌐',
    'QuickSight': '📊',
    'Athena': '🔍',
    'Redshift': '📈',
    'Kinesis': '🌊',
    'SageMaker': '🤖',
    'IoT Core': '📡',
    'Greengrass': '🔌',
    'WAF': '🛡️',
    'GuardDuty': '👁️',
    'Shield': '🔰',
    'CloudWatch': '📉',
    'SNS': '📢',
    'SQS': '📬',
    'EventBridge': '🔔',
    'Step Functions': '🔄',
    'ECS': '🐳',
    'EKS': '☸️',
    'EC2': '💻',
    'VPC': '🔒',
    'Route 53': '🗺️',
    'Cognito': '👤',
    'Secrets Manager': '🔐'
  };
  
  function getServiceIcon(serviceName) {
    for (const [key, icon] of Object.entries(serviceIcons)) {
      if (serviceName.includes(key)) {
        return icon;
      }
    }
    return '☁️';
  }
  
  // Criar diagrama Mermaid com layout mais visual
  let diagram = 'graph LR\n';
  diagram += '    User["👤<br/>Usuário"]\n';
  
  services.forEach((service, index) => {
    const nodeId = `S${index}`;
    const icon = getServiceIcon(service);
    const shortName = service.replace('Amazon ', '').replace('AWS ', '');
    diagram += `    ${nodeId}["${icon}<br/>${shortName}"]\n`;
    
    if (index === 0) {
      diagram += `    User -->|Requisição| ${nodeId}\n`;
    } else {
      diagram += `    S${index - 1} -->|Dados| ${nodeId}\n`;
    }
  });
  
  diagram += '    S' + (services.length - 1) + ' -->|Resposta| Result["✅<br/>Resultado"]\n';
  
  // Adicionar estilos com cores AWS
  diagram += '    style User fill:#232F3E,stroke:#FF9900,stroke-width:3px,color:#fff\n';
  diagram += '    style Result fill:#1E8900,stroke:#FF9900,stroke-width:3px,color:#fff\n';
  
  services.forEach((service, index) => {
    const nodeId = `S${index}`;
    // Cores baseadas no tipo de serviço
    if (service.includes('Lambda') || service.includes('API Gateway')) {
      diagram += `    style ${nodeId} fill:#FF9900,stroke:#232F3E,stroke-width:2px,color:#000\n`;
    } else if (service.includes('S3') || service.includes('DynamoDB') || service.includes('RDS')) {
      diagram += `    style ${nodeId} fill:#3F8624,stroke:#232F3E,stroke-width:2px,color:#fff\n`;
    } else if (service.includes('QuickSight') || service.includes('Athena') || service.includes('Redshift')) {
      diagram += `    style ${nodeId} fill:#8C4FFF,stroke:#232F3E,stroke-width:2px,color:#fff\n`;
    } else if (service.includes('SageMaker') || service.includes('AI') || service.includes('ML')) {
      diagram += `    style ${nodeId} fill:#01A88D,stroke:#232F3E,stroke-width:2px,color:#fff\n`;
    } else if (service.includes('WAF') || service.includes('Shield') || service.includes('GuardDuty')) {
      diagram += `    style ${nodeId} fill:#DD344C,stroke:#232F3E,stroke-width:2px,color:#fff\n`;
    } else {
      diagram += `    style ${nodeId} fill:#527FFF,stroke:#232F3E,stroke-width:2px,color:#fff\n`;
    }
  });
  
  return diagram;
}

function generateWellArchitectedRecommendations(services) {
  const pillars = {
    operational: {
      title: '🔧 Excelência Operacional',
      recommendations: [
        'Implementar Infrastructure as Code (IaC) com CloudFormation ou Terraform',
        'Automatizar deploys com CI/CD (CodePipeline, CodeBuild)',
        'Usar tags para organização e rastreamento de recursos',
        'Implementar runbooks e playbooks para operações comuns'
      ]
    },
    security: {
      title: '🔐 Segurança',
      recommendations: [
        'Habilitar MFA para todos os usuários IAM',
        'Usar AWS Organizations para governança multi-conta',
        'Implementar AWS Config para auditoria de conformidade',
        'Rotacionar credenciais regularmente com Secrets Manager'
      ]
    },
    reliability: {
      title: '🛡️ Confiabilidade',
      recommendations: [
        'Distribuir recursos em múltiplas Availability Zones',
        'Implementar health checks e auto-healing',
        'Configurar backups automáticos e testes de recuperação',
        'Usar Route 53 para failover automático'
      ]
    },
    performance: {
      title: '⚡ Eficiência de Performance',
      recommendations: [
        'Usar CloudFront para cache e distribuição global',
        'Implementar ElastiCache para cache de dados',
        'Otimizar queries de banco de dados',
        'Usar instâncias apropriadas para cada workload'
      ]
    },
    cost: {
      title: '💰 Otimização de Custos',
      recommendations: [
        'Implementar Auto Scaling para ajustar capacidade',
        'Usar Reserved Instances ou Savings Plans',
        'Configurar AWS Budgets e Cost Anomaly Detection',
        'Revisar e remover recursos não utilizados'
      ]
    },
    sustainability: {
      title: '🌱 Sustentabilidade',
      recommendations: [
        'Usar regiões AWS com energia renovável',
        'Otimizar utilização de recursos para reduzir pegada de carbono',
        'Implementar arquitetura serverless quando possível',
        'Usar instâncias Graviton para melhor eficiência energética'
      ]
    }
  };
  
  // Adicionar recomendações específicas baseadas nos serviços
  if (services.some(s => s.includes('Lambda'))) {
    pillars.cost.recommendations.push('Otimizar memória e timeout do Lambda para reduzir custos');
    pillars.sustainability.recommendations.push('Lambda já é serverless - excelente para sustentabilidade');
  }
  
  if (services.some(s => s.includes('RDS') || s.includes('DynamoDB'))) {
    pillars.reliability.recommendations.push('Habilitar backups automáticos e Point-in-Time Recovery');
    pillars.performance.recommendations.push('Usar Read Replicas para distribuir carga de leitura');
  }
  
  if (services.some(s => s.includes('S3'))) {
    pillars.cost.recommendations.push('Usar S3 Intelligent-Tiering para otimização automática');
    pillars.security.recommendations.push('Habilitar S3 Block Public Access e versionamento');
  }
  
  return pillars;
}

function generateDataFlow(services) {
  const flow = [
    'Usuário acessa a aplicação através da interface',
  ];
  
  services.forEach((service, index) => {
    if (service.includes('API Gateway') || service.includes('Lambda')) {
      flow.push(`${service} processa as requisições de forma serverless`);
    } else if (service.includes('S3')) {
      flow.push(`${service} armazena dados de forma durável e escalável`);
    } else if (service.includes('DynamoDB') || service.includes('RDS')) {
      flow.push(`${service} gerencia o armazenamento de dados transacionais`);
    } else if (service.includes('CloudFront')) {
      flow.push(`${service} distribui conteúdo globalmente com baixa latência`);
    } else if (service.includes('QuickSight') || service.includes('Athena')) {
      flow.push(`${service} fornece análises e insights dos dados`);
    } else {
      flow.push(`${service} processa e transforma os dados`);
    }
  });
  
  flow.push('Resultado é entregue ao usuário de forma segura e eficiente');
  
  return flow;
}

export default router;
