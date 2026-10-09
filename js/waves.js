const Waves = {
  active: false,
  types: [
    { id: 'boom', title: '🐾 BABY BOOM!', desc: 'New animals arrived fast!', action: () => Animals.spawnNew(3) },
    { id: 'swarm', title: '🪰 PEST SWARM!', desc: 'Insects everywhere — tap fast!', action: () => Animals.list.forEach(a => Insects.spawn(a.id, 2)) },
    { id: 'golden', title: '🌟 GOLDEN HOUR!', desc: 'Double rewards for perfect care!', action: () => Economy.earn(20) },
    { id: 'storm', title: '⛈️ STORM RUSH!', desc: 'Everyone needs food & water NOW!', action: () => {} }
  ],

  triggerRandom() {
    if (this.active) return;
    if (Math.random() > 0.3) return; // 30% chance each check
    
    this.active = true;
    const wave = this.types[Math.floor(Math.random() * this.types.length)];
    
    const alertBox = document.getElementById('wave-alert');
    document.getElementById('wave-title').textContent = wave.title;
    document.getElementById('wave-desc').textContent = wave.desc;
    alertBox.classList.remove('hidden');
    
    wave.action();
    
    setTimeout(() => {
      alertBox.classList.add('hidden');
      this.active = false;
    }, 8000);
  }
};
