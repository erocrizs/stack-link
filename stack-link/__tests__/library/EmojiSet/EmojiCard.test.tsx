import { Emoji } from "@/library/emoji";
import EmojiSet from "@/library/EmojiSet/EmojiSet";

describe("EmojiSet", () => {
  it("should throw an error if there are wrong number of emojis", () => {
     expect(() => new EmojiSet([])).toThrow("Argument emojis do not have exactly 9 Emojis: ");
     expect(() => new EmojiSet([Emoji.Eggplant])).toThrow("Argument emojis do not have exactly 9 Emojis: 🍆");
     expect(() => new EmojiSet([
      Emoji.Eggplant,
      Emoji.AlienMonster,
      Emoji.NewMoonFace,
      Emoji.Umbrella,
      Emoji.ChessPawn,
      Emoji.SafetyVest,
      Emoji.SantaClaus,
      Emoji.Garlic,
      Emoji.Turtle,
      Emoji.ColdFace
    ])).toThrow("Argument emojis do not have exactly 9 Emojis: 🍆,👾,🌚,☂,♟,🦺,🎅,🧄,🐢,🥶");
  });

  it("should throw an error if there are any duplicate emoji", () => {
    expect(() => new EmojiSet([
     Emoji.Eggplant,
     Emoji.AlienMonster,
     Emoji.NewMoonFace,
     Emoji.SantaClaus,
     Emoji.ChessPawn,
     Emoji.SafetyVest,
     Emoji.SantaClaus,
     Emoji.Garlic,
     Emoji.Turtle,
   ])).toThrow("Duplicate emojis found in the set: 🎅");
   expect(() => new EmojiSet([
    Emoji.Eggplant,
    Emoji.AlienMonster,
    Emoji.AlienMonster,
    Emoji.Umbrella,
    Emoji.ChessPawn,
    Emoji.SafetyVest,
    Emoji.SantaClaus,
    Emoji.Garlic,
    Emoji.Turtle,
  ])).toThrow("Duplicate emojis found in the set: 👾");
  expect(() => new EmojiSet([
    Emoji.Eggplant,
    Emoji.AlienMonster,
    Emoji.NewMoonFace,
    Emoji.Umbrella,
    Emoji.ChessPawn,
    Emoji.SafetyVest,
    Emoji.SantaClaus,
    Emoji.Garlic,
    Emoji.Eggplant,
  ])).toThrow("Duplicate emojis found in the set: 🍆");
 });

  it("should create the appropriate emojiString from the input", () => {
    const test = new EmojiSet([
      Emoji.Eggplant,
      Emoji.AlienMonster,
      Emoji.NewMoonFace,
      Emoji.Umbrella,
      Emoji.ChessPawn,
      Emoji.SafetyVest,
      Emoji.SantaClaus,
      Emoji.Garlic,
      Emoji.Turtle,
    ]);

    expect(test.emojiString).toBe("🍆👾🌚☂♟🦺🎅🧄🐢");
  });

  describe("getEmoji", () => {
    it("should fetch the correct emoji", () => {
      const test = new EmojiSet([
        Emoji.Eggplant,
        Emoji.AlienMonster,
        Emoji.NewMoonFace,
        Emoji.Umbrella,
        Emoji.ChessPawn,
        Emoji.SafetyVest,
        Emoji.SantaClaus,
        Emoji.Garlic,
        Emoji.Turtle,
      ]);
  
      expect(test.getEmoji(0)).toBe(Emoji.Eggplant);
      expect(test.getEmoji(1)).toBe(Emoji.AlienMonster);
      expect(test.getEmoji(2)).toBe(Emoji.NewMoonFace);
      expect(test.getEmoji(3)).toBe(Emoji.Umbrella);
      expect(test.getEmoji(4)).toBe(Emoji.ChessPawn);
      expect(test.getEmoji(5)).toBe(Emoji.SafetyVest);
      expect(test.getEmoji(6)).toBe(Emoji.SantaClaus);
      expect(test.getEmoji(7)).toBe(Emoji.Garlic);
      expect(test.getEmoji(8)).toBe(Emoji.Turtle);
    });
  });
});
