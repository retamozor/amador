import type { StateCreator } from "zustand/vanilla";
import type { GameState } from "./gameStore";
import { v4 } from "uuid";
import moment from "moment";

export interface PlayerState {
  x: number;
  y: number;
}

export interface GameSliceState {
  id: string;
  name: string;
  date: string;
  player: PlayerState;
}

interface GameSliceAction {
  setPlayerPos: (x: number, y: number) => void;
  getGameState: () => GameSliceState;
  setGameState: (state: GameSliceState) => void;
  resetGameState: () => void;
}

export type GameSlice = GameSliceState & GameSliceAction;

const initialState = (): GameSliceState => ({
  id: v4(),
  name: "auto-save",
  date: moment().toISOString(),
  player: {
    x: 832,
    y: 420,
  },
});

const createGameSlice: StateCreator<GameState, [], [], GameSlice> = (
  set,
  get,
) => ({
  ...initialState(),
  setPlayerPos(x, y) {
    set((state) => ({
      player: { ...state.player, x, y },
      date: moment().toISOString(),
    }));
  },
  getGameState() {
    return {
      id: get().id,
      name: get().name,
      date: get().date,
      player: get().player,
    };
  },
  setGameState(state) {
    set({
      ...state,
    });
  },
  resetGameState() {
    set({ ...initialState() });
  },
});

export default createGameSlice;
