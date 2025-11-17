import { Scene } from "phaser";
import Scenes from "../constants/Scenes";
import Textures from "../constants/Textures";
// import gameStore from "../store/gameStore";

class GameHUD extends Scene {
	// debugText!: Phaser.GameObjects.Text;
	pause!: Phaser.GameObjects.Image;

	constructor() {
		super(Scenes.GameHUD);
	}

	create() {
		this.pause = this.add.image(1240, 60, Textures.Buttons.Pause.default);
		this.pause.setScale(0.05, 0.05);
		this.pause.setOrigin(0.5, 1);
		this.pause.setInteractive();
		this.pause.on("pointerdown", () => {
			this.scene.pause(Scenes.GameScene);
			this.scene.pause(Scenes.GameHUD);
			this.scene.launch(Scenes.GamePause);
		});
		this.pause.on("pointerover", () =>
			this.pause.setTexture(Textures.Buttons.Pause.pressed),
		);
		this.pause.on("pointerout", () =>
			this.pause.setTexture(Textures.Buttons.Pause.default),
		);
	}
}

export default GameHUD;
