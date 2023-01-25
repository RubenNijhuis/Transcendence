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
    /*//////////////////////////// ARENA WIDTH & HEIGHT ///////////////////////////*/
    this.arena = {
      width: 100,
      height: 50
    };

    this.ball = new Ball(this.arena.width / 75); // this will determine the ball radius
    this.player1Bat = new Bat();
    this.player2Bat = new Bat();
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
    // get random powerup
    // update positions
    if (
      this.score.player1 !== this.maxScore ||
      this.score.player2 !== this.maxScore
    ) {
      this.ball.updatePosition(this.arena);
    }
    // check game
    this.checkGame();
  }

  getId(): string {
    return this.roomID;
  }

  updateBatPosition(playerUid: string, newPosX: number): void {
    console.log(
      playerUid,
      newPosX,
      this.player1Profile.uid,
      this.player2Profile.uid
    );
    if (
      playerUid !== this.player1Profile.uid &&
      playerUid !== this.player2Profile.uid
    )
      return;

    if (playerUid === this.player1Profile.uid) {
      this.player1Bat.position.posX = newPosX;
    } else if (playerUid === this.player2Profile.uid) {
      this.player2Bat.position.posX = newPosX;
    }

    this.connection.to(this.roomID).emit("newBatPosition", {
      playerUid,
      newPosX
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

    this.ball.reset(this.arena);
  }

  private checkGame(): void {
    this.checkIfBallHitsSide();
    this.checkIfBallHitsBats();
    this.checkIfBallHitsPowerUp();
    this.checkIfGameIsFinished();
  }

  private checkIfBallHitsBats(): void {
    // Check if left bat is hit
    if (
      this.ball.position.posX <=
      this.player1Bat.position.posX + this.player1Bat.size.x + this.ball.radius
    ) {
      if (
        this.ball.position.posY >
          this.player1Bat.position.posY - this.player1Bat.size.y / 2 &&
        this.ball.position.posY <
          this.player1Bat.position.posY + this.player1Bat.size.y / 2
      ) {
        const relativeIntersectY =
          this.player1Bat.position.posY - this.ball.position.posY;
        const normalizedRelativeIntersectionY =
          relativeIntersectY / (this.player1Bat.size.y / 2);
        const bounceAngle =
          normalizedRelativeIntersectionY * ((5 * Math.PI) / 12);
        this.ball.velocity.x = -this.ball.velocity.x;
        this.ball.velocity.y = this.ball.acceleration * -Math.sin(bounceAngle);
        this.ball.acceleration = this.arena.width / 270;
        this.powerUp.turn = 0;
      }
    }
    // Check if right bat is hit
    if (
      this.ball.position.posX >=
      this.player2Bat.position.posX - this.ball.radius - this.player1Bat.size.x
    ) {
      if (
        this.ball.position.posY >
          this.player2Bat.position.posY - this.player1Bat.size.y / 2 &&
        this.ball.position.posY <
          this.player2Bat.position.posY + this.player1Bat.size.y / 2
      ) {
        const relativeIntersectY =
          this.player2Bat.position.posY - this.ball.position.posY;
        const normalizedRelativeIntersectionY =
          relativeIntersectY / (this.player1Bat.size.y / 2);
        const bounceAngle =
          normalizedRelativeIntersectionY * ((5 * Math.PI) / 12);
        this.ball.velocity.x = -this.ball.velocity.x;
        this.ball.velocity.y = -this.ball.acceleration * Math.sin(bounceAngle);
        this.ball.acceleration = this.arena.width / 270;
        this.powerUp.turn = 1;
      }
    }
  }

  private checkIfBallHitsSide(): void {
    // Checks if left side of the field is hit
    if (this.ball.position.posX - this.ball.radius < 0) {
      this.score.player2++;
      this.powerUp.power = false;
      if (this.powerUp.hit === true) {
        this.powerUp.hit = false;
        this.powerUp.position.posX = this.powerUp.getPositionX(4);
        this.powerUp.position.posY = this.powerUp.getPositionY(3);
      }
      this.powerUp.powerTaken = false;
      this.resetGame();
    }
    // Checks if right side of the field is hit
    if (this.ball.position.posX + this.ball.radius > this.arena.width) {
      this.score.player1++;
      this.powerUp.power = false;
      if (this.powerUp.hit === true) {
        this.powerUp.hit = false;
        this.powerUp.position.posX = this.powerUp.getPositionX(4);
        this.powerUp.position.posY = this.powerUp.getPositionY(3);
      }
      this.powerUp.powerTaken = false;
      this.resetGame();
    }
  }

  checkIfBallHitsPowerUp() {
    if (
      this.ball.position.posX + this.ball.radius >=
        this.powerUp.position.posX &&
      this.ball.position.posX + this.ball.radius <=
        this.powerUp.position.posX + this.powerUp.size.width &&
      this.ball.position.posY + this.ball.radius >=
        this.powerUp.position.posY &&
      this.ball.position.posY + this.ball.radius <=
        this.powerUp.position.posY + this.powerUp.size.height
    ) {
      this.powerUp.hit = true;
      this.powerUp.power = true;
    }
    if (
      this.ball.position.posX - this.ball.radius >=
        this.powerUp.position.posX &&
      this.ball.position.posX - this.ball.radius <=
        this.powerUp.position.posX + this.powerUp.size.width &&
      this.ball.position.posY + this.ball.radius >=
        this.powerUp.position.posY &&
      this.ball.position.posY + this.ball.radius <=
        this.powerUp.position.posY + this.powerUp.size.height
    ) {
      this.powerUp.hit = true;
      this.powerUp.power = true;
    }
    if (
      this.ball.position.posX - this.ball.radius >=
        this.powerUp.position.posX &&
      this.ball.position.posX - this.ball.radius <=
        this.powerUp.position.posX + this.powerUp.size.width &&
      this.ball.position.posY - this.ball.radius >=
        this.powerUp.position.posY &&
      this.ball.position.posY - this.ball.radius <=
        this.powerUp.position.posY + this.powerUp.size.height
    ) {
      this.powerUp.hit = true;
      this.powerUp.power = true;
    }
    if (
      this.ball.position.posX + this.ball.radius >=
        this.powerUp.position.posX &&
      this.ball.position.posX + this.ball.radius <=
        this.powerUp.position.posX + this.powerUp.size.width &&
      this.ball.position.posY - this.ball.radius >=
        this.powerUp.position.posY &&
      this.ball.position.posY - this.ball.radius <=
        this.powerUp.position.posY + this.powerUp.size.height
    ) {
      this.powerUp.hit = true;
      this.powerUp.power = true;
    }
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
