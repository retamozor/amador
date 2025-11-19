import { Scene } from "phaser";
import Scenes from "../constants/Scenes";
import Textures from "../constants/Textures";

function getIndex(x: number, y: number) {
	return x * 3 + y;
}

class Preloader extends Scene {
	constructor() {
		super(Scenes.Preloader);
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
		this.load.image(Textures.Logo, "logo.png");
		this.load.image(Textures.MainMenu, "main_menu.png");
		this.load.image(Textures.BusScene, "bus_scene.png")
		this.load.image(Textures.AmadorSpeaking, "characters/amador_speaking.png")
		this.load.image(Textures.Bubble, "characters/bubble.png")
		this.load.image(Textures.Letter0, "letter_0.png")
		this.load.image(Textures.Letter1, "letter_1.png")
		this.load.image(Textures.Letter2, "letter_2.png")
		this.load.image(Textures.Letter3, "letter_3.png")
		

		this.load.image(Textures.Buttons.NewGame.default, "button/button.png")
		this.load.image(Textures.Buttons.NewGame.pressed, "button/button_pressed.png")
		this.load.image(Textures.Buttons.Pause.default, "button/stop.png")
		this.load.image(Textures.Buttons.Pause.pressed, "button/stop_pressed.png")
		this.load.image(Textures.Buttons.Volume.default, "button/volume.png")
		this.load.image(Textures.Buttons.Volume.pressed, "button/volume_pressed.png")
		this.load.image(Textures.Buttons.NoVolume.default, "button/no_volume.png")
		this.load.image(Textures.Buttons.NoVolume.pressed, "button/no_volume_pressed.png")
		this.load.image(Textures.Buttons.Next.default, "button/next.png")
		this.load.image(Textures.Buttons.Next.pressed, "button/next_pressed.png")

		this.load.font({
			key: "VT323",
			url: "VT323-Regular.ttf",
			format: "truetype",
			descriptors: { style: "normal", weight: 400 },
		});

		this.load.audio("bg-loop", "sound/bg-loop.mp3")
		this.load.audio("on-board-bus", "sound/on_board_bus.mp3")
		this.load.audio("ambient", "sound/ambient.mp3")
		
		this.load.spritesheet(Textures.Sprites.Player, "sprites/amador_sprites.png", {
			frameWidth: 32
	 	});
		this.load.tilemapTiledJSON(Textures.Maps.House, "maps/amador-tilemap.json");
		this.load.image(Textures.Tiles.House, "maps/JUGUETERIA PIXEL ART.png");
	}

	create() {
		this.scene.start(Scenes.MainMenu);

		this.anims.create({
			key: "wait_down",
			frames: this.anims.generateFrameNames("player", {
				frames: [getIndex(0, 0), getIndex(0, 1), getIndex(0, 2)],
			}),
			frameRate: 4,
			repeat: -1,
		});
		this.anims.create({
			key: "wait_up",
			frames: this.anims.generateFrameNames("player", {
				frames: [getIndex(1, 0), getIndex(1, 1), getIndex(1, 2)],
			}),
			frameRate: 4,
			repeat: -1,
		});
		this.anims.create({
			key: "wait_right",
			frames: this.anims.generateFrameNames("player", {
				frames: [getIndex(2, 0), getIndex(2, 1), getIndex(2, 2)],
			}),
			frameRate: 4,
			repeat: -1,
		});
		this.anims.create({
			key: "wait_left",
			frames: this.anims.generateFrameNames("player", {
				frames: [getIndex(3, 0), getIndex(3, 1), getIndex(3, 2)],
			}),
			frameRate: 4,
			repeat: -1,
		});
		this.anims.create({
			key: "walk_down",
			frames: this.anims.generateFrameNames("player", {
				frames: [
					getIndex(4, 0),
					getIndex(4, 1),
					getIndex(4, 2),
					getIndex(4, 1),
				],
			}),
			frameRate: 6,
			repeat: -1,
		});
		this.anims.create({
			key: "walk_up",
			frames: this.anims.generateFrameNames("player", {
				frames: [
					getIndex(5, 0),
					getIndex(5, 1),
					getIndex(5, 2),
					getIndex(5, 1),
				],
			}),
			frameRate: 6,
			repeat: -1,
		});
		this.anims.create({
			key: "walk_right",
			frames: this.anims.generateFrameNames("player", {
				frames: [
					getIndex(6, 0),
					getIndex(6, 1),
					getIndex(6, 2),
					getIndex(6, 1),
				],
			}),
			frameRate: 6,
			repeat: -1,
		});
		this.anims.create({
			key: "walk_left",
			frames: this.anims.generateFrameNames("player", {
				frames: [
					getIndex(7, 0),
					getIndex(7, 1),
					getIndex(7, 2),
					getIndex(7, 1),
				],
			}),
			frameRate: 6,
			repeat: -1,
		});
	}
}

export default Preloader;
