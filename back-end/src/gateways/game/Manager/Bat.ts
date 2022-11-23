import { Game } from "./types";

class Bat {
  position: Game.Position;
  size: {
    x: number;
    y: number;
  };

  constructor() {
    this.position = {
      posX: 0,
      posY: 0
    };
    this.size = {
      x: 10,
      y: 100
    };
  }

  setPosition(pos: Game.Position): void {
    this.position = pos;
  }

  getPosition(): Game.Position {
    return this.position;
  }
}

export default Bat;
