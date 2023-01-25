// Connections
import { Server, Socket } from "socket.io";

// User type
import { User } from "src/entities";
import { Member, Room } from "../RoomManager";

// Game objects
import Ball from "./Ball";
import Bat from "./Bat";

// Types
import * as Game from "./types/game";
import * as Match from "./types/match";

class GameInstance {
  private readonly ball: Ball;
  private readonly player1Bat: Bat;
  private readonly player2Bat: Bat;
  private readonly arena: Game.Dimentions;

  private readonly player1Profile: Member.Instance;
  private readonly player2Profile: Member.Instance;

  private score: Game.Score;
  private finished: boolean;
  private status: Match.Status;

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

    this.score = { player1: 0, player2: 0 };
    this.connection = connection;
    this.roomID = room.id;

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
   * - Need canvas width&height for calculations
   *   we could also asume a basic size and resize on client side
   */
  render(): void {
    if (this.pointScored() && !lastRound) {
      this.resetGame();
    } else {
      this.finishGame();
      return;
    }

    if (this.hitPowerUp()) {
      this.enablePowerup();
    }

    if (this.finished) {
      this.finishGame();
      return;
    }

    this.ball.updatePosition();
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
      pos: {
        posX: 0,
        posY: 0
      }
    };

    const player2 = {
      id: this.player2Profile.uid,
      pos: {
        posX: 0,
        posY: 0
      }
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
}

export default GameInstance;

//     const checkGame = (pongball: Ball) => {
//         this.checkIfBallHitsSide(pongball);
//         this.checkIfBallHitsBats(pongball);
//         this.checkIfBallHitsPowerUp();
//         this.checkIfGameIsFinished();
//     }

//     const checkIfBallHitsBats(pongball: Ball) {
//         // Check if left bat is hit
//         if (
//             pongball.positionX <=
//             this.player1Bat.positionX + this.player1Bat.width + pongball.radius
//         ) {
//             if (
//                 pongball.positionY >
//                     this.player1Bat.positionY - this.player1Bat.height / 2 &&
//                 pongball.positionY <
//                     this.player1Bat.positionY + this.player1Bat.height / 2
//             ) {
//                 var relativeIntersectY =
//                     this.player1Bat.positionY - pongball.positionY;
//                 var normalizedRelativeIntersectionY =
//                     relativeIntersectY / (this.player1Bat.height / 2);
//                 var bounceAngle =
//                     normalizedRelativeIntersectionY * ((5 * Math.PI) / 12);
//                 pongball.velocityX = -pongball.velocityX;
//                 pongball.velocityY = pongball.velocity * -Math.sin(bounceAngle);
//                 pongball.velocity = this.canvas.width / 270;
//                 this.powerUp.turn = 0;
//             }
//         }
//         // Check if right bat is hit
//         if (
//             pongball.positionX >=
//             this.player2Bat.positionX - pongball.radius - this.player1Bat.width
//         ) {
//             if (
//                 pongball.positionY >
//                     this.player2Bat.positionY - this.player2Bat.height / 2 &&
//                 pongball.positionY <
//                     this.player2Bat.positionY + this.player2Bat.height / 2
//             ) {
//                 var relativeIntersectY =
//                     this.player2Bat.positionY - pongball.positionY;
//                 var normalizedRelativeIntersectionY =
//                     relativeIntersectY / (this.player2Bat.height / 2);
//                 var bounceAngle =
//                     normalizedRelativeIntersectionY * ((5 * Math.PI) / 12);
//                 pongball.velocityX = -pongball.velocityX;
//                 pongball.velocityY = -pongball.velocity * Math.sin(bounceAngle);
//                 pongball.velocity = this.canvas.width / 270;
//                 this.powerUp.turn = 1;
//             }
//         }
//     }

//     checkIfBallHitsSide(pongball: Ball) {
//         // Checks if left side of the field is hit
//         if (pongball.positionX - pongball.radius < 0) {
//             this.player2Score++;
//             this.powerUp.power = false;
//             if (this.powerUp.hit === true) {
//                 this.powerUp.hit = false;
//                 this.powerUp.positionX = this.powerUp.getPositionX(4);
//                 this.powerUp.positionY = this.powerUp.getPositionY(3);
//             }
//             this.powerUp.powerTaken = false;
//             this.resetGame();
//         }
//         // Checks if right side of the field is hit
//         if (pongball.positionX + pongball.radius > this.canvas.width) {
//             this.player1Score++;
//             this.powerUp.power = false;
//             if (this.powerUp.hit === true) {
//                 this.powerUp.hit = false;
//                 this.powerUp.positionX = this.powerUp.getPositionX(4);
//                 this.powerUp.positionY = this.powerUp.getPositionY(3);
//             }
//             this.powerUp.powerTaken = false;
//             this.resetGame();
//         }
//     }

//     checkIfBallHitsPowerUp() {
//         if (
//             this.pongBall.positionX + this.pongBall.radius >=
//                 this.powerUp.positionX &&
//             this.pongBall.positionX + this.pongBall.radius <=
//                 this.powerUp.positionX + this.powerUp.width &&
//             this.pongBall.positionY + this.pongBall.radius >=
//                 this.powerUp.positionY &&
//             this.pongBall.positionY + this.pongBall.radius <=
//                 this.powerUp.positionY + this.powerUp.height
//         ) {
//             this.powerUp.hit = true;
//             this.powerUp.power = true;
//         }
//         if (
//             this.pongBall.positionX - this.pongBall.radius >=
//                 this.powerUp.positionX &&
//             this.pongBall.positionX - this.pongBall.radius <=
//                 this.powerUp.positionX + this.powerUp.width &&
//             this.pongBall.positionY + this.pongBall.radius >=
//                 this.powerUp.positionY &&
//             this.pongBall.positionY + this.pongBall.radius <=
//                 this.powerUp.positionY + this.powerUp.height
//         ) {
//             this.powerUp.hit = true;
//             this.powerUp.power = true;
//         }
//         if (
//             this.pongBall.positionX - this.pongBall.radius >=
//                 this.powerUp.positionX &&
//             this.pongBall.positionX - this.pongBall.radius <=
//                 this.powerUp.positionX + this.powerUp.width &&
//             this.pongBall.positionY - this.pongBall.radius >=
//                 this.powerUp.positionY &&
//             this.pongBall.positionY - this.pongBall.radius <=
//                 this.powerUp.positionY + this.powerUp.height
//         ) {
//             this.powerUp.hit = true;
//             this.powerUp.power = true;
//         }
//         if (
//             this.pongBall.positionX + this.pongBall.radius >=
//                 this.powerUp.positionX &&
//             this.pongBall.positionX + this.pongBall.radius <=
//                 this.powerUp.positionX + this.powerUp.width &&
//             this.pongBall.positionY - this.pongBall.radius >=
//                 this.powerUp.positionY &&
//             this.pongBall.positionY - this.pongBall.radius <=
//                 this.powerUp.positionY + this.powerUp.height
//         ) {
//             this.powerUp.hit = true;
//             this.powerUp.power = true;
//         }
//     }
