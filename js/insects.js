const Insects = {
  active: [],
  types: ['🪰', '🐜', '🦟', '🐝'],

  spawn(animalId, count = 1) {
    for (let i = 0; i < count; i++) {
      const insect = {
        id: Date.now() + Math.random(),
        animalId: animalId,
        emoji: this.types[Math.floor(Math.random() * this.types.length)]
      };
      this.active.push(insect);
      
      const animal = Animals.list.find(a => a.id === animalId);
      if (animal) animal.hasPest = true;
    }
    this.render();
  },

  clear(insectId) {
    const idx = this.active.findIndex(i => i.id === insectId);
    if (idx > -1) {
      const insect = this.active[idx];
      this.active.splice(idx, 1);
      Economy.earn(3);
      
      const stillHas = this.active.some(i => i.animalId === insect.animalId);
      if (!stillHas) {
        const animal = Animals.list.find(a => a.id === insect.animalId);
        if (animal) animal.hasPest = false;
      }
      this.render();
    }
  },

  clearAll() {
    this.active.forEach(i => {
      const animal = Animals.list.find(a => a.id === i.animalId);
      if (animal) animal.hasPest = false;
    });
    this.active = [];
    this.render();
  },

  render() {
    // Re-render animals to show pest status
    Animals.render();
    
    // Add insect click events
    document.querySelectorAll('.insect').forEach(el => {
      el.addEventListener('click', (e) => {
        const id = parseFloat(e.target.dataset.id);
        this.clear(id);
      });
    });
  }
};
