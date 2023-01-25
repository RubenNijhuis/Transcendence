import * as Game from "./types/game";

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

  reset(arena: Game.Dimentions): void {
    this.position = {
      posX: 0,
      posY: arena.height / 2
    };
  }

  updatePostition(direction: number, arena: Game.Dimentions) {
    if (this.checkCollisions(direction, arena.height)) return;
    this.position.posY += direction;
  }

  checkCollisions(direction: number, height: number) {
    if (
      this.position.posY + direction - this.size.y / 2 <= 0 ||
      this.position.posY + direction + this.size.y / 2 >= height
    )
      return true;
    else return false;
  }
}

export default Bat;
