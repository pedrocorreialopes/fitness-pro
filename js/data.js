/**
 * Fitness Pro - Exercise Database
 * Complete exercise data with images, descriptions, and training plans
 */

// Exercise Database
const exercises = {
  // Peito
  supino_reto: {
    id: 'supino_reto',
    name: 'Supino Reto',
    category: 'peito',
    muscle: 'Peitoral',
    secondaryMuscles: ['Tríceps', 'Ombros'],
    difficulty: 'intermediate',
    equipment: 'barra',
    description: 'Exercício fundamental para desenvolvimento do peitoral, realizado deitado em um banco com uma barra.',
    execution: 'Deitado no banco, puxe os ombros para trás e para baixo. Segure a barra com as mãos afastadas na largura dos ombros. Desça a barra até tocar levemente o peito e empurre de volta para cima.',
    tips: 'Mantenha os pés firmes no chão e o core contraído. Não arque excessivamente as costas.',
    series: '4 séries de 8-12 repetições',
    rest: '90-120 segundos entre séries',
    image: 'https://images.unsplash.com/photo-1530822847156-5df684ec5ee1?w=400&h=300&fit=crop',
    video: 'https://www.youtube.com/watch?v=example'
  },
  
  supino_inclinado: {
    id: 'supino_inclinado',
    name: 'Supino Inclinado',
    category: 'peito',
    muscle: 'Peitoral Superior',
    secondaryMuscles: ['Tríceps', 'Ombros'],
    difficulty: 'intermediate',
    equipment: 'barra',
    description: 'Focado no desenvolvimento da parte superior do peitoral e ombros.',
    execution: 'Deitado em um banco inclinado (30-45°), execute o movimento de forma similar ao supino reto.',
    tips: 'Use um ângulo de inclinação moderado para focar no peitoral superior.',
    series: '3-4 séries de 8-12 repetições',
    rest: '90-120 segundos entre séries',
    image: 'https://images.unsplash.com/photo-1581009137042-c552e485697a?w=400&h=300&fit=cost',
    video: 'https://www.youtube.com/watch?v=example'
  },
  
  crucifixo: {
    id: 'crucifixo',
    name: 'Crucifixo',
    category: 'peito',
    muscle: 'Peitoral',
    secondaryMuscles: ['Ombros'],
    difficulty: 'beginner',
    equipment: 'halteres',
    description: 'Excelente para isolar o peitoral e trabalhar a amplitude de movimento.',
    execution: 'Deitado no banco, segure os halteres com os braços estendidos. Abra os braços em arco até sentir o peito alongar, depois volte à posição inicial.',
    tips: 'Mantenha um leve cotovelo flexionado durante todo o movimento.',
    series: '3 séries de 10-15 repetições',
    rest: '60-90 segundos entre séries',
    image: 'https://images.unsplash.com/photo-1532029837206-abbe2b7623c3?w=400&h=300&fit=crop',
    video: 'https://www.youtube.com/watch?v=example'
  },

  // Costas
  puxada_alta: {
    id: 'puxada_alta',
    name: 'Puxada Alta',
    category: 'costas',
    muscle: 'Dorsal',
    secondaryMuscles: ['Bíceps', 'Ombros'],
    difficulty: 'beginner',
    equipment: 'barra',
    description: 'Exercício fundamental para desenvolver a largura das costas.',
    execution: 'Segure a barra com as mãos mais afastadas que os ombros. Puxe a barra até o peito, contraindo as escápulas.',
    tips: 'Foque em puxar com os dorsais, não com os braços.',
    series: '4 séries de 8-12 repetições',
    rest: '90-120 segundos entre séries',
    image: 'https://images.unsplash.com/photo-1532029837206-abbe2b7623c3?w=400&h=300&fit=crop',
    video: 'https://www.youtube.com/watch?v=example'
  },

  remada_cavalo: {
    id: 'remada_cavalo',
    name: 'Remada Cavalo',
    category: 'costas',
    muscle: 'Dorsal Médio',
    secondaryMuscles: ['Trapézio', 'Romboides'],
    difficulty: 'intermediate',
    equipment: 'barra',
    description: 'Excelente para desenvolver espessura nas costas e região média.',
    execution: 'Inclinado para frente, puxe a barra até o abdômen, contraindo as escápulas.',
    tips: 'Mantenha o core contraído e o dorso reto durante o movimento.',
    series: '3-4 séries de 8-12 repetições',
    rest: '90-120 segundos entre séries',
    image: 'https://images.unsplash.com/photo-1532029837206-abbe2b7623c3?w=400&h=300&fit=crop',
    video: 'https://www.youtube.com/watch?v=example'
  },

  // Pernas
  agachamento: {
    id: 'agachamento',
    name: 'Agachamento',
    category: 'pernas',
    muscle: 'Quadríceps',
    secondaryMuscles: ['Glúteos', 'Posterior', 'Panturrilha'],
    difficulty: 'intermediate',
    equipment: 'barra',
    description: 'O rei dos exercícios para desenvolvimento de força e massa muscular das pernas.',
    execution: 'Posicione a barra sobre os trapézios. Flexione os joelhos e quadris até as coxas ficem paralelas ao solo. Empurre de volta à posição inicial.',
    tips: 'Mantenha os joelhos alinhados com os pés e o core contraído.',
    series: '4 séries de 8-12 repetições',
    rest: '120-180 segundos entre séries',
    image: 'https://images.unsplash.com/photo-1532029837206-abbe2b7623c3?w=400&h=300&fit=crop',
    video: 'https://www.youtube.com/watch?v=example'
  },

  leg_press: {
    id: 'leg_press',
    name: 'Leg Press',
    category: 'pernas',
    muscle: 'Quadríceps',
    secondaryMuscles: ['Glúteos', 'Posterior'],
    difficulty: 'beginner',
    equipment: 'maquina',
    description: 'Excelente para iniciantes e para trabalhar com cargas pesadas com segurança.',
    execution: 'Sentado na máquina, empurre o peso estendendo as pernas. Flexione até 90° e volte à posição inicial.',
    tips: 'Não bloqueie completamente os joelhos no topo do movimento.',
    series: '3-4 séries de 10-15 repetições',
    rest: '90-120 segundos entre séries',
    image: 'https://images.unsplash.com/photo-1532029837206-abbe2b7623c3?w=400&h=300&fit=crop',
    video: 'https://www.youtube.com/watch?v=example'
  },

  // Ombros
  desenvolvimento: {
    id: 'desenvolvimento',
    name: 'Desenvolvimento',
    category: 'ombros',
    muscle: 'Deltóides',
    secondaryMuscles: ['Tríceps'],
    difficulty: 'intermediate',
    equipment: 'barra',
    description: 'Exercício fundamental para desenvolvimento geral dos ombros.',
    execution: 'Sentado, empurre a barra de cima da cabeça até estender os braços. Desça controladamente.',
    tips: 'Mantenha os cotovelos ligeiramente à frente do corpo.',
    series: '4 séries de 8-12 repetições',
    rest: '90-120 segundos entre séries',
    image: 'https://images.unsplash.com/photo-1532029837206-abbe2b7623c3?w=400&h=300&fit=crop',
    video: 'https://www.youtube.com/watch?v=example'
  },

  elevacao_lateral: {
    id: 'elevacao_lateral',
    name: 'Elevação Lateral',
    category: 'ombros',
    muscle: 'Deltóide Lateral',
    secondaryMuscles: ['Deltóide Anterior'],
    difficulty: 'beginner',
    equipment: 'halteres',
    description: 'Excelente para desenvolver a largura dos ombros.',
    execution: 'Em pé, eleve os halteres lateralmente até a altura dos ombros.',
    tips: 'Mantenha um leve cotovelo flexionado e eleve os braços em um arco.',
    series: '3 séries de 12-15 repetições',
    rest: '60-90 segundos entre séries',
    image: 'https://images.unsplash.com/photo-1532029837206-abbe2b7623c3?w=400&h=300&fit=crop',
    video: 'https://www.youtube.com/watch?v=example'
  },

  // Braços
  rosca_direta: {
    id: 'rosca_direta',
    name: 'Rosca Direta',
    category: 'bracos',
    muscle: 'Bíceps',
    secondaryMuscles: ['Antebraço'],
    difficulty: 'beginner',
    equipment: 'barra',
    description: 'O clássico exercício para desenvolvimento dos bíceps.',
    execution: 'Em pé, segure a barra com as palmas voltadas para cima. Flexione os cotovelos levantando a barra.',
    tips: 'Mantenha os cotovelos fixos ao lado do corpo.',
    series: '3 séries de 10-12 repetições',
    rest: '60-90 segundos entre séries',
    image: 'https://images.unsplash.com/photo-1532029837206-abbe2b7623c3?w=400&h=300&fit=crop',
    video: 'https://www.youtube.com/watch?v=example'
  },

  triceps_testa: {
    id: 'triceps_testa',
    name: 'Tríceps Testa',
    category: 'bracos',
    muscle: 'Tríceps',
    secondaryMuscles: [],
    difficulty: 'intermediate',
    equipment: 'barra',
    description: 'Excelente para desenvolvimento da parte posterior dos braços.',
    execution: 'Deitado no banco, segure a barra com as mãos afastadas. Flexione os cotovelos levando a barra até a testa.',
    tips: 'Mantenha os cotovelos apontados para cima durante todo o movimento.',
    series: '3 séries de 10-12 repetições',
    rest: '60-90 segundos entre séries',
    image: 'https://images.unsplash.com/photo-1532029837206-abbe2b7623c3?w=400&h=300&fit=crop',
    video: 'https://www.youtube.com/watch?v=example'
  },

  // Abdômen
  abdominal: {
    id: 'abdominal',
    name: 'Abdominal',
    category: 'abdomen',
    muscle: 'Reto do Abdômen',
    secondaryMuscles: [],
    difficulty: 'beginner',
    equipment: 'peso_corporal',
    description: 'O clássico exercício para fortalecer o abdômen.',
    execution: 'Deitado de costas, flexione o tronco em direção aos joelhos.',
    tips: 'Expire ao subir e inspire ao descer.',
    series: '3 séries de 15-20 repetições',
    rest: '45-60 segundos entre séries',
    image: 'https://images.unsplash.com/photo-1532029837206-abbe2b7623c3?w=400&h=300&fit=crop',
    video: 'https://www.youtube.com/watch?v=example'
  },

  prancha: {
    id: 'prancha',
    name: 'Prancha',
    category: 'abdomen',
    muscle: 'Core',
    secondaryMuscles: ['Reto do Abdômen', 'Oblíquos'],
    difficulty: 'intermediate',
    equipment: 'peso_corporal',
    description: 'Excelente para fortalecer todo o core e melhorar a estabilidade.',
    execution: 'Apoiado nos antebraços e pontas dos pés, mantenha o corpo em linha reta.',
    tips: 'Contraia o abdômen e mantenha os quadris alinhados.',
    series: '3 séries de 30-60 segundos',
    rest: '60-90 segundos entre séries',
    image: 'https://images.unsplash.com/photo-1532029837206-abbe2b7623c3?w=400&h=300&fit=crop',
    video: 'https://www.youtube.com/watch?v=example'
  }
};

// Training Plans
const trainingPlans = {
  emagrecimento: {
    id: 'emagrecimento',
    name: 'Plano de Emagrecimento',
    description: 'Treinos focados na queima de gordura e aumento do metabolismo',
    objective: 'Perder peso e reduzir percentual de gordura',
    duration: '45-60 minutos',
    frequency: '5-6x por semana',
    difficulty: 'intermediate',
    exercises: [
      { exercise: exercises.puxada_alta, series: 4, reps: '15-20', rest: '60s' },
      { exercise: exercises.supino_reto, series: 4, reps: '15-20', rest: '60s' },
      { exercise: exercises.remada_cavalo, series: 3, reps: '15-20', rest: '60s' },
      { exercise: exercises.crucifixo, series: 3, reps: '15-20', rest: '60s' },
      { exercise: exercises.elevacao_lateral, series: 3, reps: '15-20', rest: '45s' },
      { exercise: exercises.abdominal, series: 3, reps: '20-25', rest: '45s' }
    ],
    cardio: '20-30 minutos de cardio moderado após o treino',
    recommendations: [
      'Foco em alta repetição (15-20 reps)',
      'Descanso curto entre séries (45-60s)',
      'Treino em circuito quando possível',
      'Priorizar exercícios compostos'
    ]
  },

  hipertrofia: {
    id: 'hipertrofia',
    name: 'Plano de Hipertrofia',
    description: 'Treinos para ganho de massa muscular e força',
    objective: 'Aumentar massa muscular magra',
    duration: '60-75 minutos',
    frequency: '4-5x por semana',
    difficulty: 'advanced',
    exercises: [
      { exercise: exercises.agachamento, series: 4, reps: '8-12', rest: '120s' },
      { exercise: exercises.supino_reto, series: 4, reps: '8-12', rest: '90s' },
      { exercise: exercises.puxada_alta, series: 4, reps: '8-12', rest: '90s' },
      { exercise: exercises.desenvolvimento, series: 4, reps: '8-12', rest: '90s' },
      { exercise: exercises.rosca_direta, series: 3, reps: '10-12', rest: '60s' },
      { exercise: exercises.triceps_testa, series: 3, reps: '10-12', rest: '60s' }
    ],
    recommendations: [
      'Foco em cargas pesadas (8-12 reps)',
      'Descanso adequado entre séries (90-120s)',
      'Progressão de carga semanal',
      'Técnica perfeita nos exercícios'
    ]
  },

  resistencia: {
    id: 'resistencia',
    name: 'Plano de Resistência',
    description: 'Treinos para melhorar capacidade cardiovascular e resistência muscular',
    objective: 'Melhorar condicionamento físico geral',
    duration: '40-50 minutos',
    frequency: '4-5x por semana',
    difficulty: 'beginner',
    exercises: [
      { exercise: exercises.leg_press, series: 3, reps: '20-25', rest: '45s' },
      { exercise: exercises.supino_inclinado, series: 3, reps: '20-25', rest: '45s' },
      { exercise: exercises.elevacao_lateral, series: 3, reps: '20-25', rest: '45s' },
      { exercise: exercises.abdominal, series: 3, reps: '25-30', rest: '30s' },
      { exercise: exercises.prancha, series: 3, reps: '30-45s', rest: '45s' }
    ],
    cardio: '15-20 minutos de cardio intervalado',
    recommendations: [
      'Alta repetição (20-25 reps)',
      'Descanso curto entre séries (30-45s)',
      'Foco na técnica e controle do movimento',
      'Progressão gradual de volume'
    ]
  }
};

// Nutrition Plans
const nutritionPlans = {
  emagrecimento: {
    id: 'emagrecimento',
    name: 'Plano de Emagrecimento',
    description: 'Dieta com déficit calórico para perda de gordura',
    calories: 'Mulheres: 1200-1500 kcal | Homens: 1500-1800 kcal',
    macros: 'Proteína: 30% | Carboidratos: 40% | Gordura: 30%',
    meals: [
      {
        meal: 'Café da Manhã',
        time: '7:00h',
        foods: ['1 xícara de café preto', '2 fatias de pão integral', '1 ovo mexido', '1 banana pequena'],
        calories: '350 kcal'
      },
      {
        meal: 'Lanche da Manhã',
        time: '10:00h',
        foods: ['1 maçã', '30g de castanhas', 'Chá verde'],
        calories: '200 kcal'
      },
      {
        meal: 'Almoço',
        time: '12:30h',
        foods: ['150g de frango grelhado', '1 xícara de arroz integral', 'Salada verde', '1 colher de azeite'],
        calories: '450 kcal'
      },
      {
        meal: 'Lanche da Tarde',
        time: '15:30h',
        foods: ['1 iogurte natural desnatado', '1 colher de granola', 'Frutas vermelhas'],
        calories: '180 kcal'
      },
      {
        meal: 'Jantar',
        time: '19:00h',
        foods: ['150g de peixe assado', 'Legumes no vapor', '1 batata doce média'],
        calories: '400 kcal'
      }
    ],
    recommendations: [
      'Beber pelo menos 2 litros de água por dia',
      'Evitar alimentos processados e açúcares simples',
      'Fazer 5-6 refeições pequenas ao dia',
      'Incluir fibras em todas as refeições',
      'Evitar comer 3 horas antes de dormir'
    ],
    supplements: ['Multivitamínico', 'Ômega-3', 'Proteína Whey (se necessário)']
  },

  ganho_massa: {
    id: 'ganho_massa',
    name: 'Plano para Ganho de Massa',
    description: 'Dieta com superávit calórico para ganho muscular',
    calories: 'Mulheres: 2000-2200 kcal | Homens: 2500-2800 kcal',
    macros: 'Proteína: 35% | Carboidratos: 45% | Gordura: 20%',
    meals: [
      {
        meal: 'Café da Manhã',
        time: '7:00h',
        foods: ['1 xícara de leite desnatado', '80g de aveia', '1 banana', '30g de whey protein', '1 colher de mel'],
        calories: '550 kcal'
      },
      {
        meal: 'Lanche da Manhã',
        time: '10:00h',
        foods: ['2 fatias de pão integral', '100g de frango desfiado', '1 copo de suco natural'],
        calories: '350 kcal'
      },
      {
        meal: 'Almoço',
        time: '12:30h',
        foods: ['200g de carne vermelha magra', '150g de arroz', 'Feijão', 'Salada', '1 batata média'],
        calories: '700 kcal'
      },
      {
        meal: 'Pré-treino',
        time: '16:00h',
        foods: ['2 fatias de pão com geleia', '1 banana', 'Café preto'],
        calories: '300 kcal'
      },
      {
        meal: 'Pós-treino',
        time: '18:00h',
        foods: ['30g de whey protein', '1 banana', 'Creatina'],
        calories: '250 kcal'
      },
      {
        meal: 'Jantar',
        time: '20:00h',
        foods: ['200g de frango/peixe', '150g de arroz', 'Legumes', 'Azeite'],
        calories: '600 kcal'
      }
    ],
    recommendations: [
      'Comer a cada 3 horas para manter o anabolismo',
      'Priorizar proteínas de alta qualidade biológica',
      'Incluir carboidratos complexos em todas as refeições principais',
      'Beber shake de whey no pós-treino',
      'Dormir pelo menos 8 horas por noite'
    ],
    supplements: ['Whey Protein', 'Creatina', 'BCAA', 'Multivitamínico', 'Glutamina']
  },

  manutencao: {
    id: 'manutencao',
    name: 'Plano de Manutenção',
    description: 'Dieta balanceada para manter peso e composição corporal',
    calories: 'Mulheres: 1800-2000 kcal | Homens: 2200-2500 kcal',
    macros: 'Proteína: 30% | Carboidratos: 40% | Gordura: 30%',
    meals: [
      {
        meal: 'Café da Manhã',
        time: '7:00h',
        foods: ['1 xícara de café', '2 fatias de pão integral', '1 ovo', '1 fruta'],
        calories: '400 kcal'
      },
      {
        meal: 'Lanche da Manhã',
        time: '10:00h',
        foods: ['1 iogurte natural', '1 punhado de nozes', 'Frutas'],
        calories: '250 kcal'
      },
      {
        meal: 'Almoço',
        time: '12:30h',
        foods: ['150g de proteína magra', '1 xícara de arroz/legumes', 'Salada', 'Azeite'],
        calories: '500 kcal'
      },
      {
        meal: 'Lanche da Tarde',
        time: '16:00h',
        foods: ['1 sanduíche natural', '1 copo de suque natural'],
        calories: '300 kcal'
      },
      {
        meal: 'Jantar',
        time: '19:00h',
        foods: ['150g de peixe/frango', 'Legumes cozidos', '1 porção pequena de carboidrato'],
        calories: '450 kcal'
      }
    ],
    recommendations: [
      'Manter horários regulares das refeições',
      'Balancear macronutrientes em todas as refeições',
      'Incluir variedade de alimentos para garantir micronutrientes',
      'Praticar atividade física regularmente',
      'Monitorar peso regularmente'
    ],
    supplements: ['Multivitamínico', 'Ômega-3']
  }
};

// IMC Categories and Recommendations
const imcCategories = {
  underweight: {
    min: 0,
    max: 18.5,
    category: 'Abaixo do peso',
    color: '#3b82f6',
    recommendations: [
      'Consulte um nutricionista para avaliar sua alimentação',
      'Aumente a ingestão de calorias com alimentos nutritivos',
      'Faça refeições com maior frequência (6x ao dia)',
      'Inclua alimentos calóricos saudáveis como frutas secas e oleaginosas',
      'Faça exercícios de força para ganhar massa muscular'
    ],
    training: 'Foque em exercícios de força com pouco cardio'
  },
  normal: {
    min: 18.5,
    max: 24.9,
    category: 'Peso normal',
    color: '#10b981',
    recommendations: [
      'Parabéns! Mantenha seu estilo de vida saudável',
      'Continue com uma alimentação equilibrada e variada',
      'Mantenha a prática regular de exercícios físicos',
      'Faça exames de rotina regularmente',
      'Evite o sedentarismo'
    ],
    training: 'Mantenha um treino equilibrado com cardio e musculação'
  },
  overweight: {
    min: 25.0,
    max: 29.9,
    category: 'Sobrepeso',
    color: '#f59e0b',
    recommendations: [
      'Considere revisar seus hábitos alimentares',
      'Aumente a ingestão de frutas, legumes e verduras',
      'Reduza alimentos processados e açúcares simples',
      'Inicie um programa de exercícios regulares',
      'Beba pelo menos 2 litros de água por dia'
    ],
    training: 'Combine cardio com musculação para queima de gordura'
  },
  obese1: {
    min: 30.0,
    max: 34.9,
    category: 'Obesidade Grau I',
    color: '#ef4444',
    recommendations: [
      'Procure orientação médica e nutricional',
      'Evite dietas restritivas sem acompanhamento profissional',
      'Comece com atividades físicas leves e progressivas',
      'Monitore regularmente sua saúde com exames médicos',
      'Considere o apoio de grupos de apoio'
    ],
    training: 'Comece com caminhadas leves e exercícios de baixo impacto'
  },
  obese2: {
    min: 35.0,
    max: 39.9,
    category: 'Obesidade Grau II',
    color: '#dc2626',
    recommendations: [
      'Busque acompanhamento médico especializado',
      'Não inicie exercícios sem orientação profissional',
      'Considere acompanhamento psicológico para mudança de hábitos',
      'Faça exames médicos completos regularmente',
      'Procure por programas especializados em obesidade'
    ],
    training: 'Exercícios supervisionados e adaptados à sua condição'
  },
  obese3: {
    min: 40.0,
    max: 100,
    category: 'Obesidade Grau III',
    color: '#991b1b',
    recommendations: [
      'Procure urgentemente atendimento médico especializado',
      'A obesidade mórbida requer tratamento multiprofissional',
      'Evite exercícios sem supervisão médica',
      'Considere todas as opções de tratamento disponíveis',
      'Não tente resolver sozinho - busque ajuda profissional'
    ],
    training: 'Apenas com supervisão médica e profissional especializado'
  }
};

// Training recommendations based on BMI
const getTrainingRecommendations = (imc) => {
  if (imc < 18.5) return {
    focus: 'Ganho de massa muscular',
    cardio: 'Mínimo - focar em musculação',
    intensity: 'Moderada com ênfase em força',
    frequency: '4-5x por semana'
  };
  
  if (imc < 25) return {
    focus: 'Manutenção e definição',
    cardio: '2-3x por semana',
    intensity: 'Alta intensidade',
    frequency: '5-6x por semana'
  };
  
  if (imc < 30) return {
    focus: 'Queima de gordura',
    cardio: '4-5x por semana',
    intensity: 'Alta intensidade com circuitos',
    frequency: '5-6x por semana'
  };
  
  return {
    focus: 'Perda de peso e mobilidade',
    cardio: 'Iniciar com caminhadas',
    intensity: 'Baixa intensidade',
    frequency: 'Iniciar com 3x por semana'
  };
};

// Export all data
window.fitnessData = {
  exercises,
  trainingPlans,
  nutritionPlans,
  imcCategories,
  getTrainingRecommendations
};