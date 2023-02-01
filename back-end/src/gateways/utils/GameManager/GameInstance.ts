// Connections
import { Server } from "socket.io";

// User type
import { Member, Room } from "../RoomManager";

// Game objects
import Ball from "./Ball";
import Bat from "./Bat";
import PowerUp from "./PowerUp";

// Types
import * as Game from "./types/game";
import * as Match from "./types/match";

class GameInstance {
  private readonly ball: Ball;
  private readonly extraBall: Ball;
  private readonly player1Bat: Bat;
  private readonly player2Bat: Bat;
  private readonly powerUp: PowerUp;
  private readonly arena: Game.Dimentions;

  private readonly player1Profile: Member.Instance;
  private readonly player2Profile: Member.Instance;

  private score: Game.Score;
  private status: Match.Status;
  private readonly maxScore: number;

  private roomID: string;
  private connection: Server;

  constructor(connection: Server, room: Room.Instance) {
    this.arena = {
      width: 1600,
      height: 900
    };

    this.ball = new Ball(this.scaleViewInput("5vh"));
    this.extraBall = new Ball(this.arena.width * (100 / 30));
    const bat1pos = {
      posX: this.scaleViewInput("10vw"),
      posY: this.scaleViewInput("50vh")
    };

    const bat2pos = {
      posX: this.arena.width - this.scaleViewInput("10vw"),
      posY: this.scaleViewInput("50vh")
    };

    const batSize = {
      posX: this.scaleViewInput("1vw"),
      posY: this.scaleViewInput("20vh")
    };

    this.player1Bat = new Bat(bat1pos, batSize.posX, batSize.posY);
    this.player2Bat = new Bat(bat2pos, batSize.posX, batSize.posY);
    this.powerUp = new PowerUp(this.arena);

    this.score = { player1: 0, player2: 0 };
    this.connection = connection;
    this.roomID = room.id;
    this.maxScore = 10; // should get this from hame mode I think

    const members = [...room.members.values()];
    this.player1Profile = members[0];
    this.player2Profile = members[1];
  }

  /**
   * has a point been scored
   * - update game status to new round and reset game objects
   *
   * has a powerup been hit
   * - update game status to powerup for the player
   *
   * has a game finished
   * - set game state to finished and update game state for players
   *
   * optional
   * has a member disconnected
   * - finish game and set win score to player who didnt disconnect
   *
   * NEED
   * - Need arena width&height for calculations
   *   we could also asume a basic size and resize on client side
   */
  render(): void {
    // get random powerup... where does it assign the powerup?
    // update positions
    // if (
    //   this.score.player1 === this.maxScore ||
    //   this.score.player2 === this.maxScore
    // ) {
    //   return;
    // }
    this.ball.updatePosition(this.arena);

    const { posX, posY } = this.ball.getPosition();

    this.connection.to(this.roomID).emit("newBallPosition", {
      posX: this.inputToScaled(posX, "vw"),
      posY: this.inputToScaled(posY, "vh")
    });

    if (this.powerUp.extraBall) {
      this.checkGame(this.extraBall);
    }
    // check game
    this.checkGame(this.ball);
  }

  getId(): string {
    return this.roomID;
  }

  // Service
  scaleViewInput(position: string): number {
    const num = parseFloat(position.slice(0, -2));

    if (position.includes("vw")) return this.arena.width * (num / 100);
    else if (position.includes("vh")) return this.arena.height * (num / 100);

    return 0;
  }

  // Service
  inputToScaled(position: number, type: string): string {
    let scaledValue = 0;

    if (type === "vw") {
      scaledValue = (position / this.arena.width) * 100;
    } else {
      scaledValue = (position / this.arena.height) * 100;
    }

    return `${scaledValue}${type}`;
  }

  updateBatPosition(playerUid: string, posX: string): void {
    const newPosX = this.scaleViewInput(posX);

    if (
      playerUid !== this.player1Profile.uid &&
      playerUid !== this.player2Profile.uid
    )
      return;

    if (playerUid === this.player1Profile.uid) {
      this.player1Bat.updatePostition(newPosX, this.arena);
    } else if (playerUid === this.player2Profile.uid) {
      this.player2Bat.updatePostition(newPosX, this.arena);
    }

    this.connection.to(this.roomID).emit("newBatPosition", {
      playerUid,
      posX
    });
  }

  // retrieve ball pos
  private getBallPos(): Game.Position {
    return this.ball.getPosition();
  }

  private getPlayersPos(): [
    { id: string; pos: Game.Position },
    { id: string; pos: Game.Position }
  ] {
    const player1 = {
      id: this.player1Profile.uid,
      pos: this.player1Bat.position
    };

    const player2 = {
      id: this.player2Profile.uid,
      pos: this.player2Bat.position
    };

    return [player1, player2];
  }

  getGameStatus(): Match.Status {
    return this.status;
  }

  /*///////////////////////////////// GAMELOGIC ////////////////////////////////*/

  private resetGame(): void {
    this.player1Bat.reset(this.arena);
    this.player2Bat.reset(this.arena);
    this.powerUp.reset();
    this.ball.reset(this.arena);
  }

  private checkGame(ball: Ball): void {
    this.checkIfBallHitsSide(ball);
    this.checkIfBallHitsBats(ball);
    if (
      this.calcIntersect(this.ball.position, this.ball.radius, this.powerUp)
    ) {
      this.powerUp.hit = true;
      this.powerUp.power = true;
    }
    this.checkIfGameIsFinished();
  }

  private calcBounce(ball: Ball, bat: Bat): void {
    const relativeIntersectY = bat.position.posY - ball.position.posY;
    const normalizedRelativeIntersectionY =
      relativeIntersectY / (bat.size.width / 2);
    const bounceAngle = normalizedRelativeIntersectionY * ((5 * Math.PI) / 12);
    ball.velocity.x = -ball.velocity.x;
    ball.velocity.y = -ball.acceleration * Math.sin(bounceAngle);
    ball.acceleration = this.arena.width / 270;
  }

  private checkIfBallHitsBats(ball: Ball): void {
    // Check p1 hit ball
    if (this.calcIntersect(ball.position, ball.radius, this.player1Bat)) {
      this.calcBounce(ball, this.player1Bat);
      this.powerUp.turn = 0;
    }
    // check if p2 hit ball
    if (this.calcIntersect(ball.position, ball.radius, this.player2Bat)) {
      this.calcBounce(ball, this.player2Bat);
      this.powerUp.turn = 1;
    }
  }

  private checkIfBallHitsSide(ball: Ball): void {
    // Checks if left side of the field is hit
    if (ball.position.posX - ball.radius < 0) {
      console.log("pee pee", ball.position, ball.radius);
      this.score.player2++;
      this.resetGame();
    }
    // Checks if right side of the field is hit
    if (ball.position.posX + ball.radius > this.arena.width) {
      console.log("poo poo");
      this.score.player1++;
      this.resetGame();
    }
  }

  private calcIntersect(
    ballPos: Game.Position,
    ballRad: number,
    rect: PowerUp | Bat
  ): boolean {
    const circDistX = Math.abs(ballPos.posX - rect.position.posX);
    const circDistY = Math.abs(ballPos.posY - rect.position.posY);

    if (
      circDistX > rect.size.width / 2 + ballRad ||
      circDistY > rect.size.height / 2 + ballRad
    ) {
      return false;
    }

    if (circDistX <= rect.size.width / 2 || circDistY <= rect.size.height / 2) {
      return true;
    }

    const cornerDistance_sq =
      (circDistX - rect.size.width / 2) ^
      (2 + (circDistY - rect.size.height / 2)) ^
      2;

    return cornerDistance_sq <= (ballRad ^ 2);
  }

  private checkIfGameIsFinished(): void {
    //If one of the player's score exeeds maxScore, the game is over
    if (
      this.score.player1 >= this.maxScore ||
      this.score.player2 >= this.maxScore
    ) {
      this.status = Match.Status.Finished;
    }
  }
}

export default GameInstance;
