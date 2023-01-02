import { Emoji } from "@/library/emoji";
import EmojiCard from "@/library/EmojiCard/EmojiCard";

describe("EmojiCard", () => {
  it("should throw an error if there are wrong number of emojis", () => {
     expect(() => new EmojiCard([])).toThrow("EmojiCard should contain exactly 9 Emojis");
     expect(() => new EmojiCard([Emoji.Eggplant])).toThrow("EmojiCard should contain exactly 9 Emojis");
     expect(() => new EmojiCard([
      Emoji.Eggplant,
      Emoji.AlienMonster,
      Emoji.Robot,
      Emoji.Umbrella,
      Emoji.ChessPawn,
      Emoji.SafetyVest,
      Emoji.SantaClaus,
      Emoji.Garlic,
      Emoji.Turtle,
      Emoji.ColdFace
    ])).toThrow("EmojiCard should contain exactly 9 Emojis");
  });

  it("should create the appropriate emojiString from the input", () => {
    const test = new EmojiCard([
      Emoji.Eggplant,
      Emoji.AlienMonster,
      Emoji.Robot,
      Emoji.Umbrella,
      Emoji.ChessPawn,
      Emoji.SafetyVest,
      Emoji.SantaClaus,
      Emoji.Garlic,
      Emoji.Turtle,
    ]);

    expect(test.emojiString).toBe("🍆👾🤖☂♟🦺🎅🧄🐢");
  });

  describe("getEmoji", () => {
    it("should fetch the correct emoji", () => {
      const test = new EmojiCard([
        Emoji.Eggplant,
        Emoji.AlienMonster,
        Emoji.Robot,
        Emoji.Umbrella,
        Emoji.ChessPawn,
        Emoji.SafetyVest,
        Emoji.SantaClaus,
        Emoji.Garlic,
        Emoji.Turtle,
      ]);
  
      expect(test.getEmoji(0)).toBe(Emoji.Eggplant);
      expect(test.getEmoji(1)).toBe(Emoji.AlienMonster);
      expect(test.getEmoji(2)).toBe(Emoji.Robot);
      expect(test.getEmoji(3)).toBe(Emoji.Umbrella);
      expect(test.getEmoji(4)).toBe(Emoji.ChessPawn);
      expect(test.getEmoji(5)).toBe(Emoji.SafetyVest);
      expect(test.getEmoji(6)).toBe(Emoji.SantaClaus);
      expect(test.getEmoji(7)).toBe(Emoji.Garlic);
      expect(test.getEmoji(8)).toBe(Emoji.Turtle);
    });
  });
});
