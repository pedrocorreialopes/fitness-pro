/**
 * Timer Module
 * Handles rest time between sets with audio notifications
 */

class Timer {
  constructor() {
    this.displayMinutes = document.querySelector('.timer-minutes');
    this.displaySeconds = document.querySelector('.timer-seconds');
    this.startBtn = document.getElementById('startTimer');
    this.pauseBtn = document.getElementById('pauseTimer');
    this.resetBtn = document.getElementById('resetTimer');
    this.presetButtons = document.querySelectorAll('[data-time]');
    
    this.totalTime = 60; // Default 1 minute
    this.currentTime = 60;
    this.isRunning = false;
    this.isPaused = false;
    this.intervalId = null;
    this.audioContext = null;
    
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.updateDisplay();
    this.setupAudio();
  }

  setupEventListeners() {
    this.startBtn.addEventListener('click', () => this.start());
    this.pauseBtn.addEventListener('click', () => this.pause());
    this.resetBtn.addEventListener('click', () => this.reset());
    
    this.presetButtons.forEach(button => {
      button.addEventListener('click', () => {
        const time = parseInt(button.dataset.time);
        this.setTime(time);
      });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (this.isRunning) {
          this.pause();
        } else {
          this.start();
        }
      } else if (e.code === 'KeyR' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        this.reset();
      }
    });

    // Visibility change - pause when tab is not visible
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && this.isRunning) {
        this.pause();
      }
    });
  }

  setupAudio() {
    // Create audio context for notifications
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }

  playSound(frequency = 440, duration = 200) {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration / 1000);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration / 1000);
  }

  setTime(seconds) {
    if (this.isRunning) {
      this.pause();
    }
    
    this.totalTime = seconds;
    this.currentTime = seconds;
    this.updateDisplay();
    
    // Visual feedback
    this.resetBtn.classList.add('scale-in');
    setTimeout(() => this.resetBtn.classList.remove('scale-in'), 300);
  }

  start() {
    if (this.currentTime <= 0) {
      this.reset();
      return;
    }

    this.isRunning = true;
    this.isPaused = false;
    this.startBtn.disabled = true;
    this.pauseBtn.disabled = false;
    
    // Enable wake lock if available (keep screen on)
    this.requestWakeLock();
    
    this.intervalId = setInterval(() => {
      this.currentTime--;
      this.updateDisplay();
      
      // Play sound at specific intervals
      if (this.currentTime === 10) {
        this.playSound(880, 100); // High pitch for 10 seconds
      } else if (this.currentTime === 5) {
        this.playSound(880, 100);
      } else if (this.currentTime === 0) {
        this.timerComplete();
      }
      
      // Update document title with time
      document.title = `${this.formatTime(this.currentTime)} - Fitness Pro Timer`;
      
    }, 1000);

    // Visual feedback
    this.startBtn.classList.add('active');
    this.playSound(523, 100); // C5 note
  }

  pause() {
    this.isRunning = false;
    this.isPaused = true;
    this.startBtn.disabled = false;
    this.pauseBtn.disabled = true;
    
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    // Release wake lock
    this.releaseWakeLock();
    
    // Reset document title
    document.title = 'Fitness Pro - Cronômetro de Descanso';
    
    // Visual feedback
    this.startBtn.classList.remove('active');
    this.playSound(392, 100); // G4 note
  }

  reset() {
    this.isRunning = false;
    this.isPaused = false;
    this.currentTime = this.totalTime;
    
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    this.startBtn.disabled = false;
    this.pauseBtn.disabled = true;
    
    // Release wake lock
    this.releaseWakeLock();
    
    // Reset document title
    document.title = 'Fitness Pro - Cronômetro de Descanso';
    
    this.updateDisplay();
    
    // Visual feedback
    this.startBtn.classList.remove('active');
    this.playSound(261, 100); // C4 note
  }

  timerComplete() {
    this.pause();
    this.playCompletionSound();
    this.showCompletionNotification();
    
    // Auto-reset after completion
    setTimeout(() => {
      this.reset();
    }, 3000);
  }

  playCompletionSound() {
    // Play a melody when timer completes
    const melody = [
      { freq: 523, duration: 200 }, // C5
      { freq: 659, duration: 200 }, // E5
      { freq: 784, duration: 200 }, // G5
      { freq: 1046, duration: 400 } // C6
    ];

    melody.forEach((note, index) => {
      setTimeout(() => {
        this.playSound(note.freq, note.duration);
      }, index * 250);
    });
  }

  showCompletionNotification() {
    // Browser notification if available
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Tempo de descanso finalizado!', {
        body: 'Hora de voltar ao treino! 💪',
        icon: '/favicon.ico',
        vibrate: [200, 100, 200]
      });
    }

    // Visual notification
    document.body.style.backgroundColor = '#10b981';
    setTimeout(() => {
      document.body.style.backgroundColor = '';
    }, 1000);

    // Flash the timer display
    this.displayMinutes.parentElement.style.animation = 'pulse 0.5s ease-in-out';
    setTimeout(() => {
      this.displayMinutes.parentElement.style.animation = '';
    }, 500);
  }

  async requestWakeLock() {
    if ('wakeLock' in navigator) {
      try {
        this.wakeLock = await navigator.wakeLock.request('screen');
        this.wakeLock.addEventListener('release', () => {
          console.log('Wake Lock was released');
        });
        console.log('Wake Lock is active');
      } catch (err) {
        console.error(`${err.name}, ${err.message}`);
      }
    }
  }

  releaseWakeLock() {
    if (this.wakeLock) {
      this.wakeLock.release();
      this.wakeLock = null;
    }
  }

  updateDisplay() {
    const minutes = Math.floor(this.currentTime / 60);
    const seconds = this.currentTime % 60;
    
    this.displayMinutes.textContent = minutes.toString().padStart(2, '0');
    this.displaySeconds.textContent = seconds.toString().padStart(2, '0');

    // Update progress bar if exists
    this.updateProgressBar();
    
    // Update button states based on time
    if (this.currentTime <= 10) {
      this.displayMinutes.style.color = '#ef4444';
      this.displaySeconds.style.color = '#ef4444';
    } else {
      this.displayMinutes.style.color = '';
      this.displaySeconds.style.color = '';
    }
  }

  updateProgressBar() {
    const progressBar = document.querySelector('.timer-progress');
    if (progressBar) {
      const progress = (this.currentTime / this.totalTime) * 100;
      progressBar.style.width = `${progress}%`;
      
      // Change color based on progress
      if (progress <= 20) {
        progressBar.style.backgroundColor = '#ef4444'; // Red
      } else if (progress <= 50) {
        progressBar.style.backgroundColor = '#f59e0b'; // Yellow
      } else {
        progressBar.style.backgroundColor = '#10b981'; // Green
      }
    }
  }

  formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  // Get current timer state
  getState() {
    return {
      currentTime: this.currentTime,
      totalTime: this.totalTime,
      isRunning: this.isRunning,
      isPaused: this.isPaused
    };
  }

  // Set timer state (for persistence)
  setState(state) {
    this.currentTime = state.currentTime;
    this.totalTime = state.totalTime;
    this.isRunning = state.isRunning;
    this.isPaused = state.isPaused;
    this.updateDisplay();
    
    if (this.isRunning && !this.isPaused) {
      this.start();
    }
  }

  // Request notification permission
  static requestNotificationPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }
}

// Add CSS for timer enhancements
const timerStyles = `
  .timer-display {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 2rem;
    padding: 2rem;
    background: var(--bg-secondary);
    border-radius: var(--radius-2xl);
    border: 2px solid var(--border-color);
    box-shadow: var(--shadow-lg);
  }

  .timer-minutes,
  .timer-seconds {
    font-size: 4rem;
    font-weight: var(--font-weight-bold);
    font-family: 'Courier New', monospace;
    transition: color var(--transition-fast);
  }

  .timer-separator {
    font-size: 3rem;
    font-weight: var(--font-weight-bold);
    color: var(--text-primary);
    animation: blink 1s infinite;
  }

  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0.3; }
  }

  .timer-progress {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 4px;
    background: var(--color-primary);
    border-radius: var(--radius-full);
    transition: width 0.3s ease, background-color 0.3s ease;
  }

  .timer-presets {
    margin-top: 2rem;
    padding: 1.5rem;
    background: var(--bg-secondary);
    border-radius: var(--radius-xl);
    border: 1px solid var(--border-color);
  }

  .preset-buttons {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .btn--outline[data-time] {
    min-width: 60px;
    padding: 0.75rem 1rem;
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
  }

  .btn--outline[data-time]:hover {
    background: var(--color-primary);
    color: var(--color-white);
    border-color: var(--color-primary);
  }

  .timer-controls {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .timer-controls .btn {
    min-width: 100px;
    padding: 1rem 1.5rem;
    font-size: var(--font-size-lg);
  }

  .btn.active {
    background: var(--color-danger);
    animation: pulse 1s infinite;
  }

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }

  @media (max-width: 768px) {
    .timer-minutes,
    .timer-seconds {
      font-size: 3rem;
    }
    
    .timer-separator {
      font-size: 2.5rem;
    }
    
    .timer-controls {
      flex-direction: column;
      align-items: center;
    }
    
    .preset-buttons {
      justify-content: center;
    }
  }
`;

// Add styles to document - avoid conflicts
const timerStyleSheet = document.createElement('style');
timerStyleSheet.textContent = timerStyles;
document.head.appendChild(timerStyleSheet);

// Initialize Timer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Request notification permission
  Timer.requestNotificationPermission();
  
  // Initialize timer
  window.fitnessTimer = new Timer();
  
  // Add keyboard shortcuts info
  const timerSection = document.getElementById('cronometro');
  if (timerSection) {
    const info = document.createElement('div');
    info.className = 'timer-info';
    info.innerHTML = `
      <p><small><i class="fas fa-info-circle"></i> Atalhos: Espaço = Iniciar/Pausar | Ctrl+R = Reiniciar</small></p>
    `;
    timerSection.appendChild(info);
  }
});