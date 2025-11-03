class Controls {
	private scene: Phaser.Scene;
	private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
	private pad?: Phaser.Input.Gamepad.Gamepad;

	constructor(scene: Phaser.Scene) {
		this.scene = scene;
		this.cursors = scene.input.keyboard?.createCursorKeys();

		this.scene.input.gamepad?.once(
			"connected",
			(pad: Phaser.Input.Gamepad.Gamepad) => {
				console.log("🎮 Gamepad conectado:", pad.id);
				this.pad = pad;
			},
		);
	}

	get left() {
		return this.cursors?.left.isDown || false;
	}

	get right() {
		return this.cursors?.right.isDown || false;
	}

	get up() {
		return this.cursors?.up.isDown || false;
	}

	get down() {
		return this.cursors?.down.isDown || false;
	}

	get action() {
		return this.cursors?.space.isDown || false;
	}

	get shift() {
		return this.cursors?.shift.isDown || (this.pad?.R1 || 0) > 0 || false;
	}

	get dir() {
		const dir = new Phaser.Math.Vector2(0, 0);

		if (this.left) dir.x -= 1;
		if (this.right) dir.x += 1;
		if (this.up) dir.y -= 1;
		if (this.down) dir.y += 1;

		if (this.pad !== undefined) {
			const used =
				Math.abs(this.pad.getAxisValue(0) + this.pad.getAxisValue(1)) > 0;
			if (used) {
				dir.x = this.pad.getAxisValue(0);
				dir.y = this.pad.getAxisValue(1);
			}
		}

		dir.limit(1);
		return dir;
	}
}

export default Controls;
