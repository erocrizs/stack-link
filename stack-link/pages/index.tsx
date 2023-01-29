import MessageCard from "@/components/MessageCard/MessageCard";
import StackLinkCard from "@/components/StackLinkCard/StackLinkCard";
import { Emoji } from "@/library/emoji";
import EmojiSet from "@/library/EmojiSet/EmojiSet";
import EmojiSetGenerator from "@/library/EmojiSet/EmojiSetGenerator";
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
type GeneratorType = Generator<EmojiSet, EmojiSet, undefined>;
type SmallCardDetail = { element: JSX.Element, key: string };

const cardSize = 25;
const maxTime = 60;

export default function Home() {
  const [state, setState] = useState(HomeState.Loading);
  const [score, setScore] = useState(0);
  const [lastCard, setLastCard] = useState(false);
  const [generator, setGenerator] : StateTuple<GeneratorType | undefined> = useState<GeneratorType>();
  const [cardStack, setCardStack] : StateTuple<EmojiSet[]> = useState<EmojiSet[]>([]);
  const [mainCardRender, setMainCardRender] = useState(<div>Main</div>);
  const [smallCardsRenders, setSmallCardRenders] = useState<SmallCardDetail[]>([{
    element: (<span>Hello world</span>),
    key: "",
  }]);
  const [timeRemaining, setTimeRemaining] = useState(maxTime);
  const [isTimerRunning, setTimerRunning] = useState(false);

  const smallCardDockRef = createRef<HTMLDivElement>();

  useEffect(() => {
    if (!generator) {
      const newGenerator = EmojiSetGenerator(cardSize);
      setGenerator(newGenerator);
      setCardStack([newGenerator.next().value, newGenerator.next().value]);
      setScore(1);
      setState(HomeState.Play);
      setTimeRemaining(maxTime);
      setTimerRunning(true);
    }
  }, []);

  useEffect(() => {
    if (isTimerRunning && timeRemaining > 0) {
      setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
    }
  }, [timeRemaining, isTimerRunning]);

  useEffect(() => {
    if (state === HomeState.Play) {
      const [otherCard, currentCard] = cardStack.slice(-2);
      setMainCardRender(<StackLinkCard card={currentCard} cardNumber={cardStack.length} onClick={guessLinkEmoji}/>)
      setSmallCardRenders([{
        element: <StackLinkCard card={otherCard} cardNumber={cardStack.length - 1} onClick={guessLinkEmoji}/>,
        key: otherCard.emojiString,
      }]);
      return;
    }

    if (state === HomeState.DoneWin) {
      setMainCardRender(
        <MessageCard
          title={`${score} / ${cardSize}`}
          messages={[
            "You can replay this exact same stack but your original score stays."
          ]}
          buttonOption={{label: "REPLAY", onClick: () => console.log("Replay")}}
          flippedDown/>
      );
      setSmallCardRenders([
        ...cardStack.map(
          (card, index) => ({
            element: <StackLinkCard card={card} cardNumber={index + 1}/>,
            key: card.emojiString
          })
        ),
        {
          element: <MessageCard
            title="You Win!"
            messages={[`You got all ${score} cards!`, "Share this achievement"]}
            buttonOption={{
              label: "SHARE",
              onClick: () => console.log("Share"),
            }}
          />,
          key: "share-card"
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
      setCardStack([...cardStack, newResult?.value as EmojiSet]);
      setLastCard(newResult?.done as boolean);
    }
  };

  return (
    <div className={styles.Body} data-testid="Body">
      <div className={styles.BodyWidth}>
        <div className={styles.BodyFlex}>
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
        <div className={styles.StatusBar}>
          <div className={styles.TimerBar}>
            <div className={styles.TimerProgress} style={{width: `${timeRemaining * 100 / maxTime}%`}}></div>
          </div>
          <div className={styles.StatusText}>
            <div className={styles.Date}>
              January 4, 2023
            </div>
            <div className={styles.TimerCount}>
              {timeRemaining} sec
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
