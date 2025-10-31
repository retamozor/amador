import Player from "../entities/Player";

declare global {
  namespace Phaser.GameObjects {
    interface GameObjectFactory {
      player(x: number, y: number, texture: string): Player;
    }
  }
}

export {};
