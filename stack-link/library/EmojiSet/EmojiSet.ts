import { Emoji } from "../emoji";

class EmojiSet {
  private emojis: Emoji[];

  constructor(emojis: Emoji[]) {
    if (emojis.length !== 9) {
      throw Error("Argument emojis do not have exactly 9 Emojis: " + emojis.join());
    }

    for (let i = 0; i < emojis.length; i++) {
      for (let j = i + 1; j < emojis.length; j++) {
        if (emojis[i] === emojis[j]) {
          throw Error("Duplicate emojis found in the set: " + emojis[i]);
        }
      }
    }

    this.emojis = emojis;
  }

  get emojiString() {
    return this.emojis.join("");
  }

  get emojiList () {
    return Array.from(this.emojis);
  }

  getEmoji(index: number): Emoji {
    return this.emojis[index];
  }
}

export default EmojiSet;