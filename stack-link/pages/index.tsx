import MessageCard from "@/components/MessageCard/MessageCard";
import StackLinkCard from "@/components/StackLinkCard/StackLinkCard";
import { Emoji } from "@/library/emoji";
import EmojiCard from "@/library/EmojiCard/EmojiCard";
import EmojiCardGenerator from "@/library/EmojiCard/EmojiCardGenerator";
import styles from "@/pages/index.module.scss"
import { createRef, Dispatch, SetStateAction, useEffect, useState } from "react";

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
  const [lastCard, setLastCard] = useState(false);
  const [generator, setGenerator] : StateTuple<GeneratorType | undefined> = useState<GeneratorType>();
  const [cardStack, setCardStack] : StateTuple<EmojiCard[]> = useState<EmojiCard[]>([]);
  const [mainCardRender, setMainCardRender] = useState(<div>Main</div>);
  const [smallCardsRenders, setSmallCardRenders] = useState<SmallCardDetail[]>([{
    element: (<span>Hello world</span>),
    key: "",
  }]);

  const smallCardDockRef = createRef<HTMLDivElement>();

  useEffect(() => {
    if (!generator) {
      const newGenerator = EmojiCardGenerator(25);
      setGenerator(newGenerator);
      setCardStack([newGenerator.next().value, newGenerator.next().value]);
      setScore(1);
      setState(HomeState.Play);
    }
  }, []);

  useEffect(() => {
    if (state === HomeState.Play) {
      const [otherCard, currentCard] = cardStack.slice(-2);
      setMainCardRender(<StackLinkCard card={currentCard} onClick={guessLinkEmoji}/>)
      setSmallCardRenders([{
        element: <StackLinkCard card={otherCard} onClick={guessLinkEmoji}/>,
        key: otherCard.emojiString,
      }]);
      return;
    }

    if (state === HomeState.DoneWin) {
      setMainCardRender(
        <MessageCard
          title="You Win!"
          messages={[`You got all ${score} cards! Good job!`]}
          buttonOption={{
            label: "SHARE",
            onClick: () => console.log("Share"),
          }}/>
      );
      setSmallCardRenders([
        ...cardStack.map(
          card => ({
            element: <StackLinkCard card={card}/>,
            key: card.emojiString
          })
        ),
        {
          element: <MessageCard buttonOption={{label: "REPLAY", onClick: () => console.log("Replay")}}/>,
          key: "replay-button"
        },
      ]);
    }
  }, [state, cardStack]);

  useEffect(() => {
    const dock = smallCardDockRef.current as HTMLDivElement;
    dock.scrollLeft = dock.scrollWidth;
  }, [smallCardsRenders]);

  const guessLinkEmoji = (guess: Emoji) => {
    const [cardA, cardB] = cardStack.slice(-2);

    if (cardA.emojiList.includes(guess) && cardB.emojiList.includes(guess)) {
      setScore(score + 1);

      if (lastCard) {
        setState(HomeState.DoneWin);
        return;
      }

      const newResult = generator?.next();
      setCardStack([...cardStack, newResult?.value as EmojiCard]);
      setLastCard(newResult?.done as boolean);
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
          <div className={styles.SmallCardDock} ref={smallCardDockRef}>
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
