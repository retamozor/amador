import type { StateCreator } from "zustand/vanilla";
import type { GameState } from "./gameStore";
import type { GameSliceState } from "./createGameSlice";
import { v4 } from "uuid";

export interface SaveSliceState {
	saves: Record<string, GameSliceState>;
}

export interface SaveSliceAction {
	replaceState: (id: string) => void;
	saveState: (name?: string) => void;
	loadState: (id: string) => void;
	getSaveList: () => { id: string; name: string; date: string }[];
}

export type SaveSlice = SaveSliceState & SaveSliceAction;

const createSaveSlice: StateCreator<GameState, [], [], SaveSlice> = (
	set,
	get,
) => ({
	saves: {},
	replaceState(id: string) {
		const currentSave = get().saves[id];
		if (currentSave === undefined) return;

		set((state) => {
			const newSave = { ...get().getGameState() };
			newSave.id = id;
			newSave.name = currentSave.name;

			return {
				saves: {
					...state.saves,
					[id]: newSave,
				},
			};
		});
	},
	saveState(name?: string) {
		console.log('save game:', name)
		set((state) => {
			const newSave = { ...get().getGameState() };
			if (name !== undefined) {
				newSave.id = v4();
				newSave.name = name;
			}

			return {
				saves: {
					...state.saves,
					[newSave.id]: newSave,
				},
			};
		});
	},
	loadState(id: string) {
		const save = get().saves[id];
		if (save !== undefined) {
			get().setGameState(save);
		}
	},
	getSaveList() {
		const saves = get().saves;
		const ids = Object.keys(saves);
		return ids.map((id) => ({
			id,
			name: saves[id].name,
			date: saves[id].date,
		}));
	},
});

export default createSaveSlice;
