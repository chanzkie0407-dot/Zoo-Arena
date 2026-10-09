// --- Siguraduhin na laging may hayop ---
function initAnimals() {
  if (!Animals.list || Animals.list.length === 0) {
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
}

// --- Market Button ---
document.getElementById('market-btn').addEventListener('click', () => {
  const modal = document.getElementById('market-modal');
  if (modal) modal.classList.remove('hidden');
  if (typeof Economy.renderMarket === 'function') Economy.renderMarket();
});

const closeBtn = document.getElementById('close-market');
if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    const modal = document.getElementById('market-modal');
    if (modal) modal.classList.add('hidden');
  });
}

// --- Sell Button ---
document.getElementById('sell-btn').addEventListener('click', () => {
  const ready = Animals.list.filter(a => a.readyToSell);
  if (ready.length === 0) {
    alert('Wala pang hayop na pwedeng ibenta!');
  } else {
    const names = ready.map(a => `${a.emoji} ${a.name} — ₱${a.sellPrice}`).join('\n');
    alert('Mga pwedeng ibenta:\n\n' + names);
  }
});

// --- Stats Button ---
document.getElementById('stats-btn').addEventListener('click', () => {
  const total = Animals.list.length;
  const withPest = Animals.list.filter(a => a.hasPest).length;
  alert(`📊 Zoo Stats:
- Kabuuan ng hayop: ${total}
- May peste: ${withPest}
- Walang peste: ${total - withPest}
- Pera: ₱${Economy.money}`);
});

// --- PESTE SYSTEM — KUSANG LUMALABAS ---
function spawnRandomPest() {
  const safeAnimals = Animals.list.filter(a => !a.hasPest);
  if (safeAnimals.length === 0) return;

  const randomAnimal = safeAnimals[Math.floor(Math.random() * safeAnimals.length)];
  const pestCount = Math.floor(Math.random() * 3) + 1; // 1 hanggang 3
  Insects.spawn(randomAnimal.id, pestCount);
}

// Unang peste — lalabas 3 segundo pagkabukas
setTimeout(spawnRandomPest, 3000);

// Kasunod — bawat 20 segundo
setInterval(spawnRandomPest, 20000);

// --- Simulan ang Laro ---
initAnimals();
if (typeof Economy.init === 'function') Economy.init();
if (typeof Animals.render === 'function') Animals.render();
