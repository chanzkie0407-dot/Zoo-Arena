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
    return false;
  },

  buyItem(index) {
    const item = this.marketItems[index];
    if (item.stock > 0 && this.spend(item.price)) {
      item.stock--;
      return true;
    }
    return false;
  },

  sellAnimal(animal) {
    if (animal.readyToSell) {
      const price = animal.sellPrice;
      this.earn(price);
      return true;
    }
    return false;
  },

  nextDay() {
    this.day++;
    Storage.save('day', this.day);
    this.updateUI();
  },

  updateUI() {
    document.getElementById('money').textContent = this.money;
    document.getElementById('day').textContent = this.day;
  }
};
