const Economy = {
  money: Storage.load('money', 100),
  day: Storage.load('day', 1),
  
  marketItems: [
    { id: 'carrots', name: '🥕 Carrots', price: 10, stock: 10 },
    { id: 'seeds', name: '🌾 Seeds', price: 8, stock: 10 },
    { id: 'meat', name: '🥩 Meat', price: 25, stock: 5 },
    { id: 'fruit', name: '🍌 Fruits', price: 12, stock: 10 },
    { id: 'repellent', name: '🧴 Pest Repellent', price: 30, stock: 3 }
  ],

  init() {
    this.updateUI();
    this.renderMarket();
  },

  earn(amount) {
    this.money += amount;
    Storage.save('money', this.money);
    this.updateUI();
  },

  spend(amount) {
    if (this.money >= amount) {
      this.money -= amount;
      Storage.save('money', this.money);
      this.updateUI();
      return true;
    }
    alert('Kulang ang pera!');
    return false;
  },

  buyItem(index) {
    const item = this.marketItems[index];
    if (item.stock > 0 && this.spend(item.price)) {
      item.stock--;
      this.renderMarket();
      return true;
    }
    alert('Hindi mabili — kulang sa pera o ubos na!');
    return false;
  },

  sellAnimal(animal) {
    if (animal && animal.readyToSell) {
      this.earn(animal.sellPrice);
      const idx = Animals.list.indexOf(animal);
      if (idx > -1) Animals.list.splice(idx, 1);
      Animals.render();
      return true;
    }
    return false;
  },

  nextDay() {
    this.day++;
    Storage.save('day', this.day);
    this.updateUI();
    Animals.render();
  },

  updateUI() {
    document.getElementById('money').textContent = this.money;
    document.getElementById('day').textContent = this.day;
  },

  renderMarket() {
    const container = document.getElementById('market-items');
    if (!container) return;
    container.innerHTML = '';
    
    this.marketItems.forEach((item, index) => {
      const isOutOfStock = item.stock <= 0;
      container.innerHTML += `
        <div style="padding:8px; border-bottom:1px solid #ddd; display:flex; justify-content:space-between; align-items:center;">
          <span>${item.name} — ₱${item.price} (Stock: ${item.stock})</span>
          <button onclick="Economy.buyItem(${index}); this.disabled=true; setTimeout(()=>this.disabled=false, 150);" 
            style="padding:6px 12px; background:${isOutOfStock ? '#ccc' : '#4CAF50'}; color:white; border:none; border-radius:4px; ${isOutOfStock ? 'opacity:0.5; cursor:not-allowed;' : ''}"
            ${isOutOfStock ? 'disabled' : ''}>
            ${isOutOfStock ? 'Ubos na' : 'Buy'}
          </button>
        </div>
      `;
    });
  }
};
