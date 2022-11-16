import { Position } from "./types";

class Bat {
  position: Position;
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

  setPosition(pos: Position): void {
    this.position = pos;
  }

  getPosition(): Position {
    return this.position;
  }
}

export default Bat;
