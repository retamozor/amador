import Controls from "../config/Controls";

function getIndex(x: number, y: number) {
	return x * 19 + y;
}

class Player extends Phaser.Physics.Arcade.Sprite {
	private controls: Controls;
	private walkingSpeed = 25 *2;
	private runnigSpeed = 45 *2;
	private maxSpeed = this.walkingSpeed;
	private drag = 200 * 2;
	private accel = 400 * 2;

	constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
		super(scene, x, y, texture);

		scene.add.existing(this);
		scene.physics.add.existing(this);

		this.setCollideWorldBounds(true);
		this.controls = new Controls(scene);

		this.setDrag(this.drag);


    scene.anims.create({
      key: "wait_down",
      frames: scene.anims.generateFrameNames("player", {
        frames: [getIndex(0,0), getIndex(0,1), getIndex(0,2)]
      }),
      frameRate: 6,
      repeat: -1,
    });
    scene.anims.create({
      key: "wait_up",
      frames: scene.anims.generateFrameNames("player", {
        frames: [getIndex(1,0), getIndex(1,1), getIndex(1,2)]
      }),
      frameRate: 6,
      repeat: -1,
    });
    scene.anims.create({
      key: "wait_right",
      frames: scene.anims.generateFrameNames("player", {
        frames: [getIndex(2,0), getIndex(2,1), getIndex(2,2)]
      }),
      frameRate: 6,
      repeat: -1,
    });
    scene.anims.create({
      key: "wait_left",
      frames: scene.anims.generateFrameNames("player", {
        frames: [getIndex(3,0), getIndex(3,1), getIndex(3,2)]
      }),
      frameRate: 6,
      repeat: -1,
    });
    scene.anims.create({
      key: "walk_down",
      frames: scene.anims.generateFrameNames("player", {
        frames: [getIndex(4,0), getIndex(4,1), getIndex(4,2), getIndex(4,1)]
      }),
      frameRate: 6,
      repeat: -1,
    });
    scene.anims.create({
      key: "walk_up",
      frames: scene.anims.generateFrameNames("player", {
        frames: [getIndex(5,0), getIndex(5,1), getIndex(5,2), getIndex(5,1)]
      }),
      frameRate: 6,
      repeat: -1,
    });
    scene.anims.create({
      key: "walk_right",
      frames: scene.anims.generateFrameNames("player", {
        frames: [getIndex(6,0), getIndex(6,1), getIndex(6,2), getIndex(6,1)]
      }),
      frameRate: 6,
      repeat: -1,
    });
    scene.anims.create({
      key: "walk_left",
      frames: scene.anims.generateFrameNames("player", {
        frames: [getIndex(7,0), getIndex(7,1), getIndex(7,2), getIndex(7,1)]
      }),
      frameRate: 6,
      repeat: -1,
    });
		this.setScale(2);
	}

	preUpdate(time: number, delta: number) {
		super.preUpdate(time, delta);

		const dir = this.controls.dir;

		if (this.controls.shift) {
			this.maxSpeed = this.runnigSpeed;
		} else {
			this.maxSpeed = this.walkingSpeed;
		}
		const desiredSpeed = dir.clone().setLength(this.maxSpeed * dir.length());


		if (dir.length() > 0) {
			this.setAcceleration(dir.x * this.accel , dir.y * this.accel );
		} else {
			this.setAcceleration(0, 0);
		}

		const vel = this.body?.velocity;
		vel?.lerp(desiredSpeed, 0.10);
		vel?.limit(this.maxSpeed);

		if ((vel?.x || 0) < -0.1) {
			this.anims.play("walk_left", true);
		} else if ((vel?.x || 0) > 0.1) {
			this.anims.play("walk_right", true);
		} else if ((vel?.y || 0) < -0.1) {
			this.anims.play("walk_up", true);
		} else if ((vel?.y || 0) > 0.1) {
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
	function(
		this: Phaser.GameObjects.GameObjectFactory,
		x: number,
		y: number,
		texture: string,
	) {
		const player = new Player(this.scene, x, y, texture);
		this.displayList.add(player);
		return player;
	},
);

export default Player;
