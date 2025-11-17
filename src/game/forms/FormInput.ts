import Phaser from "phaser";

type InputConfig = Partial<
	Pick<
		HTMLInputElement,
		| "type"
		| "value"
		| "placeholder"
		| "maxLength"
		| "disabled"
		| "readOnly"
		| "autocomplete"
		| "autofocus"
		| "onchange"
	>
>;

class FormInput {
	scene: Phaser.Scene;
	element: HTMLInputElement;
	pos: { x: number; y: number; w: number; h: number };

	constructor(
		scene: Phaser.Scene,
		pos: { x: number; y: number; w: number; h: number },
		config: InputConfig = {},
	) {
		this.scene = scene;

		this.element = document.createElement("input");
		Object.assign(this.element, config);

		this.pos = { ...pos };

		this.element.style.position = "absolute";
		this.element.style.zIndex = "9999";
		// this.element.style.transform = "translate(-50%, -50%)";

		document.body.appendChild(this.element);

		this.scene.scale.on(Phaser.Scale.Events.RESIZE, this.updatePosition, this);
		this.scene.events.once(Phaser.Scenes.Events.SHUTDOWN, this.destroy, this);
		this.scene.events.once(Phaser.Scenes.Events.DESTROY, this.destroy, this);

		this.updatePosition();
	}

	get value() {
		return this.element.value;
	}

	set value(value: string) {
		this.element.value = value;
	}

	private updatePosition() {
		const cam = this.scene.cameras.main;
		const canvasRect = this.scene.game.canvas.getBoundingClientRect();

		const scaleX = canvasRect.width / cam.width;
		const scaleY = canvasRect.height / cam.height;
		const screenX = (this.pos.x - cam.worldView.x) * scaleX * cam.zoom + canvasRect.left;
		const screenY = (this.pos.y - cam.worldView.y) * scaleY * cam.zoom + canvasRect.top;

		this.element.style.left = `${screenX}px`;
		this.element.style.top = `${screenY}px`;

		const width = this.pos.w * scaleX * cam.zoom;
		const height = this.pos.h * scaleY * cam.zoom;

		this.element.style.width = `${width}px`;
		this.element.style.height = `${height}px`;

		this.element.style.fontSize = `${14 * scaleY * cam.zoom}px`;
	}

	destroy() {
		this.element.remove();
		this.scene.scale.off(Phaser.Scale.Events.RESIZE, this.updatePosition, this)
		this.scene.events.off(Phaser.Scenes.Events.SHUTDOWN, this.destroy, this);
		this.scene.events.off(Phaser.Scenes.Events.DESTROY, this.destroy, this);
	}
}

export default FormInput;
