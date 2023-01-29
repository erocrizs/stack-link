export default class RNG {
  private rng: () => number;

  constructor(seed: number) {
    // mulberry32
    this.rng = function () {
      var t = seed += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  next() {
    return this.rng();
  }

  randomIntegerBetween(min: number, max: number) {
    return min + Math.floor(this.rng() * (max - min));
  }

  randomPick<T>(list: T[]): T {
    return list[this.randomIntegerBetween(0, list.length)];
  }

  shuffleList<T>(list: T[]) {
    for (let repeat = 0; repeat < 5; repeat++) {
      for (let i = 0; i < list.length - 1; i++) {
        const j = this.randomIntegerBetween(i+1, list.length);
        [list[i], list[j]] = [list[j], list[i]];
      }
    }
  }
}
