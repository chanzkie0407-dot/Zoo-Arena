const Animals = {
  list: [],

  render() {
    const container = document.getElementById('zoo-area');
    if (!container) return;
    container.innerHTML = '';

    this.list.forEach(animal => {
      container.innerHTML += `
        <div style="border:2px solid #8b5a2b; padding:15px; margin:10px; border-radius:10px; background:#fff;">
          <h3 style="margin:0 0 8px 0;">${animal.emoji} ${animal.name}</h3>
          <p>❤️ Health: ${animal.health}/100</p>
          <p>📅 Age: ${animal.age} days</p>
          ${animal.readyToSell ? `<p style="color:green; font-weight:bold;">✅ Pwede nang ibenta — ₱${animal.sellPrice}</p>` : ''}
          
          ${animal.hasPest ? `<div style="color:red; font-weight:bold; margin:6px 0;">⚠️ MAY PESTE!</div>` : ''}
          <div style="font-size:22px; margin:8px 0;">
            ${Insects.active.filter(i => i.animalId === animal.id).map(i => 
              `<span class="insect" data-id="${i.id}" style="cursor:pointer; padding:4px;">${i.emoji}</span>`
            ).join('')}
          </div>
          
          <button onclick="Animals.feed('${animal.id}')" style="padding:8px 16px; background:#4CAF50; color:white; border:none; border-radius:5px; cursor:pointer;">
            🍖 Pakainin
          </button>
          ${animal.readyToSell ? `
            <button onclick="Economy.sellAnimal(Animals.list.find(a => a.id === '${animal.id}'))" style="padding:8px 16px; background:#2196F3; color:white; border:none; border-radius:5px; cursor:pointer; margin-left:8px;">
              💵 Ibenta
            </button>
          ` : ''}
        </div>
      `;
    });

    document.querySelectorAll('.insect').forEach(el => {
      el.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        Insects.clear(id);
      });
    });
  },

  feed(id) {
    const animal = this.list.find(a => a.id === id);
    if (animal) {
      animal.health = Math.min(100, animal.health + 15);
      this.render();
    }
  }
};
