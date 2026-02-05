/**
 * Nutrition Module
 * Handles nutrition plans display and meal recommendations
 */

class NutritionModule {
  constructor() {
    this.nutritionTabs = document.querySelectorAll('.nutrition-tab');
    this.nutritionContent = document.getElementById('nutritionContent');
    this.currentObjective = 'emagrecimento';
    this.currentUserData = null;
    
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.loadUserData();
    this.renderNutritionContent();
  }

  setupEventListeners() {
    // Nutrition tabs
    this.nutritionTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const objective = tab.dataset.objetivo;
        this.setObjective(objective);
      });
    });

    // Listen for user data updates
    window.addEventListener('userDataUpdated', (event) => {
      this.currentUserData = event.detail;
      this.updateRecommendations();
    });

    // Listen for user data clearing
    window.addEventListener('userDataCleared', () => {
      this.currentUserData = null;
      this.updateRecommendations();
    });
  }

  loadUserData() {
    this.currentUserData = IMCCalculator.getSavedUserData();
    if (this.currentUserData) {
      this.updateRecommendations();
    }
  }

  setObjective(objective) {
    this.currentObjective = objective;
    
    // Update active tab
    this.nutritionTabs.forEach(tab => {
      tab.classList.remove('active');
      tab.setAttribute('aria-pressed', 'false');
    });
    
    const activeTab = document.querySelector(`[data-objetivo="${objective}"]`);
    if (activeTab) {
      activeTab.classList.add('active');
      activeTab.setAttribute('aria-pressed', 'true');
    }
    
    this.renderNutritionContent();
  }

  getRecommendedObjective() {
    if (!this.currentUserData) return 'manutencao';
    
    const { imc } = this.currentUserData;
    
    if (imc < 18.5) return 'ganho-massa';
    if (imc < 25) return 'manutencao';
    return 'emagrecimento';
  }

  updateRecommendations() {
    if (this.currentUserData) {
      const recommendedObjective = this.getRecommendedObjective();
      this.setObjective(recommendedObjective);
      
      // Show recommendation banner
      this.showRecommendationBanner(recommendedObjective);
    }
  }

  showRecommendationBanner(objective) {
    const banner = document.querySelector('.nutrition-recommendation') || 
                   this.createRecommendationBanner();
    
    const objectiveLabels = {
      'emagrecimento': 'Emagrecimento',
      'ganho-massa': 'Ganho de Massa',
      'manutencao': 'Manutenção'
    };
    
    banner.innerHTML = `
      <div class="recommendation-content">
        <i class="fas fa-lightbulb" aria-hidden="true"></i>
        <div>
          <strong>Recomendação baseada no seu IMC (${this.currentUserData.imc.toFixed(1)})</strong>
          <p>Plano de ${objectiveLabels[objective]} selecionado automaticamente</p>
        </div>
      </div>
    `;
    
    banner.classList.add('show');
  }

  createRecommendationBanner() {
    const banner = document.createElement('div');
    banner.className = 'nutrition-recommendation';
    const nutritionSection = document.getElementById('alimentacao');
    nutritionSection.insertBefore(banner, nutritionSection.firstChild);
    return banner;
  }

  renderNutritionContent() {
    const plan = window.fitnessData.nutritionPlans[this.currentObjective];
    if (!plan) return;

    const contentHTML = `
      <div class="nutrition-plan">
        <header class="nutrition-plan__header">
          <h2>${plan.name}</h2>
          <p>${plan.description}</p>
        </header>
        
        <div class="nutrition-plan__info">
          <div class="info-cards">
            <div class="info-card">
              <i class="fas fa-fire" aria-hidden="true"></i>
              <div>
                <strong>Calorias</strong>
                <span>${plan.calories}</span>
              </div>
            </div>
            <div class="info-card">
              <i class="fas fa-chart-pie" aria-hidden="true"></i>
              <div>
                <strong>Macros</strong>
                <span>${plan.macros}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="nutrition-plan__meals">
          <h3>Plano de Refeições</h3>
          <div class="meals-grid">
            ${plan.meals.map(meal => this.createMealCard(meal)).join('')}
          </div>
        </div>
        
        <div class="nutrition-plan__recommendations">
          <h3>Recomendações Importantes</h3>
          <ul class="recommendations-list">
            ${plan.recommendations.map(rec => `<li>${rec}</li>`).join('')}
          </ul>
        </div>
        
        ${plan.supplements && plan.supplements.length > 0 ? `
          <div class="nutrition-plan__supplements">
            <h3>Suplementação Sugerida</h3>
            <div class="supplements-grid">
              ${plan.supplements.map(supplement => `
                <div class="supplement-item">
                  <i class="fas fa-pills" aria-hidden="true"></i>
                  <span>${supplement}</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
        
        <div class="nutrition-plan__actions">
          <button class="btn btn--primary" onclick="nutritionModule.downloadPlan()">
            <i class="fas fa-download" aria-hidden="true"></i>
            Baixar Plano
          </button>
          <button class="btn btn--secondary" onclick="nutritionModule.sharePlan()">
            <i class="fas fa-share" aria-hidden="true"></i>
            Compartilhar
          </button>
        </div>
      </div>
    `;
    
    this.nutritionContent.innerHTML = contentHTML;
    
    // Add animation
    this.nutritionContent.classList.add('fade-in');
    setTimeout(() => this.nutritionContent.classList.remove('fade-in'), 500);
  }

  createMealCard(meal) {
    return `
      <div class="meal-card">
        <div class="meal-card__header">
          <h4>${meal.meal}</h4>
          <span class="meal-time">${meal.time}</span>
        </div>
        <div class="meal-card__foods">
          <ul>
            ${meal.foods.map(food => `<li>${food}</li>`).join('')}
          </ul>
        </div>
        <div class="meal-card__calories">
          <i class="fas fa-fire" aria-hidden="true"></i>
          <span>${meal.calories}</span>
        </div>
      </div>
    `;
  }

  downloadPlan() {
    const plan = window.fitnessData.nutritionPlans[this.currentObjective];
    if (!plan) return;

    const content = this.generatePlanContent(plan);
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `plano-nutricional-${this.currentObjective}.txt`;
    link.click();
    
    URL.revokeObjectURL(url);
    
    // Visual feedback
    this.showNotification('Plano baixado com sucesso! 📥');
  }

  sharePlan() {
    const plan = window.fitnessData.nutritionPlans[this.currentObjective];
    if (!plan) return;

    const shareText = `Confira meu plano de ${plan.name} no Fitness Pro! ${plan.description}`;
    
    if (navigator.share) {
      navigator.share({
        title: plan.name,
        text: shareText,
        url: window.location.href
      }).catch(err => console.log('Erro ao compartilhar:', err));
    } else {
      // Fallback para navegadores que não suportam Web Share API
      navigator.clipboard.writeText(`${shareText} - ${window.location.href}`).then(() => {
        this.showNotification('Link copiado para a área de transferência! 📋');
      });
    }
  }

  generatePlanContent(plan) {
    return `
PLANO NUTRICIONAL - ${plan.name.toUpperCase()}
=====================================

DESCRIÇÃO:
${plan.description}

CALORIAS:
${plan.calories}

MACRONUTRIENTES:
${plan.macros}

REFEIÇÕES:
${plan.meals.map(meal => `
${meal.meal.toUpperCase()} - ${meal.time}
Calorias: ${meal.calories}
Alimentos:
${meal.foods.map(food => `  • ${food}`).join('\n')}
`).join('\n')}

RECOMENDAÇÕES:
${plan.recommendations.map(rec => `• ${rec}`).join('\n')}

${plan.supplements && plan.supplements.length > 0 ? `
SUPLEMENTAÇÃO:
${plan.supplements.map(sup => `• ${sup}`).join('\n')}
` : ''}

=====================================
Gerado pelo Fitness Pro - Seu Personal Trainer Digital
Data: ${new Date().toLocaleDateString('pt-BR')}
    `.trim();
  }

  showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification show';
    notification.innerHTML = `
      <i class="fas fa-check-circle" aria-hidden="true"></i>
      <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  // Calculate daily calories based on user data
  calculateDailyCalories(userData) {
    const { peso, altura, idade, genero } = userData;
    const activityLevel = 1.55; // Moderately active
    
    // Mifflin-St Jeor Equation
    let bmr;
    if (genero === 'masculino') {
      bmr = 10 * peso + 6.25 * altura - 5 * idade + 5;
    } else {
      bmr = 10 * peso + 6.25 * altura - 5 * idade - 161;
    }
    
    return Math.round(bmr * activityLevel);
  }

  // Get BMI-based nutrition recommendations
  getNutritionRecommendations(imc) {
    if (imc < 18.5) {
      return {
        objective: 'ganho-massa',
        focus: 'Aumentar calorias com alimentos nutritivos',
        priority: 'Proteínas e carboidratos complexos'
      };
    } else if (imc < 25) {
      return {
        objective: 'manutencao',
        focus: 'Manter equilíbrio calórico',
        priority: 'Alimentação variada e equilibrada'
      };
    } else {
      return {
        objective: 'emagrecimento',
        focus: 'Reduzir calorias mantendo nutrição',
        priority: 'Proteínas magras e fibras'
      };
    }
  }
}

// Add CSS for nutrition module
const nutritionStyles = `
  .nutrition-recommendation {
    background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
    color: var(--color-white);
    padding: 1.5rem;
    border-radius: var(--radius-xl);
    margin-bottom: 2rem;
    opacity: 0;
    transform: translateY(-10px);
    transition: all var(--transition-normal);
  }

  .nutrition-recommendation.show {
    opacity: 1;
    transform: translateY(0);
  }

  .recommendation-content {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .recommendation-content i {
    font-size: 2rem;
    opacity: 0.9;
  }

  .nutrition-plan__header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .nutrition-plan__header h2 {
    color: var(--color-primary);
    margin-bottom: 0.5rem;
  }

  .info-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .info-card {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.5rem;
    background: var(--bg-primary);
    border-radius: var(--radius-lg);
    border: 1px solid var(--border-color);
  }

  .info-card i {
    font-size: 1.5rem;
    color: var(--color-primary);
  }

  .info-card strong {
    display: block;
    color: var(--text-primary);
    margin-bottom: 0.25rem;
  }

  .info-card span {
    color: var(--text-secondary);
    font-size: var(--font-size-sm);
  }

  .meals-grid {
    display: grid;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .meal-card {
    background: var(--bg-primary);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    border: 1px solid var(--border-color);
    transition: transform var(--transition-fast);
  }

  .meal-card:hover {
    transform: translateY(-2px);
  }

  .meal-card__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .meal-card__header h4 {
    color: var(--text-primary);
    margin: 0;
  }

  .meal-time {
    background: var(--color-primary);
    color: var(--color-white);
    padding: 0.25rem 0.75rem;
    border-radius: var(--radius-full);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
  }

  .meal-card__foods ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .meal-card__foods li {
    padding: 0.25rem 0;
    color: var(--text-secondary);
    border-bottom: 1px solid var(--border-color-light);
  }

  .meal-card__foods li:last-child {
    border-bottom: none;
  }

  .meal-card__calories {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border-color);
  }

  .meal-card__calories i {
    color: var(--color-warning);
  }

  .recommendations-list {
    list-style: none;
    padding: 0;
  }

  .recommendations-list li {
    padding: 0.75rem 0;
    color: var(--text-secondary);
    border-bottom: 1px solid var(--border-color-light);
    position: relative;
    padding-left: 1.5rem;
  }

  .recommendations-list li::before {
    content: '💡';
    position: absolute;
    left: 0;
    top: 0.75rem;
  }

  .recommendations-list li:last-child {
    border-bottom: none;
  }

  .supplements-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .supplement-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    background: var(--bg-primary);
    border-radius: var(--radius-lg);
    border: 1px solid var(--border-color);
  }

  .supplement-item i {
    color: var(--color-info);
  }

  .notification {
    position: fixed;
    top: 100px;
    right: 20px;
    background: var(--color-secondary);
    color: var(--color-white);
    padding: 1rem 1.5rem;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    z-index: var(--z-tooltip);
    transform: translateX(100%);
    transition: transform var(--transition-normal);
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .notification.show {
    transform: translateX(0);
  }

  .notification i {
    font-size: 1.25rem;
  }

  @media (max-width: 768px) {
    .nutrition-tabs {
      flex-direction: column;
      align-items: center;
    }
    
    .nutrition-tab {
      width: 100%;
      max-width: 300px;
      justify-content: center;
    }
    
    .info-cards {
      grid-template-columns: 1fr;
    }
    
    .supplements-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;

// Add styles to document - avoid conflicts
const nutritionStyleSheet = document.createElement('style');
nutritionStyleSheet.textContent = nutritionStyles;
document.head.appendChild(nutritionStyleSheet);

// Initialize Nutrition Module
document.addEventListener('DOMContentLoaded', () => {
  window.nutritionModule = new NutritionModule();
});