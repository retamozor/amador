import { Scene } from "phaser";
import Scenes from "../../constants/Scenes";

class GamePause extends Scene {
	backdrop!: Phaser.GameObjects.Rectangle;
	continueBtn!: Phaser.GameObjects.Rectangle;
	continueText!: Phaser.GameObjects.Text;
	saveBtn!: Phaser.GameObjects.Rectangle;
	saveText!: Phaser.GameObjects.Text;
	loadBtn!: Phaser.GameObjects.Rectangle;
	loadText!: Phaser.GameObjects.Text;

	constructor() {
		super(Scenes.GamePause);
	}

	create() {
		this.backdrop = this.add.rectangle(
			0,
			0,
			this.cameras.main.width,
			this.cameras.main.height,
			0x000000,
			0.5,
		);
		this.backdrop.setOrigin(0);

		let xPos = this.cameras.main.width / 2;
		let yPos = 300;

		this.continueBtn = this.add.rectangle(xPos, yPos, 200, 30, 0xc9b78d);
		this.continueBtn.setOrigin(0.5);
		this.continueBtn.setInteractive();

		this.continueBtn.once(Phaser.Input.Events.POINTER_DOWN, () => {
			this.scene.resume(Scenes.GameHUD);
			this.scene.resume(Scenes.GameScene);
			this.scene.stop(Scenes.GamePause);
		});

		this.continueText = this.add.text(xPos, yPos, "Reanudar", {
			fixedHeight: 30,
			fixedWidth: 200,
			align: "center",
			padding: {
				y: 6,
			},
		});
		this.continueText.setOrigin(0.5);

		yPos += 50;

		this.saveBtn = this.add.rectangle(xPos, yPos, 200, 30, 0xc9b78d);
		this.saveBtn.setOrigin(0.5);
		this.saveBtn.setInteractive();

		this.saveBtn.on(Phaser.Input.Events.POINTER_DOWN, () => {
			this.scene.launch(Scenes.SaveGame);
			this.scene.sleep(Scenes.GamePause);
		});

		this.saveText = this.add.text(xPos, yPos, "Guardar partida", {
			fixedHeight: 30,
			fixedWidth: 200,
			align: "center",
			padding: {
				y: 6,
			},
		});
		this.saveText.setOrigin(0.5);

		yPos += 50;

		this.loadBtn = this.add.rectangle(xPos, yPos, 200, 30, 0xc9b78d);
		this.loadBtn.setOrigin(0.5);
		this.loadBtn.setInteractive();

		this.loadBtn.on(Phaser.Input.Events.POINTER_DOWN, () => {
			this.scene.launch(Scenes.LoadGame);
			this.scene.sleep(Scenes.GamePause);
		});

		this.loadText = this.add.text(xPos, yPos, "Cargar partida", {
			fixedHeight: 30,
			fixedWidth: 200,
			align: "center",
			padding: {
				y: 6,
			},
		});
		this.loadText.setOrigin(0.5);
	}
}

export default GamePause;
