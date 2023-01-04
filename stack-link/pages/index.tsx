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
  const [state, setState] = useState(HomeState.Menu);
  const [score, setScore] = useState(0);

  return (
    <div className={styles.Body} data-testid="Body">
      <div className={styles.BodyWidth}>
        <div className={styles.BodyFlex}>
          <div className={styles.Score}>{score} / 25</div>
          <div className={styles.MainCard}></div>
          <div className={styles.SmallCardDock}>
            <div className={styles.SmallCardContainer}>
              <div className={styles.SmallCard}>
              </div>
            </div>
            <div className={styles.SmallCardContainer}>
              <div className={styles.SmallCard}>
              </div>
            </div>
            <div className={styles.SmallCardContainer}>
              <div className={styles.SmallCard}>
              </div>
            </div>
            <div className={styles.SmallCardContainer}>
              <div className={styles.SmallCard}>
              </div>
            </div>
            <div className={styles.SmallCardContainer}>
              <div className={styles.SmallCard}>
              </div>
            </div>
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
