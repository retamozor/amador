import { createStore,  } from "zustand/vanilla";
import { devtools } from 'zustand/middleware'

import type { GameSlice } from "./createGameSlice";
import type { SaveSlice } from "./createSaveSlice";
import createGameSlice from "./createGameSlice";
import createSaveSlice from "./createSaveSlice";
import { persist } from "zustand/middleware";
import type { GameSettingsSlice } from "./createGameSettingsSlice";
import createGameSettingsSlice from "./createGameSettingsSlice";
import { encryptedStorage } from "./encryptedStorage";

export type GameState = GameSlice & SaveSlice & GameSettingsSlice;

const gameStore = createStore<GameState>()(
  persist(
    devtools((...args) => ({
      ...createGameSlice(...args),
      ...createSaveSlice(...args),
      ...createGameSettingsSlice(...args),
    })),
    {
      name: "game-save",
      partialize: (state) => ({ saves: state.saves, volume: state.volume }),
			storage: encryptedStorage,
    },
  ),
);


export default gameStore;
