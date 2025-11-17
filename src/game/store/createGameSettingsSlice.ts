import type { StateCreator } from "zustand/vanilla";
import type { GameState } from "./gameStore";

export interface GameSettingsSliceState {
  volume: number;
}

interface GameSettingsSliceAction {
  setVolume: (volume: number) => void;
}

export type GameSettingsSlice = GameSettingsSliceState &
  GameSettingsSliceAction;

const initialState = (): GameSettingsSliceState => ({
  volume: 0.5,
});

const createGameSettingsSlice: StateCreator<
  GameState,
  [],
  [],
  GameSettingsSlice
> = (set, _get) => ({
  ...initialState(),
  setVolume(volume) {
    set({ volume });
  },
});

export default createGameSettingsSlice;
