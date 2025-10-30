import { AUTO, Game } from "phaser"
import Boot from "./scenes/Boot";
import Preloader from "./scenes/Preloader";
import MainMenu from "./scenes/MainMenu";


const config: Phaser.Types.Core.GameConfig = {
	type: AUTO,
	width: 1280,
  height: 720,
	parent: 'game-container',
	pixelArt: true,
	scale: {
     mode: Phaser.Scale.FIT,
     autoCenter: Phaser.Scale.CENTER_BOTH
   },
	backgroundColor: '#AA9955',
	scene: [
		Boot,
		Preloader,
		MainMenu,
	]
}

const StartGame = (parent: string) => {
	return new Game({...config, parent});
}

export default StartGame;
