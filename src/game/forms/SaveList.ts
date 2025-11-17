import moment from "moment";
import gameStore from "../store/gameStore";

class SaveList {
	scene: Phaser.Scene;
	element: HTMLDivElement;
	pos: { x: number; y: number; w: number; h: number };
	private selectedElement: HTMLDivElement | null = null;

	constructor(
		scene: Phaser.Scene,
		pos: { x: number; y: number; w: number; h: number },
		onSelect?: (id: string) => void,
	) {
		this.scene = scene;

		this.element = document.createElement("div");
		this.element.classList.add("save-list");

		this.pos = { ...pos };
		this.element.style.position = "absolute";
		this.element.style.zIndex = "9999";
		this.element.onclick = (e) => {
			const target = e.target;

			if (!(target instanceof Element)) return;

			const selected = target.closest(".save-element");
			if (!(selected instanceof HTMLDivElement)) return;

			this.selectedElement?.classList.remove("selected");

			this.selectedElement = selected;
			const id = selected.id;
			selected.classList.add("selected");

			onSelect?.(id);
		};

		document.body.appendChild(this.element);

		this.scene.scale.on(Phaser.Scale.Events.RESIZE, this.updatePosition, this);
		this.scene.events.once(Phaser.Scenes.Events.SHUTDOWN, this.destroy, this);
		this.scene.events.once(Phaser.Scenes.Events.DESTROY, this.destroy, this);

		this.updatePosition();
		this.updateContent();
	}

	private updatePosition() {
		const cam = this.scene.cameras.main;
		const canvasRect = this.scene.game.canvas.getBoundingClientRect();

		const scaleX = canvasRect.width / cam.width;
		const scaleY = canvasRect.height / cam.height;
		const screenX =
			(this.pos.x - cam.worldView.x) * scaleX * cam.zoom + canvasRect.left;
		const screenY =
			(this.pos.y - cam.worldView.y) * scaleY * cam.zoom + canvasRect.top;

		this.element.style.left = `${screenX}px`;
		this.element.style.top = `${screenY}px`;

		const width = this.pos.w * scaleX * cam.zoom;
		const height = this.pos.h * scaleY * cam.zoom;

		this.element.style.width = `${width}px`;
		this.element.style.height = `${height}px`;

		this.element.style.fontSize = `${16 * scaleY * cam.zoom}px`;
	}

	destroy() {
		this.element.remove();
		this.scene.scale.off(Phaser.Scale.Events.RESIZE, this.updatePosition, this);
		this.scene.events.off(Phaser.Scenes.Events.SHUTDOWN, this.destroy, this);
		this.scene.events.off(Phaser.Scenes.Events.DESTROY, this.destroy, this);
	}

	updateContent() {
		const saveList = gameStore.getState().getSaveList();

		const fragment = document.createDocumentFragment();

		for (const save of saveList) {
			const div = document.createElement("div");
			div.classList.add("save-element");
			div.id = save.id;

			const row1 = document.createElement("div");
			const row2 = document.createElement("div");
			row1.classList.add("row");
			row2.classList.add("row");
			row2.classList.add("justify");

			const name = document.createElement("b");
			const id = document.createElement("small");
			const date = document.createElement("div");

			name.textContent = save.name;
			name.classList.add("save-name");
			id.textContent = `id: ${save.id}`;
			id.classList.add("save-id");
			date.textContent = moment(save.date).format("DD/MM/YYYY hh:mm:ss A");

			row1.appendChild(name);
			row2.appendChild(id);
			row2.appendChild(date);

			div.appendChild(row1);
			div.appendChild(row2);

			fragment.appendChild(div);
		}

		this.element.replaceChildren(fragment);
	}

	get selectedId() {
		if (this.selectedElement === null) return null;
		this.selectedElement.id;
	}
}

export default SaveList;
