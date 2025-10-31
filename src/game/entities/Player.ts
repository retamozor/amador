import Controls from "../config/Controls";

class Player extends Phaser.Physics.Arcade.Sprite {
  private controls: Controls;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);
    this.controls = new Controls(scene);
    this.setScale(5);
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);

    const speed = 120;
    this.setVelocity(0);

    if (this.controls.left) {
      this.setVelocityX(-speed);
    }
    if (this.controls.right) {
      this.setVelocityX(speed);
    }
    if (this.controls.up) {
      this.setVelocityY(-speed);
    }
    if (this.controls.down) {
      this.setVelocityY(speed);
    }

    if (this.controls.left) {
      this.anims.play("walk_left", true);
    } else if (this.controls.right) {
      this.anims.play("walk_right", true);
    } else if (this.controls.up) {
      this.anims.play("walk_up", true);
    } else if (this.controls.down) {
      this.anims.play("walk_down", true);
    } else {
			const current = this.anims.currentAnim?.key;
			if (current === "walk_down") {
				this.anims.play("wait_down", true);
			} else if (current === "walk_up") {
				this.anims.play("wait_up", true);
			} else if (current === "walk_left") {
				this.anims.play("wait_left", true);
			} else if (current === "walk_right") {
				this.anims.play("wait_right", true);
			} else if (!current) {
				this.anims.play("wait_down", true);
			}
		}
  }
}

Phaser.GameObjects.GameObjectFactory.register(
  "player",
  function (
    this: Phaser.GameObjects.GameObjectFactory,
    x: number,
    y: number,
    texture: string,
  ) {
    return this.displayList.add(new Player(this.scene, x, y, texture));
  },
);

export default Player;
