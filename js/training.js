/**
 * Training Module
 * Handles exercise display, filtering, and modal interactions
 */

class TrainingModule {
  constructor() {
    this.trainingGrid = document.getElementById('trainingGrid');
    this.filterButtons = document.querySelectorAll('.filter-btn');
    this.exerciseModal = document.getElementById('exerciseModal');
    this.currentFilter = 'todos';
    this.currentUserData = null;
    
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.loadUserData();
    this.renderTrainingCards();
    this.setupModal();
  }

  setupEventListeners() {
    // Filter buttons
    this.filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        this.setFilter(filter);
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
  }

  setFilter(filter) {
    this.currentFilter = filter;
    
    // Update active button
    this.filterButtons.forEach(btn => {
      btn.classList.remove('active');
      btn.setAttribute('aria-pressed', 'false');
    });
    
    const activeButton = document.querySelector(`[data-filter="${filter}"]`);
    if (activeButton) {
      activeButton.classList.add('active');
      activeButton.setAttribute('aria-pressed', 'true');
    }
    
    this.renderTrainingCards();
  }

  getFilteredPlans() {
    const plans = window.fitnessData.trainingPlans;
    
    if (this.currentFilter === 'todos') {
      return Object.values(plans);
    }
    
    return Object.values(plans).filter(plan => plan.id === this.currentFilter);
  }

  getRecommendedPlans() {
    if (!this.currentUserData) return [];
    
    const { imc } = this.currentUserData;
    const recommendations = window.fitnessData.getTrainingRecommendations(imc);
    
    // Map recommendations to plans
    if (imc < 18.5) {
      return [window.fitnessData.trainingPlans.hipertrofia];
    } else if (imc < 25) {
      return [window.fitnessData.trainingPlans.resistencia];
    } else if (imc < 30) {
      return [window.fitnessData.trainingPlans.emagrecimento];
    } else {
      return [window.fitnessData.trainingPlans.resistencia]; // Modified for obese users
    }
  }

  updateRecommendations() {
    const recommendedSection = document.querySelector('.training-recommendations');
    if (!recommendedSection) return;
    
    if (this.currentUserData) {
      const recommendations = this.getRecommendedPlans();
      this.renderRecommendations(recommendations);
    } else {
      recommendedSection.innerHTML = '';
    }
  }

  renderRecommendations(recommendations) {
    const container = document.querySelector('.training-recommendations') || 
                     this.createRecommendationsContainer();
    
    const recommendationsHTML = `
      <div class="section__header">
        <h3 class="section__title">Treinos Recomendados para Você</h3>
        <p class="section__description">Baseado no seu IMC (${this.currentUserData.imc.toFixed(1)})</p>
      </div>
      <div class="training-grid">
        ${recommendations.map(plan => this.createTrainingCard(plan, true)).join('')}
      </div>
    `;
    
    container.innerHTML = recommendationsHTML;
  }

  createRecommendationsContainer() {
    const container = document.createElement('div');
    container.className = 'training-recommendations section';
    container.innerHTML = '<div class="container"></div>';
    
    const treinosSection = document.getElementById('treinos');
    treinosSection.parentNode.insertBefore(container, treinosSection);
    
    return container.querySelector('.container');
  }

  renderTrainingCards() {
    const plans = this.getFilteredPlans();
    
    if (plans.length === 0) {
      this.trainingGrid.innerHTML = `
        <div class="no-results">
          <i class="fas fa-search" aria-hidden="true"></i>
          <h3>Nenhum treino encontrado</h3>
          <p>Tente ajustar os filtros ou explore todos os treinos disponíveis.</p>
        </div>
      `;
      return;
    }
    
    this.trainingGrid.innerHTML = plans.map(plan => this.createTrainingCard(plan)).join('');
    
    // Add animation
    this.trainingGrid.classList.add('fade-in');
    setTimeout(() => this.trainingGrid.classList.remove('fade-in'), 500);
  }

  createTrainingCard(plan, isRecommendation = false) {
    const difficultyClass = this.getDifficultyClass(plan.difficulty);
    const durationIcon = this.getDurationIcon(plan.duration);
    
    return `
      <article class="training-card ${isRecommendation ? 'training-card--recommended' : ''}" 
               data-plan-id="${plan.id}" 
               data-difficulty="${plan.difficulty}">
        <div class="training-card__image">
          <i class="fas fa-dumbbell" aria-hidden="true"></i>
          ${isRecommendation ? '<span class="training-card__badge">Recomendado</span>' : ''}
        </div>
        
        <div class="training-card__content">
          <header class="training-card__header">
            <h3 class="training-card__title">${plan.name}</h3>
            <p class="training-card__description">${plan.description}</p>
          </header>
          
          <div class="training-card__meta">
            <div class="training-card__duration">
              <i class="fas fa-clock" aria-hidden="true"></i>
              <span>${plan.duration}</span>
            </div>
            <div class="training-card__difficulty">
              <i class="fas fa-signal" aria-hidden="true"></i>
              <span class="difficulty-${plan.difficulty}">${this.getDifficultyLabel(plan.difficulty)}</span>
            </div>
          </div>
          
          <div class="training-card__info">
            <div class="training-card__objective">
              <strong>Objetivo:</strong> ${plan.objective}
            </div>
            <div class="training-card__frequency">
              <strong>Frequência:</strong> ${plan.frequency}
            </div>
          </div>
          
          <div class="training-card__actions">
            <button class="btn btn--primary" onclick="trainingModule.showPlanDetails('${plan.id}')">
              <i class="fas fa-eye" aria-hidden="true"></i>
              Ver Detalhes
            </button>
            <button class="btn btn--secondary" onclick="trainingModule.startWorkout('${plan.id}')">
              <i class="fas fa-play" aria-hidden="true"></i>
              Começar
            </button>
          </div>
        </div>
      </article>
    `;
  }

  showPlanDetails(planId) {
    const plan = window.fitnessData.trainingPlans[planId];
    if (!plan) return;

    const modalBody = document.getElementById('exerciseModalBody');
    modalBody.innerHTML = this.createPlanDetailsHTML(plan);
    
    this.openModal();
  }

  createPlanDetailsHTML(plan) {
    return `
      <div class="plan-details">
        <header class="plan-details__header">
          <h2>${plan.name}</h2>
          <p>${plan.description}</p>
        </header>
        
        <div class="plan-details__info">
          <div class="info-grid">
            <div class="info-item">
              <i class="fas fa-target" aria-hidden="true"></i>
              <div>
                <strong>Objetivo</strong>
                <span>${plan.objective}</span>
              </div>
            </div>
            <div class="info-item">
              <i class="fas fa-clock" aria-hidden="true"></i>
              <div>
                <strong>Duração</strong>
                <span>${plan.duration}</span>
              </div>
            </div>
            <div class="info-item">
              <i class="fas fa-calendar" aria-hidden="true"></i>
              <div>
                <strong>Frequência</strong>
                <span>${plan.frequency}</span>
              </div>
            </div>
            <div class="info-item">
              <i class="fas fa-signal" aria-hidden="true"></i>
              <div>
                <strong>Dificuldade</strong>
                <span>${this.getDifficultyLabel(plan.difficulty)}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="plan-details__exercises">
          <h3>Exercícios</h3>
          <div class="exercises-grid">
            ${plan.exercises.map(exercise => this.createExerciseCard(exercise)).join('')}
          </div>
        </div>
        
        ${plan.cardio ? `
          <div class="plan-details__cardio">
            <h3>Cardio</h3>
            <p>${plan.cardio}</p>
          </div>
        ` : ''}
        
        <div class="plan-details__recommendations">
          <h3>Recomendações</h3>
          <ul>
            ${plan.recommendations.map(rec => `<li>${rec}</li>`).join('')}
          </ul>
        </div>
        
        <div class="plan-details__actions">
          <button class="btn btn--primary" onclick="trainingModule.startWorkout('${plan.id}')">
            <i class="fas fa-play" aria-hidden="true"></i>
            Começar Treino
          </button>
          <button class="btn btn--secondary" onclick="trainingModule.showExerciseDetails('${plan.exercises[0].exercise.id}')">
            <i class="fas fa-info-circle" aria-hidden="true"></i>
            Ver Exercício
          </button>
        </div>
      </div>
    `;
  }

  createExerciseCard(exerciseData) {
    const exercise = exerciseData.exercise;
    return `
      <div class="exercise-card">
        <div class="exercise-card__image">
          <img src="${exercise.image}" alt="${exercise.name}" loading="lazy">
          <button class="exercise-card__play" onclick="trainingModule.showExerciseDetails('${exercise.id}')">
            <i class="fas fa-play" aria-hidden="true"></i>
          </button>
        </div>
        <div class="exercise-card__content">
          <h4>${exercise.name}</h4>
          <p class="exercise-card__muscle">${exercise.muscle}</p>
          <div class="exercise-card__details">
            <span><strong>Séries:</strong> ${exerciseData.series}</span>
            <span><strong>Reps:</strong> ${exerciseData.reps}</span>
            <span><strong>Descanso:</strong> ${exerciseData.rest}</span>
          </div>
        </div>
      </div>
    `;
  }

  showExerciseDetails(exerciseId) {
    const exercise = window.fitnessData.exercises[exerciseId];
    if (!exercise) return;

    const modalBody = document.getElementById('exerciseModalBody');
    modalBody.innerHTML = this.createExerciseDetailsHTML(exercise);
    
    this.openModal();
  }

  createExerciseDetailsHTML(exercise) {
    return `
      <div class="exercise-details">
        <div class="exercise-details__media">
          <img src="${exercise.image}" alt="${exercise.name}" loading="lazy">
          ${exercise.video ? `
            <div class="exercise-details__video">
              <a href="${exercise.video}" target="_blank" rel="noopener noreferrer" class="btn btn--secondary">
                <i class="fab fa-youtube" aria-hidden="true"></i>
                Ver Vídeo Tutorial
              </a>
            </div>
          ` : ''}
        </div>
        
        <div class="exercise-details__info">
          <header class="exercise-details__header">
            <h2>${exercise.name}</h2>
            <div class="exercise-details__meta">
              <span class="muscle-tag">${exercise.muscle}</span>
              <span class="difficulty-tag difficulty-${exercise.difficulty}">${this.getDifficultyLabel(exercise.difficulty)}</span>
              <span class="equipment-tag">${this.getEquipmentLabel(exercise.equipment)}</span>
            </div>
          </header>
          
          <div class="exercise-details__description">
            <h3>Descrição</h3>
            <p>${exercise.description}</p>
          </div>
          
          <div class="exercise-details__execution">
            <h3>Execução</h3>
            <p>${exercise.execution}</p>
          </div>
          
          <div class="exercise-details__tips">
            <h3>Dicas Importantes</h3>
            <p>${exercise.tips}</p>
          </div>
          
          <div class="exercise-details__specs">
            <div class="spec-grid">
              <div class="spec-item">
                <i class="fas fa-dumbbell" aria-hidden="true"></i>
                <div>
                  <strong>Séries</strong>
                  <span>${exercise.series}</span>
                </div>
              </div>
              <div class="spec-item">
                <i class="fas fa-clock" aria-hidden="true"></i>
                <div>
                  <strong>Descanso</strong>
                  <span>${exercise.rest}</span>
                </div>
              </div>
              <div class="spec-item">
                <i class="fas fa-layer-group" aria-hidden="true"></i>
                <div>
                  <strong>Músculos Secundários</strong>
                  <span>${exercise.secondaryMuscles.join(', ') || 'Nenhum'}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="exercise-details__actions">
            <button class="btn btn--primary" onclick="trainingModule.addToTimer()">
              <i class="fas fa-stopwatch" aria-hidden="true"></i>
              Iniciar Descanso
            </button>
            <button class="btn btn--secondary" onclick="trainingModule.addToFavorites('${exercise.id}')">
              <i class="fas fa-heart" aria-hidden="true"></i>
              Adicionar aos Favoritos
            </button>
          </div>
        </div>
      </div>
    `;
  }

  startWorkout(planId) {
    const plan = window.fitnessData.trainingPlans[planId];
    if (!plan) return;

    // Store current workout in localStorage
    const workoutData = {
      planId: plan.id,
      planName: plan.name,
      currentExerciseIndex: 0,
      startTime: new Date().toISOString(),
      exercises: plan.exercises.map((ex, index) => ({
        ...ex,
        completed: false,
        setsCompleted: 0
      }))
    };

    localStorage.setItem('currentWorkout', JSON.stringify(workoutData));
    
    // Navigate to workout interface
    this.showWorkoutInterface(workoutData);
    
    // Close modal if open
    this.closeModal();
  }

  showWorkoutInterface(workoutData) {
    // This would typically navigate to a separate workout page
    // For now, we'll show an alert with instructions
    alert(`
      🏋️ Treino iniciado: ${workoutData.planName}
      
      📋 Instruções:
      1. Siga a ordem dos exercícios
      2. Use o cronômetro entre as séries
      3. Marque cada exercício como concluído
      4. Ajuste as cargas conforme necessário
      
      💡 Dica: Use o cronômetro de descanso entre as séries!
    `);
    
    // Scroll to timer
    scrollToSection('cronometro');
  }

  addToTimer() {
    const timer = window.fitnessTimer;
    if (timer) {
      timer.setTime(60); // Set to 1 minute
      this.closeModal();
      scrollToSection('cronometro');
    }
  }

  addToFavorites(exerciseId) {
    let favorites = JSON.parse(localStorage.getItem('favoriteExercises') || '[]');
    
    if (!favorites.includes(exerciseId)) {
      favorites.push(exerciseId);
      localStorage.setItem('favoriteExercises', JSON.stringify(favorites));
      alert('Exercício adicionado aos favoritos! ❤️');
    } else {
      alert('Este exercício já está nos seus favoritos!');
    }
  }

  openModal() {
    this.exerciseModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus management
    const firstFocusable = this.exerciseModal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (firstFocusable) {
      firstFocusable.focus();
    }
  }

  closeModal() {
    this.exerciseModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  setupModal() {
    // Close modal on backdrop click
    const backdrop = this.exerciseModal.querySelector('.modal__backdrop');
    backdrop.addEventListener('click', () => this.closeModal());
    
    // Close modal on close button click
    const closeBtn = this.exerciseModal.querySelector('.modal__close');
    closeBtn.addEventListener('click', () => this.closeModal());
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.exerciseModal.classList.contains('active')) {
        this.closeModal();
      }
    });
  }

  // Utility methods
  getDifficultyClass(difficulty) {
    return `difficulty-${difficulty}`;
  }

  getDifficultyLabel(difficulty) {
    const labels = {
      beginner: 'Iniciante',
      intermediate: 'Intermediário',
      advanced: 'Avançado'
    };
    return labels[difficulty] || difficulty;
  }

  getDurationIcon(duration) {
    if (duration.includes('30')) return 'fas fa-clock';
    if (duration.includes('45')) return 'fas fa-hourglass-half';
    return 'fas fa-hourglass-end';
  }

  getEquipmentLabel(equipment) {
    const labels = {
      barra: 'Barra',
      halteres: 'Halteres',
      maquina: 'Máquina',
      peso_corporal: 'Peso Corporal'
    };
    return labels[equipment] || equipment;
  }
}

// Initialize Training Module
document.addEventListener('DOMContentLoaded', () => {
  window.trainingModule = new TrainingModule();
});