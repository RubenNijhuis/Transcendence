import * as Game from "./types/game";

class Bat {
  position: Game.Position;
  size: Game.Dimentions;

  constructor() {
    this.position = {
      posX: 0,
      posY: 0
    };
    this.size = {
      width: 10,
      height: 100
    };
  }

  setPosition(pos: Game.Position): void {
    this.position = pos;
  }

  getPosition(): number {
    return this.position.posX;
  }

  reset(arena: Game.Dimentions): void {
    this.position = {
      posX: 0,
      posY: arena.height / 2
    };
  }

  updatePostition(newX: number, arena: Game.Dimentions) {
    if (this.checkCollisions(newX, arena.width)) return;
    this.position.posX += newX;
  }

  checkCollisions(x: number, width: number) {
    if (x - this.size.width / 2 <= 0 || x + this.size.width / 2 >= width)
      return true;
    else return false;
  }
}

export default Bat;
