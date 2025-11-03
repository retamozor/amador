import { Scene } from "phaser";
import Player from "../entities/Player";

class GameScene extends Scene {
  player!: Player;
	map!: Phaser.Tilemaps.Tilemap;
	tileset!: Phaser.Tilemaps.Tileset | null;

  constructor() {
    super("GameScene");
  }

  create() {
		this.map = this.make.tilemap({ key: "map" });
		this.tileset = this.map.addTilesetImage("JUGUETERIA PIXEL ART", "tiles");
		for (let layerName of this.map.getTileLayerNames()) {
			this.map.createLayer(layerName, this.tileset!, 0, 0);
		}

		this.physics.world.setBounds(0,0, this.map.widthInPixels, this.map.heightInPixels);
		this.cameras.main.setBounds(0,0, this.map.widthInPixels, this.map.heightInPixels);
    
		this.player = this.add.player(832, 420, "player");

		this.cameras.main.startFollow(this.player);
		this.cameras.main.setZoom(3)
		this.cameras.main.setDeadzone(200, 100);
		
  }
}

export default GameScene;
