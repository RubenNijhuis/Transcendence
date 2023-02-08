import * as Game from "./types/game";

class Bat {
  position: Game.Position;
  size: Game.Dimentions;

  constructor(position: Game.Position, sizeX: number, sizeY: number) {
    this.position = position;
    this.size = {
      width: sizeX,
      height: sizeY
    };
  }

  setPosition(pos: Game.Position): void {
    this.position = pos;
  }

  getPosition(): number {
    return this.position.posX;
  }

  reset(arena: Game.Dimentions): void {
    this.position.posY = arena.height / 2;
  }

  updatePostition(newY: number, arena: Game.Dimentions) {
    if (this.checkCollisions(newY, arena.width)) return;
    this.position.posY = newY;
  }

  checkCollisions(x: number, width: number) {
    if (x - this.size.width / 2 <= 0 || x + this.size.width / 2 >= width)
      return true;
    else return false;
  }
}

export default Bat;
