import MessageCard from "@/components/MessageCard/MessageCard";
import StackLinkCard from "@/components/StackLinkCard/StackLinkCard";
import { Emoji } from "@/library/emoji";
import EmojiSet from "@/library/EmojiSet/EmojiSet";
import EmojiSetGenerator from "@/library/EmojiSet/EmojiSetGenerator";
import { HomeState, SubCardDetail } from "@/library/Frontend/HomeState";
import { StateTuple } from "@/library/Frontend/StateTuple";
import styles from "@/pages/index.module.scss"
import { createRef, useEffect, useRef, useState } from "react";

const cardSize = 25;
const maxTime = 60;
const congratulations = [
  { min: 25, message: "Perfect!" },
  { min: 20, message: "Almost There!" },
  { min: 5, message: "Well Done!" },
  { min: 0, message: "Good Try!" },
];

export default function Home() {
  const [state, setState] = useState(HomeState.Loading);
  const [score, setScore] = useState(0);
  const [finalScore, setFinalScore] = useState<number | null>(null);
  const [lastCard, setLastCard] = useState(false);
  const [generator, setGenerator] = useState<Generator<EmojiSet, EmojiSet, undefined>>();
  const [cardStack, setCardStack] : StateTuple<EmojiSet[]> = useState<EmojiSet[]>([]);
  const [mainCardRender, setMainCardRender] = useState(<div>Main</div>);
  const [subCardsRender, setSubCardsRender] = useState<SubCardDetail[]>([{
    element: (<span>Hello world</span>),
    key: "",
  }]);
  const [timeRemaining, setTimeRemaining] = useState(maxTime);
  const [punishRemaining, setPunishRemaining] = useState(0);
  const [isTimerRunning, setTimerRunning] = useState(false);
  const timeRef = useRef(timeRemaining);
  const scoreRef = useRef(score);

  timeRef.current = timeRemaining;
  scoreRef.current = score;

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
    let timeout: NodeJS.Timeout | undefined;

    if (timeRemaining <= 0) {
      if (finalScore === null) {
        setFinalScore(scoreRef.current);
      }
      setState(HomeState.Done);
      setTimeRemaining(0);
      setTimerRunning(false);
      return;
    }
    
    if (isTimerRunning) {
      timeout = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [timeRemaining, isTimerRunning, score]);

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;
    
    if (isTimerRunning && punishRemaining > 0) {
      timeout = setTimeout(() => {
        setPunishRemaining(punishRemaining - 1);
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [punishRemaining, isTimerRunning]);

  useEffect(() => {
    if (state === HomeState.Play) {

      if (punishRemaining > 0) {
        setMainCardRender(
          <MessageCard
            title={`Wrong Answer`}
            messages={["Try again."]}
            flippedDown/>
        );
        setSubCardsRender([{
          element: <MessageCard
            title={`${punishRemaining}`}
            flippedDown/>,
          key: "punish-timer"
        }]);
        return;
      }

      const [otherCard, currentCard] = cardStack.slice(-2);
      setMainCardRender(<StackLinkCard card={currentCard} cardNumber={cardStack.length} onClick={guessLinkEmoji}/>)
      setSubCardsRender([{
        element: <StackLinkCard card={otherCard} cardNumber={cardStack.length - 1} onClick={guessLinkEmoji}/>,
        key: otherCard.emojiString,
      }]);
      return;
    }

    if (state === HomeState.Done) {
      const congratulation = congratulations.find(c => c.min <= score);
      setMainCardRender(
        <MessageCard
          title={congratulation?.message || "Good Try!"}
          messages={[`You got ${score} cards!`]}
          buttonOption={{
            label: "SHARE",
            onClick: () => console.log("Share"),
          }}
          flippedDown
        />
      );
      setSubCardsRender([
        ...cardStack.map(
          (card, index) => ({
            element: <StackLinkCard card={card} cardNumber={index + 1}/>,
            key: card.emojiString
          })
        ),
        {
          element: <MessageCard
            title={`Final Score: ${finalScore}`}
            messages={[
              "You can replay this exact same stack but your final score stays."
            ]}
            buttonOption={{label: "REPLAY", onClick: () => console.log("Replay")}}
          />,
          key: "replay-card"
        },
      ]);
      return;
    }

    if (state === HomeState.DoneWin) {
      setMainCardRender(
        <MessageCard
          title="Perfect!"
          messages={[`You got all the cards with extra ${timeRemaining}! seconds remaining!`]}
          buttonOption={{
            label: "SHARE",
            onClick: () => console.log("Share"),
          }}
          flippedDown
        />
      );
      setSubCardsRender([
        ...cardStack.map(
          (card, index) => ({
            element: <StackLinkCard card={card} cardNumber={index + 1}/>,
            key: card.emojiString
          })
        ),
        {
          element: <MessageCard
            title={`Final Score: ${finalScore}`}
            messages={[
              "You can replay this exact same stack but your final score stays."
            ]}
            buttonOption={{label: "REPLAY", onClick: () => console.log("Replay")}}
          />,
          key: "replay-card"
        },
      ]);
    }
  }, [state, cardStack, punishRemaining]);

  useEffect(() => {
    const dock = smallCardDockRef.current as HTMLDivElement;
    dock.scrollLeft = dock.scrollWidth;
  }, [subCardsRender]);

  const guessLinkEmoji = (guess: Emoji) => {
    const [cardA, cardB] = cardStack.slice(-2);

    if (cardA.emojiList.includes(guess) && cardB.emojiList.includes(guess)) {
      setScore(scoreRef.current + 1);

      if (lastCard) {
        if (finalScore === null) {
          setFinalScore(cardSize);
        }
        setTimerRunning(false);
        setState(HomeState.DoneWin);
        return;
      }

      const newResult = generator?.next();
      setCardStack([...cardStack, newResult?.value as EmojiSet]);
      setTimeRemaining(Math.min(maxTime, timeRef.current + 5));
      setLastCard(newResult?.done as boolean);
    }
    else {
      setPunishRemaining(3);
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
              subCardsRender.map(({element, key}) => (
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
