import Player from "../entities/Player";
import type { ButtonTexture } from "../game/constants/Textures";
import ActionButton from "../game/forms/Button";

declare global {
  namespace Phaser.GameObjects {
    interface GameObjectFactory {
      player(x: number, y: number, texture: string): Player;
      button(x: number, y: number, texture: ButtonTexture): ActionButton;
    }
  }
}

export {};
