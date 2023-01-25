import * as Game from "./types/game";

class Ball {
  position: Game.Position;
  velocity: {
    x: number;
    y: number;
  };
  acceleration: number;
  radius: number;

  constructor(radius: number) {
    this.position = { posX: 0, posY: 0 };
    this.acceleration = 1; // for now starting velocity will be 1
    this.velocity = {
      x: this.decideDirection(this.acceleration),
      y: 0
    };
    this.radius = radius;
  }

  private decideDirection(velocity: number): number {
    if (Math.floor(Math.random() * 2) == 0) return velocity * -1;
    else return velocity;
  }

  getPosition(): Game.Position {
    return this.position;
  }

  setPosition(pos: Game.Position): void {
    this.position = pos;
  }

  reset(arena: Game.Dimentions): void {
    this.position = {
      posX: arena.width / 2,
      posY: arena.height / 2
    };
    this.velocity = {
      x: this.decideDirection(this.velocity.x),
      y: 0
    };
  }

  updatePosition(arena: Game.Dimentions) {
    this.position.posX += this.velocity.x;
    this.position.posY += this.velocity.y;

    // if the ball hits the sides (X axis) swap velocities
    if (
      this.position.posX + this.radius >= arena.width ||
      this.position.posX - this.radius <= 0
    ) {
      this.velocity.x = -this.velocity.x;
    }

    // If the ball hits the sides (Y axis) swap velocities
    if (
      this.position.posY + this.radius >= arena.height ||
      this.position.posY - this.radius <= 0
    ) {
      this.velocity.y = -this.velocity.y;
    }
  }
}

export default Ball;
