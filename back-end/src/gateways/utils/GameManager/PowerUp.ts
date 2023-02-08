import Ball from "./Ball";
import Bat from "./Bat";
import { Dimentions, Position } from "./types/game";

class PowerUp {
  position: Position;
  size: Dimentions;
  arena: Dimentions;
  placed: boolean;

  constructor(arena: Dimentions, size: number) {
    if (!arena) {
      throw new Error("No arena specified during creation");
    }

    this.arena = arena;
    this.position = { posX: this.getPositionX(6), posY: this.getPositionY(3) };
    this.arena = arena;
    this.size = {
      width: size,
      height: size
    };
    this.placed = false;
  }

  getPositionX(max: number) {
    const randomNum = Math.floor(Math.random() * max);
    const x = [
      this.arena.width * 0.6,
      this.arena.width * 0.3,
      this.arena.width * 0.7,
      this.arena.width * 0.2,
      this.arena.width * 0.65,
      this.arena.width * 0.15
    ];
    return x[randomNum];
  }

  getPositionY(max: number) {
    const randomNum = Math.floor(Math.random() * max);
    const y = [
      this.arena.height * 0.7,
      this.arena.height * 0.3,
      this.arena.height * 0.2
    ];
    return y[randomNum];
  }

  reset(): void {
    this.position.posX = this.getPositionX(4);
    this.position.posY = this.getPositionY(3);
  }
}

export default PowerUp;
