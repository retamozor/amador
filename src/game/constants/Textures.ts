export class ButtonTexture {
  default: string;
  pressed: string;
  constructor(name: string) {
    this.default = `button_${name}`;
    this.pressed = `button_${name}_pressed`;
  }
}

class Buttons {
  NewGame = new ButtonTexture("new_game");
  Pause = new ButtonTexture("pause");
  Volume = new ButtonTexture("volume");
  NoVolume = new ButtonTexture("no_volume");
  Next = new ButtonTexture("next");
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
  static MainMenu = "main_menu";
  static BusScene = "bus_scene";
  static AmadorSpeaking = "amador-speaking";
  static Bubble = "bubble";
  static Letter0 = "letter_0";
  static Letter1 = "letter_1";
  static Letter2 = "letter_2";
  static Letter3 = "letter_3";
  static Buttons = new Buttons();
  static Sprites = new Sprites();
  static Tiles = new Tiles();
	static Maps = new Maps();
}

export default Textures;
