import { BedrockAgentRuntimeClient, RetrieveAndGenerateCommand } from '@aws-sdk/client-bedrock-agent-runtime';
import { mockIndustries, mockPainPoints, mockRecommendations } from './mockData.js';
import { config } from '../config.js';

const client = new BedrockAgentRuntimeClient({ 
  region: config.AWS_REGION
});

const KNOWLEDGE_BASE_ID = config.AWS_KNOWLEDGE_BASE_ID;
const USE_MOCK = config.USE_MOCK;
const MODEL_ARN = 'arn:aws:bedrock:us-east-1::foundation-model/anthropic.claude-3-haiku-20240307-v1:0';

// Função auxiliar para extrair JSON da resposta
function extractJSON(text) {
  try {
    // Tenta encontrar JSON entre ```json e ```
    const codeBlockMatch = text.match(/```json\s*([\s\S]*?)\s*```/);
    if (codeBlockMatch) {
      return JSON.parse(codeBlockMatch[1]);
    }
    
    // Tenta encontrar JSON entre ``` e ```
    const simpleCodeBlock = text.match(/```\s*([\s\S]*?)\s*```/);
    if (simpleCodeBlock) {
      const content = simpleCodeBlock[1].trim();
      if (content.startsWith('{')) {
        return JSON.parse(content);
      }
    }
    
    // Tenta encontrar qualquer objeto JSON
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    return null;
  } catch (error) {
    console.error('Erro ao fazer parse do JSON:', error.message);
    return null;
  }
}

export async function getRecommendations(industry, painPoints) {
  if (USE_MOCK) {
    console.log('Usando dados mock para recomendações');
    return mockRecommendations;
  }

  const prompt = `Para a indústria de ${industry}, quais soluções de TI ajudam com estas dores:
${painPoints.map((p, i) => `${i + 1}. ${p}`).join('\n')}

Responda em JSON:
{
  "recommendations": [
    {
      "title": "Nome da Solução",
      "description": "Como resolve",
      "awsServices": ["Serviço 1", "Serviço 2"],
      "marketSolutions": ["Solução 1", "Solução 2"],
      "score": 90,
      "category": "dados-analytics",
      "painPoint": "Dor"
    }
  ]
}

Categorias: dados-analytics, migracao-modernizacao, seguranca, banco-dados, ai-ml`;

  try {
    const command = new RetrieveAndGenerateCommand({
      input: {
        text: prompt
      },
      retrieveAndGenerateConfiguration: {
        type: 'KNOWLEDGE_BASE',
        knowledgeBaseConfiguration: {
          knowledgeBaseId: KNOWLEDGE_BASE_ID,
          modelArn: MODEL_ARN
        }
      }
    });

    const response = await client.send(command);
    const generatedText = response.output.text;
    console.log('Resposta do KB (recomendações):', generatedText.substring(0, 200));
    
    const parsed = extractJSON(generatedText);
    if (parsed && parsed.recommendations && parsed.recommendations.length > 0) {
      return parsed;
    }
    
    console.log('Resposta não contém recomendações válidas, usando fallback');
    return mockRecommendations;
  } catch (error) {
    console.error('Erro ao consultar Knowledge Base:', error);
    console.log('Usando dados mock como fallback');
    return mockRecommendations;
  }
}

export async function getIndustries() {
  if (USE_MOCK) {
    console.log('Usando dados mock para indústrias');
    return mockIndustries;
  }

  // Lista fixa baseada nos documentos disponíveis no S3
  const industries = {
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
  
  console.log('Retornando indústrias fixas baseadas nos documentos do S3');
  return industries;
}

export async function getPainPoints(industry) {
  if (USE_MOCK) {
    console.log(`Usando dados mock para dores da indústria: ${industry}`);
    return { painPoints: mockPainPoints[industry] || [] };
  }

  const prompt = `Quais são as principais dores de negócio da indústria de ${industry}? Liste em formato JSON:
{
  "painPoints": [
    {
      "id": "pain-1",
      "title": "Nome da dor",
      "description": "Descrição",
      "impact": "Alto",
      "keywords": ["palavra1", "palavra2"]
    }
  ]
}`;

  try {
    const command = new RetrieveAndGenerateCommand({
      input: { text: prompt },
      retrieveAndGenerateConfiguration: {
        type: 'KNOWLEDGE_BASE',
        knowledgeBaseConfiguration: {
          knowledgeBaseId: KNOWLEDGE_BASE_ID,
          modelArn: MODEL_ARN
        }
      }
    });

    const response = await client.send(command);
    console.log(`Resposta do KB (dores ${industry}):`, response.output.text.substring(0, 200));
    
    const parsed = extractJSON(response.output.text);
    if (parsed && parsed.painPoints && parsed.painPoints.length > 0) {
      return parsed;
    }
    
    console.log('Resposta não contém painPoints válidos, usando fallback');
    return { painPoints: mockPainPoints[industry] || [] };
  } catch (error) {
    console.error('Erro ao buscar dores:', error);
    console.log('Usando dados mock como fallback');
    return { painPoints: mockPainPoints[industry] || [] };
  }
}
