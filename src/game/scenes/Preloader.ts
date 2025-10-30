import { Scene } from "phaser";

class Preloader extends Scene {
	constructor() {
		super("Preloader");
	}

	init() {
		this.add.rectangle(640, 384, 468, 32).setStrokeStyle(1, 0xffffff);

		const bar = this.add.rectangle(640 - 230, 384, 4, 28, 0xffffff);

		this.load.on("progress", (progress: number) => {
			bar.width = 4 + 460 * progress;
		});
	}

	preload() {
		this.load.setPath("assets");
		this.load.image("logo", "logo.png");
		this.load.font({
			key: "VT323",
			url: "VT323-Regular.ttf",
			format: "truetype",
			descriptors: { style: "normal", weight: 400 },
		});
		this.load.audio("bg-loop", "bg-loop.mp3")
	}

	create() {
		this.scene.start("MainMenu");
	}
}

export default Preloader;
