const Animals = {
  list: [],

  render() {
    const container = document.getElementById('animals-container');
    if (!container) return;
    container.innerHTML = '';

    this.list.forEach(animal => {
      container.innerHTML += `
        <div class="animal-card" style="border:1px solid #ccc; padding:12px; margin:8px; border-radius:8px;">
          <h4>${animal.emoji} ${animal.name}</h4>
          <p>Health: ${animal.health}/100</p>
          <p>Age: ${animal.age} days</p>
          ${animal.readyToSell ? `<p style="color:green">✅ Pwede nang ibenta — ₱${animal.sellPrice}</p>` : ''}
          
          <!-- ✅ Peste Warning + Insect Emojis DITO -->
          ${animal.hasPest ? `<div style="color:red; font-size:12px; margin:4px 0;">⚠️ May peste! Tanggalin mo!</div>` : ''}
          <div class="insects-here">
            ${Insects.active.filter(i => i.animalId === animal.id).map(i => 
              `<span class="insect" data-id="${i.id}" style="cursor:pointer; font-size:18px; margin:0 2px;">${i.emoji}</span>`
            ).join('')}
          </div>
          
          <button onclick="Animals.feed('${animal.id}')">Pakainin</button>
          ${animal.readyToSell ? `<button onclick="Economy.sellAnimal(Animals.list.find(a=>a.id==='${animal.id}'))">Ibenta</button>` : ''}
        </div>
      `;
    });

    // Click events sa mga insekto
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

  // Ibalik dito ang IBA PANG functions mo (add, grow, checkReady, etc.)
};
