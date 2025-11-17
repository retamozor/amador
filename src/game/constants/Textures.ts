class Button {
  default: string;
  pressed: string;
  constructor(name: string) {
    this.default = `button_${name}`;
    this.pressed = `button_${name}_pressed`;
  }
}

class Buttons {
  NewGame = new Button("new_game");
  Pause = new Button("pause");
}

class Sprites {
  Player = "player";
}

class Tiles {
  House = "house-tile-set";
}

class Maps {
  House = "house-tile-map";
}

class Textures {
  static Logo = "logo";
  static Buttons = new Buttons();
  static Sprites = new Sprites();
  static Tiles = new Tiles();
	static Maps = new Maps();
}

export default Textures;
