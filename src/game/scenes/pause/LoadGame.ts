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

		this.cancel = this.add.rectangle(630, 500, 120, 30, 0xc9b78d);
		this.cancel.setOrigin(0);
		this.cancel.setInteractive();

		this.cancel.once(Phaser.Input.Events.POINTER_DOWN, () => {
			this.scene.wake(Scenes.GamePause);
			this.scene.stop(Scenes.LoadGame);
		});

		this.cancelText = this.add.text(630, 500, "Cancelar", {
			fixedHeight: 30,
			fixedWidth: 120,
			align: "center",
			padding: {
				y: 6,
			},
		});

		this.saveList = new SaveList(this, { x: 300, y: 245, w: 450, h: 240 }, id => {
			gameStore.getState().loadState(id);
			this.scene.stop(Scenes.GameScene);
			this.scene.start(Scenes.GameScene);
		});
	}
}

export default LoadGame;
