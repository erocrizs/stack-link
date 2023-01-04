import { GetEmojiSrc } from "@/library/emoji";
import EmojiCard from "@/library/EmojiCard/EmojiCard";
import Image from "next/image";
import styles from "./StackLinkCard.module.scss";

type StackLinkCardProps = {
  card: EmojiCard,
}

export default function StackLinkCard ({card}: StackLinkCardProps) {
  return <div className={styles.StackLinkCard}>
    {
      card.emojiList.map(x => (
        <div key={x} className={styles.ImageContainer}>
          <Image src={GetEmojiSrc(x) || ""} alt={x} fill/>
        </div>
      ))
    }
  </div>
}