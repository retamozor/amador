import { Scene } from "phaser";
import Player from "../entities/Player";

function getIndex(x: number, y: number) {
	return x * 19 + y;
}

class GameScene extends Scene {
  player!: Player;

  constructor() {
    super("GameScene");
  }

  create() {
    this.anims.create({
      key: "wait_down",
      frames: this.anims.generateFrameNames("player", {
        frames: [getIndex(0,0), getIndex(0,1), getIndex(0,2)]
      }),
      frameRate: 6,
      repeat: -1,
    });
    this.anims.create({
      key: "wait_up",
      frames: this.anims.generateFrameNames("player", {
        frames: [getIndex(1,0), getIndex(1,1), getIndex(1,2)]
      }),
      frameRate: 6,
      repeat: -1,
    });
    this.anims.create({
      key: "wait_right",
      frames: this.anims.generateFrameNames("player", {
        frames: [getIndex(2,0), getIndex(2,1), getIndex(2,2)]
      }),
      frameRate: 6,
      repeat: -1,
    });
    this.anims.create({
      key: "wait_left",
      frames: this.anims.generateFrameNames("player", {
        frames: [getIndex(3,0), getIndex(3,1), getIndex(3,2)]
      }),
      frameRate: 6,
      repeat: -1,
    });
    this.anims.create({
      key: "walk_down",
      frames: this.anims.generateFrameNames("player", {
        frames: [getIndex(4,0), getIndex(4,1), getIndex(4,2), getIndex(4,1)]
      }),
      frameRate: 6,
      repeat: -1,
    });
    this.anims.create({
      key: "walk_up",
      frames: this.anims.generateFrameNames("player", {
        frames: [getIndex(5,0), getIndex(5,1), getIndex(5,2), getIndex(5,1)]
      }),
      frameRate: 6,
      repeat: -1,
    });
    this.anims.create({
      key: "walk_right",
      frames: this.anims.generateFrameNames("player", {
        frames: [getIndex(6,0), getIndex(6,1), getIndex(6,2), getIndex(6,1)]
      }),
      frameRate: 6,
      repeat: -1,
    });
    this.anims.create({
      key: "walk_left",
      frames: this.anims.generateFrameNames("player", {
        frames: [getIndex(7,0), getIndex(7,1), getIndex(7,2), getIndex(7,1)]
      }),
      frameRate: 6,
      repeat: -1,
    });

    this.player = this.add.player(640, 360, "player");
  }
}

export default GameScene;
