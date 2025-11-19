import { Scene } from "phaser";
import Scenes from "../constants/Scenes";
import Textures from "../constants/Textures";
import { createNoise2D } from "simplex-noise";

class BusScene extends Scene {
	img!: Phaser.GameObjects.Image;
	animation: Phaser.Time.TimerEvent | null;
	constructor() {
		super(Scenes.BusScene);
		this.animation = null;
	}

	create() {
		this.sound.get("bg-loop").stop();
		this.sound.add("on-board-bus").play();

		this.cameras.main.setBounds(
			-50,
			-50,
			this.cameras.main.width + 100,
			this.cameras.main.height + 100,
		);
		this.physics.world.setBounds(
			-50,
			-50,
			this.cameras.main.width + 100,
			this.cameras.main.height + 100,
		);

		this.img = this.add.image(
			this.cameras.main.width / 2,
			this.cameras.main.height / 2,
			Textures.BusScene,
		);
		this.img.setScale(0.8);
		this.img.setOrigin(0.5);

		this.startSoftShake();

		this.time.addEvent({
			delay: 10000,
			callback: () => {
				if (this.animation !== null) this.time.removeEvent(this.animation);
				this.scene.start(Scenes.IntroScene);
			},
		});

		const fadeRect = this.add
			.rectangle(
				0,
				0,
				this.cameras.main.width,
				this.cameras.main.height,
				0x000000,
			)
			.setOrigin(0)
			.setAlpha(1);

		this.tweens.add({
			targets: fadeRect,
			alpha: 0, // termina transparente
			duration: 2000, // 2 segundos
			ease: "Sine.inOut",
		});
		this.time.addEvent({
			delay: 8000,
			callback: () => {
				this.tweens.add({
					targets: fadeRect,
					alpha: 1, // termina transparente
					duration: 2000, // 2 segundos
					ease: "Sine.inOut",
				});
			},
		});
	}

	startSoftShake() {
		const noise = createNoise2D();
		let t = 0;

		this.animation = this.time.addEvent({
			delay: 16, // ~60fps
			loop: true,
			callback: () => {
				t += 0.04; // Velocidad del ruido (más alto = más rápido)

				const x = this.cameras.main.width / 2 + noise(t, 0) * 6; // rango suave
				const y = this.cameras.main.height / 2 + noise(0, t) * 6;

				this.img.setPosition(x, y);
			},
		});
	}
}

export default BusScene;
