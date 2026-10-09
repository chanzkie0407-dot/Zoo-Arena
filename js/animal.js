const Animals = {
  list: [],
  types: [
    { id: 'rabbit', emoji: '🐇', name: 'Rabbit', food: 'carrots', sellPrice: 50 },
    { id: 'deer', emoji: '🦌', name: 'Deer', food: 'fruit', sellPrice: 80 },
    { id: 'bird', emoji: '🐦', name: 'Bird', food: 'seeds', sellPrice: 40 },
    { id: 'monkey', emoji: '🐒', name: 'Monkey', food: 'fruit', sellPrice: 100 },
    { id: 'bear', emoji: '🐻', name: 'Bear', food: 'meat', sellPrice: 200 }
  ],
  goalTarget: 5,
  caredToday: 0,

  init() {
    this.spawnNew(3); // Start with 3 animals
    this.updateGoalUI();
  },

  spawnNew(count) {
    for (let i = 0; i < count; i++) {
      const type = this.types[Math.floor(Math.random() * this.types.length)];
      const animal = {
        id: Date.now() + Math.random(),
        ...type,
        timeLeft: 120, // 2 minutes in seconds
        fed: false,
        watered: false,
        happy: true,
        readyToSell: false,
        hasPest: false
      };
      this.list.push(animal);
    }
    this.render();
  },

  tickSecond() {
    this.list.forEach((animal, index) => {
      if (animal.timeLeft > 0) {
        const penalty = animal.hasPest ? 2 : 1; // Faster timer if pests!
        animal.timeLeft -= penalty;
        
        if (animal.fed && animal.watered) {
          this.completeCare(animal, index);
        } else if (animal.timeLeft <= 0) {
          this.loseAnimal(index);
        }
      }
    });
    this.render();
  },

  feed(animalId) {
    const animal = this.list.find(a => a.id === animalId);
    if (animal && !animal.fed) {
      animal.fed = true;
      this.checkReady(animal);
      this.render();
    }
  },

  water(animalId) {
    const animal = this.list.find(a => a.id === animalId);
    if (animal && !animal.watered) {
      animal.watered = true;
      this.checkReady(animal);
      this.render();
    }
  },

  checkReady(animal) {
    if (animal.fed && animal.watered && animal.timeLeft > 0) {
      animal.readyToSell = true;
      animal.timeLeft = 120; // Reset timer
      Economy.earn(15);
      this.caredToday++;
      this.updateGoalUI();
    }
  },

  completeCare(animal, index) {
    // Already reset & rewarded
  },

  loseAnimal(index) {
    this.list.splice(index, 1);
    Camera.takePhoto('fail');
  },

  updateGoalUI() {
    document.getElementById('goal').textContent = `${this.caredToday}/${this.goalTarget}`;
    if (this.caredToday >= this.goalTarget) {
      document.getElementById('rest-btn').classList.remove('hidden');
    }
  },

  render() {
    const container = document.getElementById('zoo-area');
    container.innerHTML = '';
    
    this.list.forEach(animal => {
      const mins = Math.floor(animal.timeLeft / 60);
      const secs = Math.floor(animal.timeLeft % 60);
      let timeClass = 'green';
      if (animal.timeLeft <= 30) timeClass = 'red';
      else if (animal.timeLeft <= 60) timeClass = 'yellow';
      
      const card = document.createElement('div');
      card.className = `animal-card ${timeClass === 'red' ? 'urgent' : ''}`;
      card.innerHTML = `
        <div style="font-size:28px">${animal.emoji} ${animal.name}</div>
        <div class="timer ${timeClass}">⏱️ ${mins}:${secs.toString().padStart(2,'0')}</div>
        <div class="needs">
          <button class="need-btn ${animal.fed ? 'done' : ''}" onclick="Animals.feed(${animal.id})">
            ${animal.fed ? '✅' : '🍽️'} Feed
          </button>
          <button class="need-btn ${animal.watered ? 'done' : ''}" onclick="Animals.water(${animal.id})">
            ${animal.watered ? '✅' : '💧'} Water
          </button>
        </div>
        ${animal.readyToSell ? `<button style="background:#ffc100; border:none; padding:6px; border-radius:6px; margin-top:5px" onclick="Economy.sellAnimal(Animals.list.find(a=>a.id===${animal.id}))">💰 Sell for ₱${animal.sellPrice}</button>` : ''}
        ${animal.hasPest ? '<div style="color:red; font-size:12px">⚠️ Pests nearby! Clear fast!</div>' : ''}
      `;
      container.appendChild(card);
    });
  },

  resetForNewDay() {
    this.caredToday = 0;
    this.list = [];
    this.spawnNew(3);
    this.updateGoalUI();
    document.getElementById('rest-btn').classList.add('hidden');
  }
};
