import Ball from "./Ball";
import Bat from "./Bat";
import { Dimentions, Position } from "./types/game";

class PowerUp {
  position: Position;
  turn: number;
  hit: boolean;
  power: boolean;
  powerTaken: boolean;
  extraBall: boolean;
  size: Dimentions;
  color: string[];
  arena: Dimentions;

  constructor(arena: Dimentions) {
    this.turn = 0;
    this.hit = false;
    this.position = { posX: this.getPositionX(6), posY: this.getPositionY(3) };
    this.power = false;
    this.powerTaken = false;
    this.extraBall = false;
    this.color = ["yellow", "Green", "Red"];
    this.arena = arena;
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

  tinyBallPower(ball: Ball) {
    ball.radius = this.arena.width / 200;
    ball.velocity.y *= 1.3;
    ball.velocity.x *= 1.3;
  }

  bigBatPower(player1: Bat, player2: Bat, ball: Ball) {
    if (this.turn === 0) player1.size.x = this.arena.width / 4;
    if (this.turn === 1) player2.size.x = this.arena.width / 5;
    ball.velocity.y *= 1.3;
    ball.velocity.x *= 1.3;
  }

  smallBatPower(player1: Bat, player2: Bat) {
    if (this.turn === 0) player2.size.x = this.arena.width / 10;
    if (this.turn === 1) {
      player1.size.x = this.arena.width / 10;
    }
  }

  fastBallPower(ball: Ball) {
    ball.velocity.y *= 1.5;
    ball.velocity.x *= 1.5;
  }

  duplicateBallPower(ballpower: Ball) {
    ballpower.velocity.x *= 0.4;
    ballpower.velocity.y *= 0.4;
    this.extraBall = true;
  }

  getRandomPower(player1: Bat, player2: Bat, ball: Ball, ballpower: Ball) {
    const randomNum: number = Math.floor(Math.random() * 5);
    if (this.power === true && !this.powerTaken) {
      this.powerTaken = true;
      if (randomNum === 0) this.bigBatPower(player1, player2, ball);
      else if (randomNum === 1) this.smallBatPower(player1, player2);
      else if (randomNum === 2) this.tinyBallPower(ball);
      else if (randomNum === 3) this.fastBallPower(ball);
      else this.duplicateBallPower(ballpower);
    }
    if (!this.powerTaken) {
      player1.size.x = this.arena.width / 7;
      player2.size.x = this.arena.width / 7;
      ball.radius = this.arena.width / 75;
      this.extraBall = false;
      ballpower.velocity.x = ball.velocity.x;
      ballpower.velocity.y = ball.velocity.y;
      ballpower.reset(this.arena);
    }
  }
}

export default PowerUp;
