import { AUTO, Game } from "phaser";
import Boot from "./scenes/Boot";
import Preloader from "./scenes/Preloader";
import MainMenu from "./scenes/MainMenu";
import GameScene from "./scenes/GameScene";

const config: Phaser.Types.Core.GameConfig = {
  type: AUTO,
  width: 1280,
  height: 720,
  parent: "game-container",
  pixelArt: true,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: { y: 0, x: 0 },
    },
  },
  backgroundColor: "#C9B78D",
  scene: [Boot, Preloader, MainMenu, GameScene],
};

const StartGame = (parent: string) => {
  return new Game({ ...config, parent });
};

export default StartGame;
