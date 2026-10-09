const Main = {
  loopRunning: false,

  init() {
    Economy.init();
    Animals.init();
    
    // Game loop — every second
    this.loopRunning = true;
    setInterval(() => {
      if (!this.loopRunning) return;
      Animals.tickSecond();
      Waves.triggerRandom();
      
      // Random insects
      if (Math.random() < 0.08 && Animals.list.length > 0) {
        const randomAnimal = Animals.list[Math.floor(Math.random() * Animals.list.length)];
        Insects.spawn(randomAnimal.id);
      }
    }, 1000);
    
    // Rest button
    document.getElementById('rest-btn').addEventListener('click', () => this.endDay());
    
    // Market
    document.getElementById('market-btn').addEventListener('click', () => {
      document.getElementById('market-modal').classList.remove('hidden');
    });
    document.getElementById('close-market').addEventListener('click', () => {
      document.getElementById('market-modal').classList.add('hidden');
    });
  },

  endDay() {
    this.loopRunning = false;
    Camera.takePhoto('win');
    
    setTimeout(() => {
      Economy.nextDay();
      Animals.resetForNewDay();
      Insects.clearAll();
      this.loopRunning = true;
    }, 2500);
  }
};

// Start game!
document.addEventListener('DOMContentLoaded', () => Main.init());
