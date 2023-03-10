import RNG from "@/library/RNG";

const SEED = Date.now();
const LOOP_COUNT = 1000;

function loopPerform(operation: Function) {
  for (let i = 0; i < LOOP_COUNT; i++) {
    operation();
  }
}

describe("RNG", () => {
  console.log("SEED USED: " + SEED);
  const rng = new RNG(SEED);

  describe("next", () => {
    it("should always return a value between [0, 1)", () => {
      loopPerform(() => {
        const randomValue = rng.next();
        expect(randomValue).toBeGreaterThanOrEqual(0);
        expect(randomValue).toBeLessThan(1);
      });
    });
  });

  describe("randomIntegerBetween", () => {
    it("should always return a value between minimum and maximum", () => {
      const listLength = 25;
      const bitList = Array.from({length: listLength}, () => false);
      
      loopPerform(() => {
        const randomValue = rng.randomIntegerBetween(0, listLength);
        expect(randomValue).toBeGreaterThanOrEqual(0);
        expect(randomValue).toBeLessThan(listLength);
        bitList[randomValue] = true;
      });

      expect(bitList.every(x => x)).toBeTruthy();
    });
  });

  describe("randomPick", () => {
    it("should always return a value from the list", () => {
      const list = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
      const bitMap: any = {};
      
      loopPerform(() => {
        const randomValue = rng.randomPick(list);
        expect(list).toContain(randomValue);
        bitMap[randomValue] = true;
      });

      expect(list.every(x => bitMap[x])).toBeTruthy();
    });
  });

  describe("shuffleList", () => {
    it("should shuffle the list", () => {
      const list = Array.from({length: 1000}, (_,x) => x);
      const originalList = [...list];
      rng.shuffleList(list);
      expect(list).toEqual(expect.arrayContaining(originalList));
      expect(list).not.toEqual(originalList);
    });
  });
});