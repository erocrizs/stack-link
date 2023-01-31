import { Dispatch, SetStateAction } from "react";

export type StateTuple<T> = [T,  Dispatch<SetStateAction<T>>];

export function getState<T>(state: StateTuple<T>): T {
  return state[0];
}

export function setState<T>(state: StateTuple<T>): Dispatch<SetStateAction<T>> {
  return state[1];
}