import { Emoji, GetEmojiSrc } from "@/library/emoji";
import EmojiCard from "@/library/EmojiCard/EmojiCard";
import Image from "next/image";
import styles from "./StackLinkCard.module.scss";

type StackLinkCardProps = {
  card: EmojiCard,
  cardNumber: string | number,
  onClick?: undefined | ((emoji: Emoji) => void),
};

export default function StackLinkCard ({card, cardNumber, onClick}: StackLinkCardProps) {
  return <div className={styles.StackLinkCard}>
    <div className={styles.Grid}>
      {
        card.emojiList.map(emoji => (
          <div key={emoji} className={styles.ImageContainer}>
            <Image src={GetEmojiSrc(emoji)} alt={emoji} fill onClick={onClick && (() =>  onClick(emoji))}/>
          </div>
        ))
      }
    </div>
    <div className={styles.CardNumber}>{cardNumber}</div>
  </div>
}