// --- Magdagdag ng Halimbawang Hayop para may makita agad ---
if (Animals.list.length === 0) {
  Animals.list = [
    {
      id: 'zebra-1',
      name: 'Zebra',
      emoji: '🦓',
      health: 90,
      age: 2,
      hasPest: false,
      readyToSell: false,
      sellPrice: 150
    },
    {
      id: 'elephant-1',
      name: 'Elephant',
      emoji: '🐘',
      health: 75,
      age: 4,
      hasPest: false,
      readyToSell: true,
      sellPrice: 300
    }
  ];
}

// --- Bukas/Sara ng Market Modal ---
document.getElementById('market-btn').addEventListener('click', () => {
  document.getElementById('market-modal').classList.remove('hidden');
  Economy.renderMarket();
});

document.getElementById('close-market').addEventListener('click', () => {
  document.getElementById('market-modal').classList.add('hidden');
});

// --- Simulan ang Laro ---
Economy.init();
Animals.render();
