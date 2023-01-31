import { MutableRefObject } from "react";
import EmojiSet from "../EmojiSet/EmojiSet";
import { StateTuple, getState, setState } from "./StateTuple";

export enum HomeState {
  Loading,
  Menu,
  Play,
  Done,
  DoneWin,
  Replay,
  InvalidDate,
}

export type SubCardDetail = { element: JSX.Element, key: string };

interface HomeStateValues {
  state: StateTuple<HomeState>;
  score: StateTuple<number>;
  finalScore: StateTuple<number | null>;
  isLastCard: StateTuple<boolean>;
  cardStack: StateTuple<EmojiSet[]>;
  mainCardRender: StateTuple<JSX.Element>;
  subCardsRender: StateTuple<SubCardDetail[]>;
  timeRemaining: StateTuple<number>;
  punishRemaining: StateTuple<number>;
  isTimerRunning: StateTuple<boolean>;
  timeRef: MutableRefObject<number>;
  scoreRef: MutableRefObject<number>;
}