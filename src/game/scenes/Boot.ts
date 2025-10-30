import { Scene } from "phaser";

class Boot extends Scene {
	constructor() {
		super("Boot");
	}

	preload() { }

	create() {
		this.scene.start("Preloader");
	}
}

export default Boot;
