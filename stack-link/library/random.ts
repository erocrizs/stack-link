// mulberry32
export function createRNG(seed: number) {
  return function(): number {
    var t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

export function randomIntegerBetween(min: number, max: number, rng: () => number) {
  return min + Math.floor(rng() * (max - min));
}

export function randomPick<T>(list: T[], rng: () => number): T {
  return list[randomIntegerBetween(0, list.length, rng)];
}