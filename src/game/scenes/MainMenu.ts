import { GameObjects, Scene } from "phaser";
import Scenes from "../constants/Scenes";
import Textures from "../constants/Textures";
import ActionButton from "../forms/Button";

class MainMenu extends Scene {
	mainMenu!: GameObjects.Image;
	logo!: GameObjects.Image;
	new_game!: GameObjects.Image;
	volume!: ActionButton;
	music!: Phaser.Sound.WebAudioSound;

	constructor() {
		super(Scenes.MainMenu);
	}

	create() {
		this.mainMenu = this.add.image(0, 0, Textures.MainMenu);
		this.mainMenu.setOrigin(0);
		this.logo = this.add.image(310, 210, Textures.Logo);
		this.logo.setScale(7);

		this.new_game = this.add.button(310, 490, Textures.Buttons.NewGame);
		this.new_game.on(Phaser.Input.Events.POINTER_DOWN, () => {
			this.scene.start(Scenes.BusScene);
		});
		this.new_game.setScale(0.3);

		this.volume = this.add.button(220, 650, Textures.Buttons.Volume);
		this.volume.on(Phaser.Input.Events.POINTER_DOWN, () => {
			// if (!(this.music instanceof Phaser.Sound.WebAudioSound)) return;
			if (this.music.volume !== 0) {
				this.volume.textures = Textures.Buttons.NoVolume;
				this.music.setVolume(0);
				this.volume.setTexture(Textures.Buttons.NoVolume.pressed);
			} else {
				this.volume.textures = Textures.Buttons.Volume;
				this.music.setVolume(0.5);
				this.volume.setTexture(Textures.Buttons.Volume.pressed);
			}
		});
		this.volume.setScale(3);

		this.music =
			this.sound.get("bg-loop") ||
			(this.sound.add("bg-loop", {
				loop: true,
				volume: 0.5,
			}) as Phaser.Sound.WebAudioSound);

		if (!this.sound.isPlaying("bg-loop")) {
			this.music.play();
		}
	}
}

export default MainMenu;
