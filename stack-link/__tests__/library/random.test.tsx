import { createRNG, randomIntegerBetween, randomPick } from "@/library/random";

const SEED = 1672705995434;
const LOOP_COUNT = 1000;

function loopPerform(operation: Function) {
  for (let i = 0; i < LOOP_COUNT; i++) {
    operation();
  }
}

describe("random", () => {
  describe("createRNG", () => {
    it("should always return a value between [0, 1)", () => {
      const rng = createRNG(SEED);
      loopPerform(() => {
        const randomValue = rng();
        expect(randomValue).toBeGreaterThanOrEqual(0);
        expect(randomValue).toBeLessThan(1);
      });
    });
  });

  describe("randomIntegerBetween", () => {
    const rng = createRNG(SEED);

    it("should always return a value between minimum and maximum", () => {
      const listLength = 25;
      const bitList = Array.from({length: listLength}, () => false);
      
      loopPerform(() => {
        const randomValue = randomIntegerBetween(0, listLength, rng);
        expect(randomValue).toBeGreaterThanOrEqual(0);
        expect(randomValue).toBeLessThan(listLength);
        bitList[randomValue] = true;
      });

      expect(bitList.every(x => x)).toBeTruthy();
    });
  });

  describe("randomPick", () => {
    const rng = createRNG(SEED);

    it("should always return a value from the list", () => {
      const list = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
      const bitMap: any = {};
      
      loopPerform(() => {
        const randomValue = randomPick(list, rng);
        expect(list).toContain(randomValue);
        bitMap[randomValue] = true;
      });

      expect(list.every(x => bitMap[x])).toBeTruthy();
    });
  });
});