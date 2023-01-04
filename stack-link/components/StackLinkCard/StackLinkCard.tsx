import EmojiCard from "@/library/EmojiCard/EmojiCard";
import style from "./StackLinkCard.module.scss";

type StackLinkCardProps = {
  card: EmojiCard,
}

export default function StackLinkCard ({card}: StackLinkCardProps) {
  return <div>{card.emojiString}</div>
}