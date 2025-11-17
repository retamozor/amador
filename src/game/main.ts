import { AUTO, Game } from "phaser";
import Boot from "./scenes/Boot";
import Preloader from "./scenes/Preloader";
import MainMenu from "./scenes/MainMenu";
import GameScene from "./scenes/GameScene";
import GameHUD from "./scenes/GameHUD";
import GamePause from "./scenes/pause/GamePause";
import SaveGame from "./scenes/pause/SaveGame";
import LoadGame from "./scenes/pause/LoadGame";

const config: Phaser.Types.Core.GameConfig = {
	type: AUTO,
	width: 1280,
	height: 720,
	parent: "game-container",
	pixelArt: true,
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
	},
	physics: {
		default: "arcade",
		arcade: {
			debug: false,
			gravity: { y: 0, x: 0 },
		},
	},
	input: {
		gamepad: true,
		keyboard: true,
	},
	backgroundColor: "#C9B78D",
	scene: [
		Boot,
		Preloader,
		MainMenu,
		GameScene,
		GameHUD,
		GamePause,
		SaveGame,
		LoadGame,
	],
};

const StartGame = (parent: string) => {
	return new Game({ ...config, parent });
};

export default StartGame;
