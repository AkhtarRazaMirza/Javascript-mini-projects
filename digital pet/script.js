const DEFAULT_PETS = [
  { id: 1, name: 'Fluffy', type: 'Cat', hunger: 50, energy: 70, happiness: 80, image: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Cat03.jpg' },
  { id: 2, name: 'Buddy', type: 'Dog', hunger: 40, energy: 80, happiness: 90, image: 'https://upload.wikimedia.org/wikipedia/commons/3/32/Golden_retriever_eating_pigs_foot.jpg' },
  { id: 3, name: 'Spike', type: 'Komodo', hunger: 60, energy: 60, happiness: 75, image: 'https://upload.wikimedia.org/wikipedia/commons/3/32/Komodo_dragon_%28Varanus_komodoensis%29.jpg' },
  { id: 4, name: 'Chirpy', type: 'Bird', hunger: 30, energy: 90, happiness: 85, image: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Parakeet_blue.jpg' }
];

class Pet {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.type = data.type;
    this.hunger = Number(data.hunger) || 0;
    this.energy = Number(data.energy) || 0;
    this.happiness = Number(data.happiness) || 0;
    this.image = data.image || '';
  }

  clampStats() {
    this.hunger = Math.max(0, Math.min(100, Math.round(this.hunger)));
    this.energy = Math.max(0, Math.min(100, Math.round(this.energy)));
    this.happiness = Math.max(0, Math.min(100, Math.round(this.happiness)));
  }

  feed(amount = 10) {
    this.hunger -= amount; // lower hunger is better
    this.energy += Math.round(amount * 0.4);
    this.happiness += Math.round(amount * 0.3);
    this.clampStats();
  }

  play(duration = 10) {
    this.happiness += Math.round(duration * 1.0);
    this.energy -= Math.round(duration * 0.9);
    this.hunger += Math.round(duration * 0.6);
    this.clampStats();
  }

  sleep(duration = 20) {
    this.energy += Math.round(duration * 1.2);
    this.hunger += Math.round(duration * 0.4);
    this.clampStats();
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      hunger: this.hunger,
      energy: this.energy,
      happiness: this.happiness,
      image: this.image
    };
  }
}

// State + DOM refs
let petInstances = [];
let currentPetIndex = 0;

const el = id => document.getElementById(id);
const petAvatar = el('pet-avatar');
const petTitle = el('pet-title');
const petName = el('pet-name');
const hungerLevel = el('hunger-level');
const hungerBar = el('hunger-bar');
const energyLevel = el('energy-level');
const energyBar = el('energy-bar');
const happinessLevel = el('happiness-level');
const happinessBar = el('happiness-bar');
const feedButton = el('feed-button');
const playButton = el('play-button');
const sleepButton = el('sleep-button');
const prevButton = el('prev-pet');
const nextButton = el('next-pet');

function savePets() {
  try {
    const data = petInstances.map(p => p.toJSON());
    localStorage.setItem('digital-pets', JSON.stringify(data));
  } catch (e) {
    console.warn('Failed to save pets', e);
  }
}

function loadPets() {
  try {
    const raw = localStorage.getItem('digital-pets');
    if (raw) {
      const parsed = JSON.parse(raw);
      petInstances = parsed.map(p => new Pet(p));
      return;
    }
  } catch (e) {
    console.warn('Failed to load pets', e);
  }
  // fallback
  petInstances = DEFAULT_PETS.map(p => new Pet(p));
}

function updatePetDisplay() {
  const currentPet = petInstances[currentPetIndex];
  if (!currentPet) return;
  // update avatar (show initial) instead of using an <img>
  if (petAvatar) {
    petAvatar.textContent = currentPet.name ? currentPet.name.charAt(0).toUpperCase() : '';
    petAvatar.setAttribute('title', currentPet.name + ' — ' + currentPet.type);
  }
  petTitle.textContent = currentPet.name;
  petName.textContent = currentPet.name;

  hungerLevel.textContent = currentPet.hunger;
  hungerBar.style.width = `${currentPet.hunger}%`;

  energyLevel.textContent = currentPet.energy;
  energyBar.style.width = `${currentPet.energy}%`;

  happinessLevel.textContent = currentPet.happiness;
  happinessBar.style.width = `${currentPet.happiness}%`;
}

function animatePet() {
  const target = petAvatar || petTitle;
  if (!target) return;
  target.classList.remove('pet-anim');
  void target.offsetWidth; // reflow to restart animation
  target.classList.add('pet-anim');
}

// Initialize
loadPets();
updatePetDisplay();

// cleanup animation class after animation ends
const animTarget = petAvatar || petTitle;
if (animTarget) {
  animTarget.addEventListener('animationend', () => animTarget.classList.remove('pet-anim'));
}

// Actions
feedButton.addEventListener('click', () => {
  const current = petInstances[currentPetIndex];
  current.feed(10);
  animatePet();
  updatePetDisplay();
  savePets();
});

playButton.addEventListener('click', () => {
  const current = petInstances[currentPetIndex];
  current.play(12);
  animatePet();
  updatePetDisplay();
  savePets();
});

sleepButton.addEventListener('click', () => {
  const current = petInstances[currentPetIndex];
  current.sleep(28);
  animatePet();
  updatePetDisplay();
  savePets();
});

// Pet navigation
if (prevButton && nextButton) {
  prevButton.addEventListener('click', () => {
    currentPetIndex = (currentPetIndex - 1 + petInstances.length) % petInstances.length;
    updatePetDisplay();
  });
  nextButton.addEventListener('click', () => {
    currentPetIndex = (currentPetIndex + 1) % petInstances.length;
    updatePetDisplay();
  });
}

// Keyboard support
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    currentPetIndex = (currentPetIndex - 1 + petInstances.length) % petInstances.length;
    updatePetDisplay();
  } else if (e.key === 'ArrowRight') {
    currentPetIndex = (currentPetIndex + 1) % petInstances.length;
    updatePetDisplay();
  }
});