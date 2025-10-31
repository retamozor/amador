import { GameObjects, Scene } from "phaser";

class MainMenu extends Scene {
  logo!: GameObjects.Image;
  new_game!: GameObjects.Image;
  music!: Phaser.Sound.BaseSound;

  constructor() {
    super("MainMenu");
  }

  create() {
    this.logo = this.add.image(640, 300, "logo");
    this.logo.setScale(10, 10);

    this.new_game = this.add.image(640, 540, "button_new_game");
    this.new_game.setScale(0.25, 0.25);
    this.new_game.setOrigin(0.5, 1);
    this.new_game.setInteractive();
    this.new_game.on("pointerdown", () => {
      console.log("hello world");
      this.scene.start("GameScene");
    });
    this.new_game.on("pointerover", () =>
      this.new_game.setTexture("button_new_game_pressed"),
    );
    this.new_game.on("pointerout", () =>
      this.new_game.setTexture("button_new_game"),
    );

    this.music = this.sound.add("bg-loop", {
      loop: true,
      volume: 0.5,
    });

    this.music.play();
  }
}

export default MainMenu;
