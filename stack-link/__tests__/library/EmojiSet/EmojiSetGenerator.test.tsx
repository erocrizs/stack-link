import EmojiSetGenerator from "@/library/EmojiSet/EmojiSetGenerator";

const SEED = Date.now();

describe("EmojiSetGenerator", () => {
  console.log("SEED USED: " + SEED);
  
  test("should generate the specified number of cards", () => {
    const generator = EmojiSetGenerator(10, SEED);
    
    let counter = 0;
    let result;
    do {
      result = generator.next();
      counter++;
    } while (!result.done);

    expect(counter).toEqual(10);
  });

  test("should maintain exactly one emoji link between cards", () => {
    const generator = EmojiSetGenerator(100, SEED);
    
    let result = generator.next();
    let cardA = null;
    let cardB = result.value;
    
    do {
      result = generator.next();
      cardA = cardB;
      cardB = result.value;

      const cardAList = cardA.emojiList;
      const cardBList = cardB.emojiList;
      const intersect = cardAList.filter(e => cardBList.includes(e));
      expect(intersect.length).toBe(1);
    } while (!result.done);
  });
});