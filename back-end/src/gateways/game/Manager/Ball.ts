import { Position } from "./types";

class Ball {
  position: Position;
  velocity: {
    x: number;
    y: number;
  };

  constructor() {
    this.position = { posX: 0, posY: 0 };
    this.velocity = {
      x: 0,
      y: 0
    };
  }

  updatePosition(): void {
    return;
  }

  checkWalls(): void {
    return;
  }

  getPosition(): Position {
    return this.position;
  }

  setPosition(pos: Position): void {
    this.position = pos;
  }
}

export default Ball;
