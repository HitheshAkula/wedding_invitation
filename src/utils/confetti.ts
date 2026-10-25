import confetti from 'canvas-confetti';

/**
 * Trigger an auspicious shower of sacred Rose & Jasmine petals + golden dust
 */
export function fireRoyalPetals() {
  const count = 40;
  const defaults = {
    origin: { y: 0.6 },
    zIndex: 9999,
  };

  // Rose red, deep pink, fresh marigold orange, golden yellow, and jasmine cream
  const petalColors = ['#D42B4E', '#FF708F', '#FFA500', '#FFD700', '#FFF8DC', '#E6C687'];

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  // Shimmering gold dust burst
  fire(0.25, {
    spread: 30,
    startVelocity: 45,
    colors: ['#FFE082', '#FFD54F', '#FFCA28', '#C6A15B'],
    scalar: 0.7,
  });

  // Fluttering rose and jasmine petals
  fire(0.3, {
    spread: 60,
    colors: petalColors,
    scalar: 1.2,
    shapes: ['circle'],
  });

  // Wider drift of petals
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 1.1,
    colors: petalColors,
  });

  // Soft slow falling petals from the top
  confetti({
    particleCount: 25,
    angle: 60,
    spread: 55,
    origin: { x: 0, y: 0 },
    colors: petalColors,
    scalar: 1.3,
    gravity: 0.6,
    drift: 0.2,
    ticks: 300,
  });

  confetti({
    particleCount: 25,
    angle: 120,
    spread: 55,
    origin: { x: 1, y: 0 },
    colors: petalColors,
    scalar: 1.3,
    gravity: 0.6,
    drift: -0.2,
    ticks: 300,
  });
}

/**
 * Continuous gentle background drift of gold dust
 */
export function startGentleGoldDust(durationMs = 4000) {
  const end = Date.now() + durationMs;
  const goldColors = ['#F9D371', '#D4AF37', '#FFDF78', '#AA771C'];

  const interval = setInterval(() => {
    if (Date.now() > end) {
      clearInterval(interval);
      return;
    }

    confetti({
      particleCount: 2,
      angle: 90,
      spread: 120,
      origin: { x: Math.random(), y: -0.05 },
      colors: goldColors,
      gravity: 0.35,
      scalar: 0.6,
      drift: (Math.random() - 0.5) * 0.4,
      ticks: 250,
      zIndex: 100,
    });
  }, 350);
}
