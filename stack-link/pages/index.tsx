import StackLinkCard from "@/components/StackLinkCard/StackLinkCard";
import { Emoji } from "@/library/emoji";
import EmojiCard from "@/library/EmojiCard/EmojiCard";
import EmojiCardGenerator from "@/library/EmojiCard/EmojiCardGenerator";
import styles from "@/pages/index.module.scss"
import { Dispatch, SetStateAction, useEffect, useState } from "react";

enum HomeState {
  Loading,
  Menu,
  Play,
  Done,
  DoneWin,
  Replay,
  InvalidDate,
}

type StateTuple<T> = [T,  Dispatch<SetStateAction<T>>];
type GeneratorType = Generator<EmojiCard, EmojiCard, undefined>;
type SmallCardDetail = { element: JSX.Element, key: string };

export default function Home() {
  const [state, setState] = useState(HomeState.Loading);
  const [score, setScore] = useState(0);
  const [generator, setGenerator] : StateTuple<GeneratorType | undefined> = useState<GeneratorType>();
  const [cardStack, setCardStack] : StateTuple<EmojiCard[]> = useState<EmojiCard[]>([]);
  const [mainCardRender, setMainCardRender] = useState(<div>Main</div>);
  const [smallCardsRenders, setSmallCardRenders] = useState<SmallCardDetail[]>([{
    element: (<span>Hello world</span>),
    key: "",
  }]);

  useEffect(() => {
    if (!generator) {
      const newGenerator = EmojiCardGenerator(25);
      setGenerator(newGenerator);
      setCardStack([newGenerator.next().value, newGenerator.next().value]);
      setState(HomeState.Play);
    }
  }, []);

  useEffect(() => {
    if (state === HomeState.Play) {
      const currentCard = cardStack.slice(-1)[0];
      const otherCards = cardStack.slice(0, -1);
      setMainCardRender(<StackLinkCard card={currentCard} onClick={guessLinkEmoji}/>)
      setSmallCardRenders(
        otherCards.map(
          card => ({
            element: <StackLinkCard card={card}/>,
            key: card.emojiString
          })
        )
      );
    }
  }, [state, cardStack]);

  const guessLinkEmoji = (guess: Emoji) => {
    const [cardA, cardB] = cardStack.slice(-2);

    console.log(`Guessing ${guess}... (${cardA.emojiString}) (${cardB.emojiString})`);
    if (cardA.emojiList.includes(guess) && cardB.emojiList.includes(guess)) {
      console.log("Correct!");
    }
  };

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
              smallCardsRenders.map(({element, key}) => (
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
