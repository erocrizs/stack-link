import { Emoji } from "../emoji";

class EmojiCard {
  private emojis: Emoji[];

  constructor(emojis: Emoji[]) {
    if (emojis.length !== 9) {
      throw Error("EmojiCard should contain exactly 9 Emojis");
    }

    this.emojis = emojis;
  }

  get emojiString() {
    return this.emojis.join("");
  }

  getEmoji(index: number): Emoji {
    return this.emojis[index];
  }
}

export default EmojiCard;