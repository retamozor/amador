import { GameObjects } from "phaser";
import { ButtonTexture } from "../constants/Textures";

class ActionButton extends GameObjects.Image {
	#textures: ButtonTexture;

	constructor(
		scene: Phaser.Scene,
		x: number,
		y: number,
		textures: ButtonTexture,
	) {
		super(scene, x, y, textures.default);
		
		this.#textures = textures;

    this.setOrigin(0.5, 1);
		this.setInteractive();

		this.on(Phaser.Input.Events.POINTER_OVER, () =>
			this.setTexture(this.#textures.pressed),
		);
		this.on(Phaser.Input.Events.POINTER_OUT, () =>
			this.setTexture(this.#textures.default),
		);
	}
	
	get textures() {
		return this.#textures;
	}

	set textures(textures: ButtonTexture) {
		this.#textures = textures;
	}
}

Phaser.GameObjects.GameObjectFactory.register(
	"button",
	function(
		this: Phaser.GameObjects.GameObjectFactory,
		x: number,
		y: number,
		texture: ButtonTexture,
	) {
		const button = new ActionButton(this.scene, x, y, texture);
		this.displayList.add(button);
		return button;
	},
);

export default ActionButton;
