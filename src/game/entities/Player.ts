import Controls from "../config/Controls";
import gameStore from "../store/gameStore";


class Player extends Phaser.Physics.Arcade.Sprite {
	private controls: Controls;
	private walkingSpeed = 25 * 2;
	private runnigSpeed = 45 * 2;
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

		this.body?.setSize(20, 6).setOffset(6, 25);

		// this.setScale(2);
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
			this.setAcceleration(dir.x * this.accel, dir.y * this.accel);
		} else {
			this.setAcceleration(0, 0);
		}

		const vel = this.body?.velocity;
		vel?.lerp(desiredSpeed, 0.1);
		vel?.limit(this.maxSpeed);

		this.playAnimation(vel);
		// if ((vel?.x || 0) < -0.1) {
		// 	this.anims.play("walk_left", true);
		// } else if ((vel?.x || 0) > 0.1) {
		// 	this.anims.play("walk_right", true);
		// } else if ((vel?.y || 0) < -0.1) {
		// 	this.anims.play("walk_up", true);
		// } else if ((vel?.y || 0) > 0.1) {
		// 	this.anims.play("walk_down", true);
		// } else {
		// 	const current = this.anims.currentAnim?.key;
		// 	if (current === "walk_down") {
		// 		this.anims.play("wait_down", true);
		// 	} else if (current === "walk_up") {
		// 		this.anims.play("wait_up", true);
		// 	} else if (current === "walk_left") {
		// 		this.anims.play("wait_left", true);
		// 	} else if (current === "walk_right") {
		// 		this.anims.play("wait_right", true);
		// 	} else if (!current) {
		// 		this.anims.play("wait_down", true);
		// 	}
		// }
		const setPlayerPos = gameStore.getState().setPlayerPos;
		setPlayerPos(this.x, this.y);
	}

	playAnimation(vel?: Phaser.Math.Vector2) {
		const netVel = vel?.length() ?? 0;

		if (vel === undefined || netVel < 0.1) {
			this.playWaitAnimation();
			return;
		}

		const isXgtY = Math.abs(vel.x) > Math.abs(vel.y);

		if (vel.x > 0 && isXgtY) {
			this.anims.play("walk_right", true);
			return;
		}

		if (vel.x < 0 && isXgtY) {
			this.anims.play("walk_left", true);
			return;
		}

		if (vel.y < 0 && !isXgtY) {
			this.anims.play("walk_up", true);
			return;
		}

		if (vel.y > 0 && !isXgtY) {
			this.anims.play("walk_down", true);
			return;
		}

		this.anims.stop();
	}

	playWaitAnimation() {
		const currentAnim = this.anims.currentAnim?.key;

		if (currentAnim === "walk_down") {
			this.anims.play("wait_down", true);
			return;
		}

		if (currentAnim === "walk_up") {
			this.anims.play("wait_up", true);
			return;
		}

		if (currentAnim === "walk_left") {
			this.anims.play("wait_left", true);
			return;
		}

		if (currentAnim === "walk_right") {
			this.anims.play("wait_right", true);
			return;
		}

		if (currentAnim === undefined) {
			this.anims.play("wait_down", true);
			return;
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
