import { Scene } from "phaser";
import Player from "../entities/Player";
import Scenes from "../constants/Scenes";
import Textures from "../constants/Textures";
import gameStore from "../store/gameStore";

class GameScene extends Scene {
	player!: Player;
	map!: Phaser.Tilemaps.Tilemap;
	tileset: Phaser.Tilemaps.Tileset | null = null;

	constructor() {
		super(Scenes.GameScene);
	}

	create() {
		this.map = this.make.tilemap({ key: Textures.Maps.House });

		this.tileset = this.map.addTilesetImage(
			"JUGUETERIA PIXEL ART",
			Textures.Tiles.House,
		);
		const layers: Phaser.Tilemaps.TilemapLayer[] = [];
		for (let layerName of this.map.getTileLayerNames()) {
			const layer = this.map.createLayer(layerName, this.tileset!, 0, 0);
			if (!layer) continue;
			layers.push(layer);
		}

		this.physics.world.setBounds(
			0,
			0,
			this.map.widthInPixels,
			this.map.heightInPixels,
		);
		this.cameras.main.setBounds(
			0,
			0,
			this.map.widthInPixels,
			this.map.heightInPixels,
		);
		this.player = this.add.player(
			gameStore.getState().player.x,
			gameStore.getState().player.y,
			Textures.Sprites.Player,
		);

		const debugGraphics = this.add.graphics().setAlpha(0.75);
		for (const layer of layers) {
			layer.forEachTile((tile) => {
				const tileData: any = this.tileset?.getTileData(tile.index);
				if (!tileData?.objectgroup) return;

				for (const obj of tileData.objectgroup.objects) {
					const x = tile.getLeft() + obj.x;
					const y = tile.getTop() + obj.y;

					const tileObjectGroup = this.physics.add.staticImage(x, y, "");
					tileObjectGroup.setVisible(false);
					tileObjectGroup.setSize(obj.width, obj.height);
					tileObjectGroup.setOffset(16, 16);
					this.physics.add.collider(this.player, tileObjectGroup);
				}
			});

			layer.renderDebug(debugGraphics, {
				tileColor: null, // sin color para tiles normales
				collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // naranja
				faceColor: new Phaser.Display.Color(40, 39, 37, 255), // gris oscuro
			});
		}

		this.cameras.main.startFollow(this.player);
		this.cameras.main.setZoom(3);
		this.cameras.main.setLerp(0.1, 0.1);

		this.scene.launch(Scenes.GameHUD);

		this.time.addEvent({
			delay: 1000 * 60 * 1, 
			callback: () => gameStore.getState().saveState(),
			loop: true,
			paused: false
		});
	}
}

export default GameScene;
