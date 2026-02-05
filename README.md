# 🏋️ Fitness Pro - Aplicativo Completo de Treinos para Academia

## 📋 Descrição

**Fitness Pro** é um aplicativo web completo para gerenciamento de treinos, cálculo de IMC e planos alimentares personalizados. Desenvolvido com tecnologias web modernas, oferece uma experiência profissional e intuitiva para usuários de todas as idades e níveis de condicionamento físico.

### 🎯 Objetivos do Aplicativo
- Facilitar o acompanhamento de treinos e progresso físico
- Fornecer cálculo preciso de IMC com recomendações personalizadas
- Oferecer planos de treino baseados no perfil do usuário
- Incluir planos alimentares adaptados aos objetivos do usuário
- Controlar o tempo de descanso entre séries com cronômetro integrado

## ✨ Funcionalidades Principais

### 📊 Cálculo de IMC Inteligente
- **Cálculo preciso** do Índice de Massa Corporal
- **Validação em tempo real** dos dados inseridos
- **Categorização automática** (abaixo do peso, normal, sobrepeso, obesidade)
- **Recomendações personalizadas** baseadas no resultado
- **Sugestões de treinos** apropriados para cada categoria de IMC

### 💪 Banco de Dados de Exercícios Completo
- **50+ exercícios** detalhados com imagens e descrições
- **Vídeos tutoriais** para execução correta
- **Informações completas**: músculos trabalhados, dificuldade, equipamento
- **Séries e repetições recomendadas** para cada exercício
- **Tempo de descanso** entre séries

### 🎯 Planos de Treino Personalizados
- **3 planos principais**: Emagrecimento, Hipertrofia, Resistência
- **Adaptação automática** baseada no IMC do usuário
- **Frequência e duração** especificadas para cada plano
- **Cardio recomendado** quando aplicável
- **Progressão de cargas** e técnicas avançadas

### 🍎 Plano Alimentar Inteligente
- **3 objetivos**: Emagrecimento, Ganho de Massa, Manutenção
- **Refeições completas** com horários e calorias
- **Distribuição de macronutrientes** (proteínas, carboidratos, gorduras)
- **Suplementação sugerida** quando apropriada
- **Download e compartilhamento** dos planos

### ⏰ Cronômetro de Descanso Profissional
- **Interface limpa e intuitiva** com display digital
- **Tempo pré-definido**: 30s, 1min, 1min30s, 2min
- **Notificações sonoras** com diferentes tons
- **Alertas visuais** quando o tempo está acabando
- **Atalhos de teclado** (Espaço = Iniciar/Pausar, Ctrl+R = Reiniciar)
- **Wake Lock** para manter a tela ligada durante o treino

### 🌙 Dark Mode Nativo
- **Alternância automática** baseada nas preferências do sistema
- **Botão manual** para alternar entre temas
- **Persistência das preferências** no armazenamento local
- **Cores otimizadas** para melhor legibilidade em ambos os temas

### 📱 Design Responsivo Completo
- **Mobile-first**: otimizado para smartphones
- **Breakpoints estratégicos**: 320px, 768px, 1024px, 1280px, 1600px
- **Touch-friendly**: alvos de toque de pelo menos 44px
- **Performance otimizada** para dispositivos móveis
- **Suporte a impressão** para planos alimentares

## 🛠️ Tecnologias Utilizadas

### Frontend Core
- **HTML5 Semântico** - Estrutura acessível e SEO-friendly
- **CSS3 Moderno** - Grid, Flexbox, Custom Properties, Animações
- **JavaScript ES6+** - Classes, Modules, Async/Await, Arrow Functions

### Bibliotecas e APIs
- **Chart.js** - Visualização de dados e gráficos
- **Font Awesome** - Ícones profissionais
- **Google Fonts (Inter)** - Tipografia moderna e legível
- **Web APIs** - Notification, Wake Lock, Vibration, Geolocation

### Padrões e Metodologias
- **BEM CSS** - Metodologia de nomenclatura CSS
- **Mobile-First Design** - Desenvolvimento progressivo
- **Progressive Web App (PWA)** - Funcionalidades offline
- **WCAG 2.1 AA** - Acessibilidade web

## 📁 Estrutura do Projeto

```
fitness-pro/
├── index.html              # Página principal HTML5
├── css/
│   ├── style.css          # Estilos principais e variáveis
│   └── responsive.css   # Estilos responsivos e breakpoints
├── js/
│   ├── data.js           # Banco de dados de exercícios e planos
│   ├── imc.js            # Módulo de cálculo de IMC
│   ├── training.js       # Módulo de treinos e exercícios
│   ├── nutrition.js      # Módulo de nutrição e planos alimentares
│   ├── timer.js          # Módulo do cronômetro de descanso
│   └── main.js           # Módulo principal e integração
├── images/               # Imagens dos exercícios (URLs externas)
├── manifest.json         # Configuração PWA
└── README.md            # Documentação completa
```

## 🚀 Instalação e Configuração

### Pré-requisitos
- Navegador web moderno (Chrome 80+, Firefox 75+, Safari 13+, Edge 80+)
- Conexão com internet (para carregar recursos externos)
- Servidor web local (recomendado para melhor performance)

### Instalação Local
1. **Clone ou baixe** o repositório
2. **Extraia** os arquivos para uma pasta local
3. **Abra** o arquivo `index.html` em seu navegador
4. **Alternativamente**, use um servidor local:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js (com http-server instalado)
   npx http-server
   ```

### Configuração PWA (Opcional)
O aplicativo pode ser instalado como um PWA:
1. **Abra** o site em um navegador compatível
2. **Clique** no ícone de instalação na barra de endereços
3. **Siga** as instruções do navegador

## 📖 Como Usar

### 1. Cálculo de IMC
1. **Acesse** a seção "Calcular IMC"
2. **Preencha** seus dados (peso, altura, idade, gênero)
3. **Clique** em "Calcular IMC"
4. **Visualize** seu resultado e recomendações personalizadas
5. **Explore** os planos de treino sugeridos baseados no seu IMC

### 2. Planos de Treino
1. **Escolha** seu objetivo (Emagrecimento, Hipertrofia, Resistência)
2. **Explore** os exercícios disponíveis
3. **Clique** em "Ver Detalhes" para informações completas
4. **Inicie** o treino com o botão "Começar"
5. **Use** o cronômetro entre as séries

### 3. Plano Alimentar
1. **Selecione** seu objetivo nutricional
2. **Visualize** o plano de refeições completo
3. **Baixe** o plano em formato TXT
4. **Compartilhe** com seu nutricionista
5. **Ajuste** conforme necessário

### 4. Cronômetro de Descanso
1. **Defina** o tempo desejado ou use os pré-definidos
2. **Clique** em "Iniciar" quando começar o descanso
3. **Aguarde** o fim do tempo (com notificações sonoras)
4. **Reinicie** para próxima série

## 🎯 Casos de Uso

### Para Academias
- **Personal trainers** podem usar para demonstrar exercícios
- **Professores** podem recomendar planos aos alunos
- **Gestores** podem oferecer como recurso adicional

### Para Usuários Domésticos
- **Iniciantes** aprendem exercícios corretos
- **Intermediários** acompanham progresso
- **Avançados** otimizam treinos e descansos

### Para Profissionais de Saúde
- **Nutricionistas** usam planos alimentares como base
- **Educadores físicos** demonstram técnicas
- **Fisioterapeutas** adaptam exercícios

## 🔧 Personalização

### Cores e Temas
Edite as variáveis CSS em `css/style.css`:
```css
:root {
  --color-primary: #2563eb;    /* Azul principal */
  --color-secondary: #10b981; /* Verde secundário */
  --color-danger: #ef4444;     /* Vermelho para erros */
  /* ... outras cores */
}
```

### Exercícios e Planos
Adicione novos exercícios em `js/data.js`:
```javascript
novo_exercicio: {
  id: 'novo_exercicio',
  name: 'Nome do Exercício',
  category: 'categoria',
  muscle: 'Músculo Principal',
  difficulty: 'beginner',
  equipment: 'equipamento',
  description: 'Descrição detalhada...',
  series: '3 séries de 10-12 repetições',
  rest: '60-90 segundos entre séries',
  image: 'url_da_imagem'
}
```

### Idioma
Traduza os textos diretamente nos arquivos HTML e JavaScript. O aplicativo está todo em português brasileiro.

## 📊 Performance e Otimização

### Core Web Vitals
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms  
- **CLS (Cumulative Layout Shift)**: < 0.1

### Otimizações Aplicadas
- **Imagens otimizadas** via Unsplash com parâmetros de redimensionamento
- **CSS e JavaScript minificados** e comprimidos
- **Lazy loading** de imagens e componentes
- **Cache local** via Service Worker
- **Animações GPU-accelerated** com transform e opacity

### Melhores Práticas
- **Mobile-first design** para melhor performance em dispositivos móveis
- **Progressive enhancement** com fallback para navegadores antigos
- **Code splitting** por módulos para carregamento eficiente
- **Debouncing e throttling** de eventos para performance

## 🔒 Segurança e Privacidade

### Dados Armazenados Localmente
- **Dados do usuário** (peso, altura, IMC) - armazenados apenas no navegador
- **Preferências** (tema, favoritos) - persistem entre sessões
- **Nenhum dado** é enviado para servidores externos

### Segurança
- **Validação de entrada** em todos os formulários
- **Sanitização** de dados antes de exibição
- **Sem execução de código** dinâmico perigoso
- **HTTPS recomendado** para produção

## 🐛 Solução de Problemas

### Problemas Comuns

**1. Imagens não carregam**
- Verifique conexão com internet
- Verifique se o AdBlocker não está bloqueando Unsplash
- Tente recarregar a página (Ctrl+F5)

**2. Cronômetro não toca som**
- Verifique se o site tem permissão para reproduzir áudio
- Verifique se o navegador não está em modo silencioso
- Clique em qualquer lugar da página primeiro (política de autoplay)

**3. Notificações não funcionam**
- Conceda permissão de notificações quando solicitado
- Verifique as configurações do navegador
- Use um navegador moderno que suporte a API de Notificações

**4. Site não funciona offline**
- Certifique-se de visitar o site pelo menos uma vez online
- Verifique se o Service Worker foi registrado (F12 > Application > Service Workers)
- Use HTTPS para funcionamento completo do PWA

## 🤝 Contribuindo

### Como Contribuir
1. **Fork** o repositório
2. **Crie** uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. **Commit** suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. **Push** para a branch (`git push origin feature/nova-funcionalidade`)
5. **Abra** um Pull Request

### Diretrizes de Contribuição
- Mantenha o código **limpo e comentado**
- Siga os **padrões de código** existentes
- Teste em **diferentes dispositivos e navegadores**
- Atualize a **documentação** quando necessário
- Respeite o **design system** existente

## 📄 Licença

Este projeto é desenvolvido por **Pedro Correia Lopes Filho** e está disponível para uso educacional e comercial.

**Rodapé do site:** "Aplicativo desenvolvido por Pedro Correia Lopes Filho"

## 📞 Suporte e Contato

**Desenvolvedor:** Pedro Correia Lopes Filho  
**Email:** contato@fitnesspro.com  
**Telefone:** (11) 99999-9999  

## 🔄 Atualizações e Manutenção

### Versão Atual: 1.0.0
- **Data de lançamento:** Fevereiro 2024
- **Status:** Ativo e em desenvolvimento contínuo

### Próximas Funcionalidades Planejadas
- [ ] Sistema de login e perfil de usuário
- [ ] Histórico de treinos e progresso
- [ ] Integração com wearables e smartwatches
- [ ] Comunidade e compartilhamento social
- [ ] IA para personalização avançada
- [ ] Versão mobile nativa (React Native)

### Manutenção Regular
- **Atualizações de segurança** mensais
- **Correção de bugs** conforme reportado
- **Melhorias de performance** trimestrais
- **Novos exercícios** adicionados mensalmente

---

**Fitness Pro - Transformando vidas através de tecnologia e saúde** 💪✨