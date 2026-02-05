/**
 * IMC Calculator Module
 * Handles BMI calculation, validation, and recommendations
 */

class IMCCalculator {
  constructor() {
    this.form = document.getElementById('imcForm');
    this.resultContainer = document.getElementById('imcResult');
    this.init();
  }

  init() {
    if (this.form) {
      this.form.addEventListener('submit', this.handleSubmit.bind(this));
      this.setupRealTimeValidation();
    }
  }

  setupRealTimeValidation() {
    const inputs = this.form.querySelectorAll('input, select');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearError(input));
    });
  }

  validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';

    // Required field validation
    if (!value) {
      isValid = false;
      errorMessage = 'Este campo é obrigatório';
    } else {
      // Specific field validations
      switch (fieldName) {
        case 'peso':
          const peso = parseFloat(value);
          if (isNaN(peso) || peso < 30 || peso > 300) {
            isValid = false;
            errorMessage = 'Peso deve estar entre 30 e 300 kg';
          }
          break;

        case 'altura':
          const altura = parseFloat(value);
          if (isNaN(altura) || altura < 100 || altura > 250) {
            isValid = false;
            errorMessage = 'Altura deve estar entre 100 e 250 cm';
          }
          break;

        case 'idade':
          const idade = parseInt(value);
          if (isNaN(idade) || idade < 10 || idade > 120) {
            isValid = false;
            errorMessage = 'Idade deve estar entre 10 e 120 anos';
          }
          break;

        case 'genero':
          if (!['masculino', 'feminino'].includes(value)) {
            isValid = false;
            errorMessage = 'Selecione um gênero válido';
          }
          break;
      }
    }

    this.showFieldError(field, errorMessage);
    return isValid;
  }

  showFieldError(field, message) {
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.form-error');
    
    if (message) {
      field.classList.add('error');
      errorElement.textContent = message;
      field.setAttribute('aria-invalid', 'true');
      field.setAttribute('aria-describedby', `${field.id}-error`);
    } else {
      this.clearError(field);
    }
  }

  clearError(field) {
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.form-error');
    
    field.classList.remove('error');
    errorElement.textContent = '';
    field.setAttribute('aria-invalid', 'false');
    field.removeAttribute('aria-describedby');
  }

  handleSubmit(event) {
    event.preventDefault();
    
    if (!this.validateForm()) {
      return;
    }

    const formData = new FormData(this.form);
    const peso = parseFloat(formData.get('peso'));
    const altura = parseFloat(formData.get('altura'));
    const idade = parseInt(formData.get('idade'));
    const genero = formData.get('genero');

    const imc = this.calculateIMC(peso, altura);
    const category = this.getIMCCategory(imc);
    const recommendations = this.getTrainingRecommendations(imc);

    this.displayResult({
      imc,
      category,
      peso,
      altura,
      idade,
      genero,
      recommendations
    });

    // Save to localStorage for recommendations
    this.saveUserData({ peso, altura, idade, genero, imc, category });
  }

  validateForm() {
    const inputs = this.form.querySelectorAll('input[required], select[required]');
    let isValid = true;

    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    return isValid;
  }

  calculateIMC(peso, altura) {
    // Convert height from cm to m
    const alturaMetros = altura / 100;
    return peso / (alturaMetros * alturaMetros);
  }

  getIMCCategory(imc) {
    if (imc < 18.5) return window.fitnessData.imcCategories.underweight;
    if (imc < 25) return window.fitnessData.imcCategories.normal;
    if (imc < 30) return window.fitnessData.imcCategories.overweight;
    if (imc < 35) return window.fitnessData.imcCategories.obese1;
    if (imc < 40) return window.fitnessData.imcCategories.obese2;
    return window.fitnessData.imcCategories.obese3;
  }

  getTrainingRecommendations(imc) {
    return window.fitnessData.getTrainingRecommendations(imc);
  }

  displayResult(data) {
    const { imc, category, peso, altura, idade, genero, recommendations } = data;
    
    const resultHTML = `
      <div class="imc-result__header">
        <h3>Seu Resultado</h3>
        <div class="imc-result__value">${imc.toFixed(1)}</div>
        <div class="imc-result__category" style="color: ${category.color}">
          ${category.category}
        </div>
        <div class="imc-result__description">
          <p><strong>Peso:</strong> ${peso} kg</p>
          <p><strong>Altura:</strong> ${altura} cm</p>
          <p><strong>Idade:</strong> ${idade} anos</p>
          <p><strong>Gênero:</strong> ${genero === 'masculino' ? 'Masculino' : 'Feminino'}</p>
        </div>
      </div>

      <div class="imc-result__recommendations">
        <h4>Recomendações</h4>
        <ul>
          ${category.recommendations.map(rec => `<li>${rec}</li>`).join('')}
        </ul>
      </div>

      <div class="imc-result__training">
        <h4>Recomendações de Treino</h4>
        <div class="training-info">
          <p><strong>Foco:</strong> ${recommendations.focus}</p>
          <p><strong>Cardio:</strong> ${recommendations.cardio}</p>
          <p><strong>Intensidade:</strong> ${recommendations.intensity}</p>
          <p><strong>Frequência:</strong> ${recommendations.frequency}</p>
        </div>
      </div>

      <div class="imc-result__actions">
        <button class="btn btn--primary" onclick="scrollToSection('treinos')">
          <i class="fas fa-running" aria-hidden="true"></i>
          Ver Treinos Recomendados
        </button>
        <button class="btn btn--secondary" onclick="scrollToSection('alimentacao')">
          <i class="fas fa-apple-alt" aria-hidden="true"></i>
          Ver Plano Alimentar
        </button>
      </div>
    `;

    this.resultContainer.innerHTML = resultHTML;
    this.resultContainer.classList.add('fade-in');
    
    // Scroll to result
    this.resultContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  saveUserData(data) {
    const userData = {
      ...data,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('fitnessUserData', JSON.stringify(userData));
    
    // Dispatch event for other modules to use
    window.dispatchEvent(new CustomEvent('userDataUpdated', { detail: userData }));
  }

  // Load saved user data
  static getSavedUserData() {
    const saved = localStorage.getItem('fitnessUserData');
    return saved ? JSON.parse(saved) : null;
  }

  // Clear saved data
  static clearSavedData() {
    localStorage.removeItem('fitnessUserData');
    window.dispatchEvent(new CustomEvent('userDataCleared'));
  }
}

// Utility function to scroll to sections
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    
    // Update navigation
    document.querySelectorAll('.nav__link').forEach(link => {
      link.classList.remove('active');
    });
    document.querySelector(`[href="#${sectionId}"]`).classList.add('active');
  }
}

// Initialize IMC Calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new IMCCalculator();
});