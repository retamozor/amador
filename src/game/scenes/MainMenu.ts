import { GameObjects, Scene } from "phaser";
import Scenes from "../constants/Scenes";
import Textures from "../constants/Textures";

class MainMenu extends Scene {
  logo!: GameObjects.Image;
  new_game!: GameObjects.Image;
  music!: Phaser.Sound.BaseSound;

  constructor() {
    super(Scenes.MainMenu);
  }

  create() {
    this.logo = this.add.image(640, 300, Textures.Logo);
    this.logo.setScale(10, 10);

    this.new_game = this.add.image(640, 540, Textures.Buttons.NewGame.default);
    this.new_game.setScale(0.25, 0.25);
    this.new_game.setOrigin(0.5, 1);
    this.new_game.setInteractive();
    this.new_game.on(Phaser.Input.Events.POINTER_DOWN, () => {
      this.scene.start(Scenes.GameScene);
    });
    this.new_game.on(Phaser.Input.Events.POINTER_OVER, () =>
      this.new_game.setTexture(Textures.Buttons.NewGame.pressed),
    );
    this.new_game.on(Phaser.Input.Events.POINTER_OUT, () =>
      this.new_game.setTexture(Textures.Buttons.NewGame.default),
    );

    this.music = this.sound.add("bg-loop", {
      loop: true,
      volume: 0.5,
    });

    this.music.play();
  }
}

export default MainMenu;
