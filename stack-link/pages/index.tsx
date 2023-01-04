import StackLinkCard from "@/components/StackLinkCard/StackLinkCard";
import EmojiCard from "@/library/EmojiCard/EmojiCard";
import EmojiCardGenerator from "@/library/EmojiCard/EmojiCardGenerator";
import styles from "@/pages/index.module.scss"
import { useState } from "react";

enum HomeState {
  Loading,
  Menu,
  Play,
  Done,
  DoneWin,
  Replay,
  InvalidDate,
}

export default function Home() {
  const [state, setState] = useState(HomeState.Play);
  const [score, setScore] = useState(0);
  const [generator, setGenerator] = useState(EmojiCardGenerator(25));
  const [cardStack, setCardStack] = useState([generator.next().value, generator.next().value]);

  let mainCardRender: JSX.Element = <div>Main</div>;
  let smallCardsRenders: [JSX.Element, string][] = [[(<span>Hello world</span>), ""]];

  if (state === HomeState.Play) {
    const [currentCard, ...otherCards] = cardStack;
    mainCardRender = <StackLinkCard card={currentCard}/>
    smallCardsRenders = otherCards.map(card => [<StackLinkCard card={card}/>, card.emojiString]);
  }

  return (
    <div className={styles.Body} data-testid="Body">
      <div className={styles.BodyWidth}>
        <div className={styles.BodyFlex}>
          <div className={styles.Score}>{score} / 25</div>
          <div className={[styles.MainCard, styles.Card].join(" ")}>
            {mainCardRender}
          </div>
          <div className={styles.SmallCardDock}>
            {
              smallCardsRenders.map(([element, key]) => (
                <div key={key} className={styles.SmallCardContainer}>
                  <div className={[styles.SmallCard, styles.Card].join(" ")}>
                    {element}
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <div className={styles.Footer}>
          <div className={styles.FooterText}>
            <div className={styles.Date}>
              January 4, 2023
            </div>
            <div className={styles.TimerCount}>
              18 sec
            </div>
          </div>
          <div className={styles.TimerBar}>
            <div className={styles.TimerProgress}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
