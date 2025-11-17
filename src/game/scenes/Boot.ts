import { Scene } from "phaser";
import Scenes from "../constants/Scenes";

class Boot extends Scene {
	constructor() {
		super(Scenes.Boot);
	}

	preload() { }

	create() {
		this.scene.start(Scenes.Preloader);
	}
}

export default Boot;
