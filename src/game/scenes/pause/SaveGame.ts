import { Scene } from "phaser";
import Scenes from "../../constants/Scenes";
import FormInput from "../../forms/FormInput";
import gameStore from "../../store/gameStore";
import SaveList from "../../forms/SaveList";

class SaveGame extends Scene {
	backdrop!: Phaser.GameObjects.Rectangle;
	saveName!: FormInput;
	save!: Phaser.GameObjects.Rectangle;
	saveText!: Phaser.GameObjects.Text;
	cancel!: Phaser.GameObjects.Rectangle;
	cancelText!: Phaser.GameObjects.Text;
	saveList!: SaveList;
	saveId: string | null = null;

	constructor() {
		super(Scenes.SaveGame);
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

		const saveNameWidth = ((width - 2 * margin) / 3) * 2 + margin;
		this.saveName = new FormInput(
			this,
			{ x: xPos, y: yPos, w: saveNameWidth, h: 30 },
			{
				placeholder: "Ingresa un nombre",
				autofocus: true,
				onchange: (_e) => {
					this.saveId = null;
				},
			},
		);

		xPos += saveNameWidth + margin;

		const saveWidth = (width - 2 * margin) / 3;
		this.save = this.add.rectangle(xPos, yPos, saveWidth, 30, 0xc9b78d);
		this.save.setOrigin(0);
		this.save.setInteractive();

		this.save.on(Phaser.Input.Events.POINTER_DOWN, () => {
			console.log(this.saveName.value);
			if (this.saveName.value.trim()) {
				if (this.saveId === null) {
					gameStore.getState().saveState(this.saveName.value);
				} else {
					gameStore.getState().replaceState(this.saveId);
				}

				this.scene.wake(Scenes.GamePause);
				this.scene.stop(Scenes.SaveGame);
			}
		});

		this.saveText = this.add.text(xPos, yPos, "Guardar", {
			fixedHeight: 30,
			fixedWidth: saveWidth,
			align: "center",
			padding: {
				y: 6,
			},
		});

		xPos = (this.cameras.main.width - width) / 2;
		yPos += margin + 30;

		const saveListHeight = height - 2 * margin - 2 * 30;
		this.saveList = new SaveList(
			this,
			{ x: xPos, y: yPos, w: width, h: saveListHeight },
			(id) => {
				this.saveName.value = gameStore.getState().saves[id].name;
				this.saveId = id;
			},
		);

		xPos += saveNameWidth + margin;
		yPos += saveListHeight + margin;

		this.cancel = this.add.rectangle(xPos, yPos, saveWidth, 30, 0xc9b78d);
		this.cancel.setOrigin(0);
		this.cancel.setInteractive();

		this.cancel.once(Phaser.Input.Events.POINTER_DOWN, () => {
			this.scene.wake(Scenes.GamePause);
			this.scene.stop(Scenes.SaveGame);
		});

		this.cancelText = this.add.text(xPos, yPos, "Cancelar", {
			fixedHeight: 30,
			fixedWidth: saveWidth,
			align: "center",
			padding: {
				y: 6,
			},
		});
	}
}

export default SaveGame;
