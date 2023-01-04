import RNG from "../RNG";
import { Emoji, emojis } from "../emoji";
import EmojiCard from "./EmojiCard";

export default function* EmojiCardGenerator(size: number, seed?: number): Generator<EmojiCard, EmojiCard, undefined> {
  const rng = new RNG(seed || Date.now());

  const emojiState: Emoji[] = [];
  
  while (size-- > 1) {
    while (emojiState.length < 17) {
      const newEmoji = rng.randomPick<Emoji>(emojis);
      if (!emojiState.includes(newEmoji)) {
        emojiState.push(newEmoji);
      }
    }

    const newEmojiCard = emojiState.splice(0, 8);
    newEmojiCard.push(emojiState[0]);
    rng.shuffleList(emojiState);
    yield new EmojiCard(newEmojiCard);
  }

  return new EmojiCard(emojiState);
}