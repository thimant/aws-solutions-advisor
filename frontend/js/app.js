// Configuração da API - detecta automaticamente se está em produção ou local
const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000/api' 
    : '/api';

let selectedIndustry = '';
let selectedPainPoints = [];
let painPointsData = [];

// Inicialização
document.addEventListener('DOMContentLoaded', async () => {
    await loadIndustries();
    setupEventListeners();
});

function setupEventListeners() {
    document.getElementById('industrySelect').addEventListener('change', handleIndustryChange);
    document.getElementById('generateButton').addEventListener('click', generateRecommendations);
}

async function loadIndustries() {
    try {
        const response = await fetch(`${API_URL}/industries`);
        const data = await response.json();
        
        const select = document.getElementById('industrySelect');
        data.industries.forEach(industry => {
            const option = document.createElement('option');
            option.value = industry;
            option.textContent = industry;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao carregar indústrias:', error);
        alert('Erro ao carregar indústrias. Verifique se o backend está rodando.');
    }
}

async function handleIndustryChange(event) {
    selectedIndustry = event.target.value;
    
    if (!selectedIndustry) {
        document.getElementById('painPointsSection').classList.add('hidden');
        return;
    }
    
    await loadPainPoints(selectedIndustry);
}

async function loadPainPoints(industry) {
    try {
        const response = await fetch(`${API_URL}/pain-points/${encodeURIComponent(industry)}`);
        const data = await response.json();
        
        painPointsData = data.painPoints;
        renderPainPoints(data.painPoints);
        
        document.getElementById('painPointsSection').classList.remove('hidden');
    } catch (error) {
        console.error('Erro ao carregar dores:', error);
        alert('Erro ao carregar dores de negócio.');
    }
}

function renderPainPoints(painPoints) {
    const grid = document.getElementById('painPointsGrid');
    grid.innerHTML = '';
    
    painPoints.forEach(pain => {
        const card = document.createElement('div');
        card.className = 'pain-point-card';
        card.innerHTML = `
            <label>
                <input type="checkbox" value="${pain.id}" onchange="handlePainPointSelection()">
                ${pain.title}
            </label>
        `;
        
        card.addEventListener('click', (e) => {
            if (e.target.tagName !== 'INPUT') {
                showPainPointModal(pain);
            }
        });
        
        grid.appendChild(card);
    });
}

function handlePainPointSelection() {
    const checkboxes = document.querySelectorAll('#painPointsGrid input[type="checkbox"]:checked');
    selectedPainPoints = Array.from(checkboxes).map(cb => cb.value);
    
    const button = document.getElementById('generateButton');
    if (selectedPainPoints.length > 0) {
        button.classList.remove('hidden');
    } else {
        button.classList.add('hidden');
    }
}

async function generateRecommendations() {
    const loading = document.getElementById('loading');
    const grid = document.getElementById('recommendationsGrid');
    const section = document.getElementById('recommendationsSection');
    
    loading.classList.remove('hidden');
    grid.innerHTML = '';
    section.classList.remove('hidden');
    
    try {
        const painPointTitles = selectedPainPoints.map(id => {
            const pain = painPointsData.find(p => p.id === id);
            return pain ? pain.title : id;
        });
        
        const response = await fetch(`${API_URL}/recommendations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                industry: selectedIndustry,
                painPoints: painPointTitles
            })
        });
        
        const data = await response.json();
        loading.classList.add('hidden');
        
        renderRecommendations(data.recommendations);
    } catch (error) {
        console.error('Erro ao gerar recomendações:', error);
        loading.classList.add('hidden');
        alert('Erro ao gerar recomendações.');
    }
}

function renderRecommendations(recommendations) {
    const grid = document.getElementById('recommendationsGrid');
    grid.innerHTML = '';
    
    if (!recommendations || recommendations.length === 0) {
        grid.innerHTML = '<p>Nenhuma recomendação encontrada.</p>';
        return;
    }
    
    console.log('Renderizando recomendações:', recommendations);
    
    recommendations.forEach(rec => {
        console.log('Serviços AWS:', rec.awsServices);
        const card = document.createElement('div');
        card.className = 'recommendation-card';
        
        const categoryClass = rec.category || 'default';
        
        card.innerHTML = `
            <div class="score">Score: ${rec.score}</div>
            <div class="category-badge ${categoryClass}">${getCategoryName(rec.category)}</div>
            <h3>${rec.title}</h3>
            <p><strong>Dor:</strong> ${rec.painPoint}</p>
            <p>${rec.description}</p>
            
            ${rec.awsServices && rec.awsServices.length > 0 ? `
                <div class="aws-services">
                    <h4>🔧 Serviços AWS:</h4>
                    <ul>
                        ${rec.awsServices.map((service, idx) => {
                            const serviceEscaped = service.replace(/"/g, '&quot;');
                            const painEscaped = rec.painPoint.replace(/"/g, '&quot;');
                            return `
                            <li>
                                <span>• ${service}</span>
                                <button class="info-button" data-service="${serviceEscaped}" data-pain="${painEscaped}" data-idx="${idx}">ℹ️</button>
                            </li>
                            `;
                        }).join('')}
                    </ul>
                </div>
            ` : ''}
            
            ${rec.marketSolutions && rec.marketSolutions.length > 0 ? `
                <div class="market-solutions">
                    <h4>💼 Soluções de Mercado:</h4>
                    <ul>
                        ${rec.marketSolutions.map(solution => `<li>• ${solution}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
            
            ${rec.awsServices && rec.awsServices.length > 0 ? `
                <div class="architecture-section">
                    <button class="architecture-button" data-services='${JSON.stringify(rec.awsServices)}' data-title="${rec.title.replace(/"/g, '&quot;')}" data-pain="${rec.painPoint.replace(/"/g, '&quot;')}">
                        🏗️ Ver Arquitetura de Referência
                    </button>
                </div>
            ` : ''}
        `;
        
        grid.appendChild(card);
    });
    
    // Adicionar event listeners aos botões de informação
    const infoButtons = document.querySelectorAll('.info-button');
    console.log('Botões de informação encontrados:', infoButtons.length);
    
    infoButtons.forEach((button, index) => {
        console.log(`Botão ${index}:`, button.getAttribute('data-service'));
        button.addEventListener('click', function() {
            const serviceName = this.getAttribute('data-service');
            const painPoint = this.getAttribute('data-pain');
            console.log('Botão clicado:', serviceName, painPoint);
            window.showServiceInfo(serviceName, painPoint);
        });
    });
    
    // Adicionar event listeners aos botões de arquitetura
    const archButtons = document.querySelectorAll('.architecture-button');
    console.log('Botões de arquitetura encontrados:', archButtons.length);
    
    archButtons.forEach((button, index) => {
        console.log(`Botão arquitetura ${index}:`, button.getAttribute('data-title'));
        button.addEventListener('click', function() {
            console.log('Botão de arquitetura clicado!');
            try {
                const servicesStr = this.getAttribute('data-services');
                console.log('Services string:', servicesStr);
                const services = JSON.parse(servicesStr);
                const title = this.getAttribute('data-title');
                const painPoint = this.getAttribute('data-pain');
                console.log('Gerando arquitetura para:', services, title);
                window.showArchitecture(services, title, painPoint);
            } catch (error) {
                console.error('Erro ao processar clique:', error);
            }
        });
    });
}

function getCategoryName(category) {
    const categories = {
        'dados-analytics': 'Dados & Analytics',
        'migracao-modernizacao': 'Migração & Modernização',
        'seguranca': 'Segurança',
        'banco-dados': 'Banco de Dados',
        'ai-ml': 'AI/ML',
        'default': 'Geral'
    };
    return categories[category] || categories['default'];
}

function showPainPointModal(pain) {
    const modal = document.getElementById('painModal');
    document.getElementById('modalTitle').textContent = pain.title;
    document.getElementById('modalDescription').textContent = pain.description;
    document.getElementById('modalImpactLevel').textContent = pain.impact;
    
    const keywordsDiv = document.getElementById('modalKeywords');
    keywordsDiv.innerHTML = pain.keywords.map(kw => 
        `<span class="category-badge default">${kw}</span>`
    ).join(' ');
    
    document.getElementById('modalImpactDetails').textContent = 
        `Esta dor tem impacto ${pain.impact.toLowerCase()} no negócio e afeta diretamente: ${pain.keywords.join(', ')}`;
    
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('painModal').style.display = 'none';
}

function switchTab(tabName) {
    document.querySelectorAll('.modal-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    event.target.classList.add('active');
    document.getElementById(tabName).classList.add('active');
}

window.showServiceInfo = async function(serviceName, painPoint) {
    console.log('showServiceInfo chamada:', serviceName, painPoint);
    
    const modal = document.getElementById('serviceModal');
    const title = document.getElementById('serviceModalTitle');
    const content = document.getElementById('serviceModalContent');
    
    if (!modal) {
        console.error('Modal serviceModal não encontrado!');
        return;
    }
    
    title.textContent = serviceName;
    content.innerHTML = '<p>Carregando informações...</p>';
    modal.style.display = 'block';
    
    try {
        console.log('Fazendo requisição para:', `${API_URL}/service-info`);
        // Buscar informações do serviço via API
        const response = await fetch(`${API_URL}/service-info`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                serviceName: serviceName,
                painPoint: painPoint
            })
        });
        
        console.log('Resposta recebida:', response.status);
        
        const data = await response.json();
        
        content.innerHTML = `
            <div class="service-info">
                <h3>📋 O que é?</h3>
                <p>${data.description || 'Serviço AWS para soluções em nuvem.'}</p>
                
                <h3>🎯 Por que foi recomendado?</h3>
                <p>${data.reason || `Este serviço ajuda a resolver a dor: "${painPoint}"`}</p>
                
                <h3>✨ Principais Benefícios</h3>
                <ul>
                    ${(data.benefits || ['Escalabilidade', 'Alta disponibilidade', 'Segurança']).map(b => `<li>• ${b}</li>`).join('')}
                </ul>
                
                <h3>🔗 Casos de Uso</h3>
                <ul>
                    ${(data.useCases || ['Aplicações empresariais', 'Processamento de dados']).map(u => `<li>• ${u}</li>`).join('')}
                </ul>
            </div>
        `;
    } catch (error) {
        console.error('Erro ao buscar informações do serviço:', error);
        content.innerHTML = `
            <div class="service-info">
                <h3>📋 ${serviceName}</h3>
                <p>Serviço AWS recomendado para resolver: <strong>${painPoint}</strong></p>
                <p>Este serviço oferece recursos de nuvem escaláveis e seguros para atender às necessidades do seu negócio.</p>
                <p><a href="https://aws.amazon.com/pt/products/" target="_blank">Ver documentação AWS →</a></p>
            </div>
        `;
    }
}

window.closeServiceModal = function() {
    document.getElementById('serviceModal').style.display = 'none';
}

window.closeArchitectureModal = function() {
    document.getElementById('architectureModal').style.display = 'none';
}

window.showArchitecture = async function(services, title, painPoint) {
    console.log('showArchitecture chamada:', services, title);
    
    const modal = document.getElementById('architectureModal');
    const modalTitle = document.getElementById('architectureModalTitle');
    const diagramDiv = document.getElementById('architectureDiagram');
    const descriptionDiv = document.getElementById('architectureDescription');
    
    if (!modal) {
        console.error('Modal architectureModal não encontrado!');
        return;
    }
    
    modalTitle.textContent = `Arquitetura: ${title}`;
    diagramDiv.innerHTML = '<p>Gerando arquitetura...</p>';
    descriptionDiv.innerHTML = '';
    modal.style.display = 'block';
    
    try {
        // Buscar arquitetura via API
        const response = await fetch(`${API_URL}/generate-architecture`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                services: services,
                title: title,
                painPoint: painPoint
            })
        });
        
        const data = await response.json();
        console.log('Arquitetura recebida:', data);
        
        // Renderizar diagrama Mermaid
        const diagramId = 'mermaid-' + Date.now();
        diagramDiv.innerHTML = `<div class="mermaid" id="${diagramId}">${data.diagram}</div>`;
        
        // Renderizar com Mermaid
        await mermaid.run({
            nodes: document.querySelectorAll(`#${diagramId}`)
        });
        
        // Adicionar descrição
        descriptionDiv.innerHTML = `
            <div class="architecture-info">
                <div class="well-architected-badge">
                    <h3>🏆 AWS Well-Architected Framework</h3>
                    <p>Esta arquitetura segue as melhores práticas dos 6 pilares do Well-Architected Framework</p>
                </div>
                
                <h3>📋 Descrição da Arquitetura</h3>
                <p>${data.description}</p>
                
                <h3>🔄 Fluxo de Dados</h3>
                <ol>
                    ${data.dataFlow.map(step => `<li>${step}</li>`).join('')}
                </ol>
                
                ${data.wellArchitected ? `
                    <h3>🏛️ Pilares do Well-Architected Framework</h3>
                    <div class="pillars-grid">
                        ${Object.values(data.wellArchitected).map(pillar => `
                            <div class="pillar-card">
                                <h4>${pillar.title}</h4>
                                <ul>
                                    ${pillar.recommendations.slice(0, 3).map(rec => `<li>• ${rec}</li>`).join('')}
                                </ul>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
                
                <h3>✨ Benefícios desta Arquitetura</h3>
                <ul>
                    ${data.benefits.map(benefit => `<li>• ${benefit}</li>`).join('')}
                </ul>
                
                <h3>🔐 Considerações de Segurança</h3>
                <ul>
                    ${data.security.map(item => `<li>• ${item}</li>`).join('')}
                </ul>
            </div>
        `;
        
    } catch (error) {
        console.error('Erro ao gerar arquitetura:', error);
        diagramDiv.innerHTML = `
            <div class="architecture-info">
                <h3>❌ Erro ao gerar arquitetura</h3>
                <p>Não foi possível gerar a arquitetura de referência. Por favor, tente novamente.</p>
            </div>
        `;
    }
}

window.onclick = function(event) {
    const painModal = document.getElementById('painModal');
    const serviceModal = document.getElementById('serviceModal');
    const architectureModal = document.getElementById('architectureModal');
    
    if (event.target === painModal) {
        closeModal();
    }
    if (event.target === serviceModal) {
        closeServiceModal();
    }
    if (event.target === architectureModal) {
        closeArchitectureModal();
    }
}
