import { Scene } from "phaser";
import Scenes from "../constants/Scenes";
import Textures from "../constants/Textures";
import type ActionButton from "../forms/Button";
// import gameStore from "../store/gameStore";

class GameHUD extends Scene {
	// debugText!: Phaser.GameObjects.Text;
	pause!: ActionButton;

	constructor() {
		super(Scenes.GameHUD);
	}

	create() {
		const margin = 10;
		const xPos = Math.floor(this.cameras.main.width - margin - 60 / 2);
		const yPos = margin + 48;

		this.pause = this.add.button(xPos, yPos, Textures.Buttons.Pause);
		this.pause.on("pointerdown", () => {
			this.scene.pause(Scenes.GameScene);
			this.scene.pause(Scenes.GameHUD);
			this.scene.launch(Scenes.GamePause);
		});
		this.pause.setScale(2)
	}
}

export default GameHUD;
