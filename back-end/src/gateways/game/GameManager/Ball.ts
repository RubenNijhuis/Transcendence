import { Game } from "./types";

class Ball {
  position: Game.Position;
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

  getPosition(): Game.Position {
    return this.position;
  }

  setPosition(pos: Game.Position): void {
    this.position = pos;
  }
}

export default Ball;
