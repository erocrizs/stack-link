import RNG from "../RNG";
import { Emoji, emojis } from "../emoji";
import EmojiSet from "./EmojiSet";

export default function* EmojiSetGenerator(size: number, seed?: number): Generator<EmojiSet, EmojiSet, undefined> {
  const rng = new RNG(seed || Date.now());

  const emojiState: Emoji[] = [];
  
  while (size-- > 1) {
    while (emojiState.length < 17) {
      const newEmoji = rng.randomPick<Emoji>(emojis);
      if (!emojiState.includes(newEmoji)) {
        emojiState.push(newEmoji);
      }
    }

    const newSet = emojiState.splice(0, 8);
    newSet.push(emojiState[0]);
    rng.shuffleList(newSet);
    yield new EmojiSet(newSet);
    rng.shuffleList(emojiState);
  }

  return new EmojiSet(emojiState);
}