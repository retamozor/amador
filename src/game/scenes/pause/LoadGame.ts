import { Scene } from "phaser";
import Scenes from "../../constants/Scenes";
import gameStore from "../../store/gameStore";
import SaveList from "../../forms/SaveList";

class LoadGame extends Scene {
	backdrop!: Phaser.GameObjects.Rectangle;
	cancel!: Phaser.GameObjects.Rectangle;
	cancelText!: Phaser.GameObjects.Text;
	saveList!: SaveList;

	constructor() {
		super(Scenes.LoadGame);
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

		const width = 450;
		const height = 300;
		const margin = 10;
		let xPos = (this.cameras.main.width - width) / 2;
		let yPos = (this.cameras.main.height - height) / 2;

		const saveListHeight = height - margin - 30;
		this.saveList = new SaveList(
			this,
			{ x: xPos, y: yPos, w: width, h: saveListHeight },
			(id) => {
				gameStore.getState().loadState(id);
				this.scene.stop(Scenes.GameScene);
				this.scene.start(Scenes.GameScene);
			},
		);

		xPos += ((width - 2 * margin) / 3) * 2 + 2 * margin;
		yPos += margin + saveListHeight;

		const cancelWidth = (width - 2 * margin) / 3;

		this.cancel = this.add.rectangle(xPos, yPos, cancelWidth, 30, 0xc9b78d);
		this.cancel.setOrigin(0);
		this.cancel.setInteractive();

		this.cancel.once(Phaser.Input.Events.POINTER_DOWN, () => {
			this.scene.wake(Scenes.GamePause);
			this.scene.stop(Scenes.LoadGame);
		});

		this.cancelText = this.add.text(xPos, yPos, "Cancelar", {
			fixedHeight: 30,
			fixedWidth: cancelWidth,
			align: "center",
			padding: {
				y: 6,
			},
		});
	}
}

export default LoadGame;
