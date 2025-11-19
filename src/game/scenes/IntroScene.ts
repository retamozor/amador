import { Scene } from "phaser";
import Scenes from "../constants/Scenes";
import Textures from "../constants/Textures";
import type ActionButton from "../forms/Button";

const secuence = [
	{
		text: "Uy… ¡Hola! seguro se estarán preguntando quién soy yo y qué hago por acá, ¿cierto?",
		audio: "dialog_0",
		scene: false,
		letter: false,
	},
	{
		text: "Pues, me llamo José María Amador, aunque me pueden decir solo Amador.",
		audio: "dialog_1",
		scene: false,
		letter: false,
	},
	{
		text: "Hace un par de semanas me llegó una carta de una tía abuela que ni conocía…",
		audio: "dialog_2",
		scene: false,
		letter: false,
	},
	{
		text: "En ella decía que me había dejado una finca de herencia, allá en Tuluá. El Califa, se llama.",
		audio: "dialog_3",
		scene: false,
		letter: false,
	},
	{
		text: "Querido José María:\n\nSi esta carta llega a tus manos, es porque ha llegado el momento de que conozcas aquello que te pertenece por nombre y por sangre.\nTe dejo en herencia la finca El Califa, un lugar que ha guardado durante años historias que quizá algún día comprenderás. Ojalá te animes a visitarla.\n\nCon cariño,\nTu tía abuela,\nClementina Amador",
		audio: "letter",
		scene: false,
		letter: true,
	},
	{
		text: "",
		audio: "",
		scene: true,
		letter: false,
	},
];

class IntroScene extends Scene {
	character!: Phaser.GameObjects.Image;
	bubble!: Phaser.GameObjects.Image;
	text!: Phaser.GameObjects.Text;
	fullText: string = "";
	sequenceIndex: number;
	isTyping: boolean;
	typeEvent: Phaser.Time.TimerEvent | null;
	nextButton!: ActionButton;
	letter!: Phaser.GameObjects.Image;
	dialogAudio: Phaser.Sound.WebAudioSound | null = null;

	constructor() {
		super(Scenes.IntroScene);
		this.sequenceIndex = 0;
		this.isTyping = false;
		this.typeEvent = null;
	}

	create() {
		this.character = this.add.image(
			150,
			this.cameras.main.height,
			Textures.AmadorSpeaking,
		);
		this.character.setOrigin(0, 1);
		this.character.setScale(5);
		this.character.setFlipX(true);
		this.bubble = this.add.image(
			150,
			this.cameras.main.height - 10,
			Textures.Bubble,
		);
		this.bubble.setOrigin(0, 1);
		this.bubble.setScale(8);

		this.sequenceIndex = 0;
		this.isTyping = false;
		this.typeEvent = null;

		// --- texto en pantalla ---
		this.text = this.add.text(180, 580, "", {
			fontSize: "26px",
			color: "#fff",
			wordWrap: { width: 500 },
			fontFamily: "VT323",
		});

		// --- botón para avanzar ---
		this.nextButton = this.add.button(1100, 650, Textures.Buttons.Next);
		this.nextButton.setScale(4);

		this.nextButton.on("pointerdown", () => this.onNextPressed());

		this.letter = this.add
			.image(
				this.cameras.main.width / 2,
				this.cameras.main.height / 2,
				Textures.Letter0,
			)
			.setAlpha(0);
		// Iniciar primer diálogo
		this.showCurrent();
	}

	// ---------------------------
	// 🔤 Escribir el texto (typewriter)
	// ---------------------------
	typewrite(fullText: string, speed = 35) {
		this.fullText = fullText;
		this.isTyping = true;
		this.text.setText("");

		let i = 0;

		this.typeEvent = this.time.addEvent({
			delay: speed,
			loop: true,
			callback: () => {
				// escribir siguiente letra
				this.text.setText(fullText.slice(0, i));
				i++;

				// terminó el texto
				if (i > fullText.length) {
					this.isTyping = false;
					this.typeEvent?.remove();
				}
			},
		});
	}

	// ---------------------------
	// ▶ Botón presionado
	// ---------------------------
	onNextPressed() {
		// Si todavía está escribiendo → completar inmediatamente
		if (this.isTyping) {
			this.typeEvent?.remove();
			this.isTyping = false;
			this.text.setText(this.fullText);
			return;
		}

		// Si ya terminó → pasar a siguiente
		this.sequenceIndex++;

		if (this.sequenceIndex >= secuence.length) return;

		this.showCurrent();
	}

	// ---------------------------
	// 📦 Mostrar la entrada actual
	// ---------------------------
	showCurrent() {
		const entry = secuence[this.sequenceIndex];

		// 1. Si hay animación de carta antes del texto
		if (entry.letter) {
			this.playLetterAnimation();
			return;
		}

		// 2. Si hay cambio de escena
		if (entry.scene) {
			if (this.dialogAudio?.isPlaying) {
				this.dialogAudio.stop();
				this.dialogAudio.destroy();
			}
			this.scene.start(Scenes.GameScene);
			return;
		}

		// 3. Mostrar texto normal
		this.typewrite(entry.text);
		if (this.dialogAudio?.isPlaying) {
			this.dialogAudio.stop();
			this.dialogAudio.destroy();
		}

		this.dialogAudio = this.sound.add(entry.audio, {
			pan: -0.2,
		}) as Phaser.Sound.WebAudioSound;
		this.dialogAudio.play();
	}

	// ---------------------------
	// ✉ Animación de carta (placeholder)
	// ---------------------------
	playLetterAnimation() {
		this.nextButton.disableInteractive();
		this.letter.setAlpha(1);
		this.time.delayedCall(2000, () => {
			this.letter.setTexture(Textures.Letter1);
		});
		this.time.delayedCall(4000, () => {
			this.letter.setTexture(Textures.Letter2);
		});
		this.time.delayedCall(6000, () => {
			this.letter.setTexture(Textures.Letter3);
			if (this.dialogAudio?.isPlaying) {
				this.dialogAudio.stop();
				this.dialogAudio.destroy();
			}

			this.dialogAudio = this.sound.add("letter") as Phaser.Sound.WebAudioSound;
			this.dialogAudio.play();
		});
		this.time.delayedCall(8000, () => {
			this.nextButton.setInteractive();
			this.nextButton.setToTop();
		});
	}
}

export default IntroScene;
