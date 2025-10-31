
class Controls {
	// private scene: Phaser.Scene;
	private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

	constructor(scene: Phaser.Scene) {
		// this.scene = scene;
		this.cursors = scene.input.keyboard?.createCursorKeys()
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
}

export default Controls;
