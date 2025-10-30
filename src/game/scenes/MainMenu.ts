import { GameObjects, Scene } from "phaser";

class MainMenu extends Scene {
	logo!: GameObjects.Image;
	title!: GameObjects.Text;
	music!: Phaser.Sound.BaseSound;

	constructor() {
		super("MainMenu");
	}

	create() {
		this.logo = this.add.image(640, 300, "logo");
		this.logo.setScale(10, 10);

		this.title = this.add.text(640, 460, "Nueva Partida", {
			fontFamily: "VT323",
			fontSize: 64,
			color: "#fff",
			align: "center",
		});
		this.title.setOrigin(0.5);
		this.title.setInteractive();
		this.title.on("pointerdown", () => {
			console.log("hello world");
		});

		this.music = this.sound.add("bg-loop", {
			loop: true,
			volume: 0.5,
		});

		this.input.once("pointerdown", () => {
			this.music.play();
		});
	}
}

export default MainMenu;
