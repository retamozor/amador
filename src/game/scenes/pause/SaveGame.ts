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

		this.saveName = new FormInput(
			this,
			{ x: 300, y: 200, w: 300, h: 30 },
			{
				placeholder: "Ingresa un nombre",
				autofocus: true,
				onchange: (_e) => {
					this.saveId = null;
				}
			},
		);

		this.save = this.add.rectangle(630, 200, 120, 30, 0xc9b78d);
		this.save.setOrigin(0);
		this.save.setInteractive();

		this.save.on(Phaser.Input.Events.POINTER_DOWN, () => {
			console.log(this.saveName.value);
			if (this.saveName.value.trim()) {
				if(this.saveId === null) {
					gameStore.getState().saveState(this.saveName.value);
				} else {
					gameStore.getState().replaceState(this.saveId)
				}

				this.scene.wake(Scenes.GamePause);
				this.scene.stop(Scenes.SaveGame);
			}
		});

		this.saveText = this.add.text(630, 200, "Guardar", {
			fixedHeight: 30,
			fixedWidth: 120,
			align: "center",
			padding: {
				y: 6,
			},
		});

		this.cancel = this.add.rectangle(630, 500, 120, 30, 0xc9b78d);
		this.cancel.setOrigin(0);
		this.cancel.setInteractive();

		this.cancel.once(Phaser.Input.Events.POINTER_DOWN, () => {
			this.scene.wake(Scenes.GamePause);
			this.scene.stop(Scenes.SaveGame);
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
			this.saveName.value = gameStore.getState().saves[id].name
			this.saveId = id;
		});
	}
}

export default SaveGame;
