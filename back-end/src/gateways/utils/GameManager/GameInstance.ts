// Connections
import { forwardRef, Inject } from "@nestjs/common";
import { emit } from "process";
import { Server } from "socket.io";
import { MatchHistoryService } from "src/services/matchhistory/matchhistory.service";

// User type
import RoomManager, { Member, Room } from "../RoomManager";

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
  private readonly powerUp: PowerUp | null;
  private readonly arena: Game.Dimentions;

  private readonly player1Profile: Member.Instance;
  private readonly player2Profile: Member.Instance;

  private score: Game.Score;
  private status: Match.Status;
  private readonly maxScore: number;

  private roomID: string;
  private connection: Server;

  roomManager: RoomManager;

  gameType: number;

  room: Room.Instance;

  constructor(
    connection: Server,
    room: Room.Instance,
    roomManager: RoomManager,
    gameType: number
  ) {
    this.roomManager = roomManager;
    this.status = Match.Status.Playing;
    this.room = room;
    this.arena = {
      width: 1600,
      height: 900
    };

    const center: Game.Position = {
      posX: this.scaleViewInput("50vw"),
      posY: this.scaleViewInput("50vh")
    };

    this.gameType = gameType;

    this.ball = new Ball(this.scaleViewInput("2.5vh"), center);
    if (!this.gameType) {
      this.powerUp = null;
    } else {
      this.powerUp = new PowerUp(this.arena, this.scaleViewInput("5vh"));
    }
    // this.extraBall = new Ball(this.scaleViewInput("2.5vh"), center);
    const bat1pos: Game.Position = {
      posX: this.scaleViewInput("10vw"),
      posY: this.scaleViewInput("50vh")
    };

    const bat2pos: Game.Position = {
      posX: this.arena.width - this.scaleViewInput("10vw"),
      posY: this.scaleViewInput("50vh")
    };

    const batSize = {
      posX: this.scaleViewInput("1vw"),
      posY: this.scaleViewInput("20vh")
    };

    this.player1Bat = new Bat(bat1pos, batSize.posX, batSize.posY);
    this.player2Bat = new Bat(bat2pos, batSize.posX, batSize.posY);

    this.score = { player1: 0, player2: 0 };
    this.connection = connection;
    this.roomID = room.id;
    this.maxScore = 5; // should get this from hame mode I think

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

    if (this.status === Match.Status.Finished) return;

    if (this.gameType) {
      if (this.powerUp.placed === false) {
        this.connection.to(this.roomID).emit("powerUp", {
          size: this.inputToScaled(this.powerUp.size.height, "vh"),
          posX: this.inputToScaled(this.powerUp.position.posX, "vw"),
          posY: this.inputToScaled(this.powerUp.position.posY, "vh")
        });
      }
    }
    this.ball.updatePosition(this.arena);

    const { posX, posY } = this.ball.getPosition();

    this.connection.to(this.roomID).emit("newBallPosition", {
      posX: this.inputToScaled(posX, "vw"),
      posY: this.inputToScaled(posY, "vh")
    });

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

  updateBatPosition(playerUid: string, posY: string): void {
    const newPosY = this.scaleViewInput(posY);

    if (
      playerUid !== this.player1Profile.uid &&
      playerUid !== this.player2Profile.uid
    )
      return;

    if (playerUid === this.player1Profile.uid) {
      this.player1Bat.updatePostition(newPosY, this.arena);
    } else if (playerUid === this.player2Profile.uid) {
      this.player2Bat.updatePostition(newPosY, this.arena);
    }

    this.connection.to(this.roomID).emit("newBatPosition", {
      playerUid,
      posY
    });
  }

  getScore(): Game.Score {
    return this.score;
  }

  finishGame(): void {
    this.status = Match.Status.Finished;
    this.connection.to(this.roomID).emit("gameStatus", this.status);

    const members = this.roomManager.getRoomMembers(this.roomID);
    this.roomManager.removeMemberFromRoom(members);
    this.roomManager.logAllRooms();
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
    const [player1, player2] = this.getPlayersPos();
    this.player1Bat.reset(this.arena);
    this.connection.to(this.roomID).emit("newBatPosition", {
      playerUid: player1.id,
      posY: this.inputToScaled(player1.pos.posY, "vh")
    });

    this.player2Bat.reset(this.arena);
    this.connection.to(this.roomID).emit("newBatPosition", {
      playerUid: player2.id,
      posY: this.inputToScaled(player2.pos.posY, "vh")
    });

    if (this.powerUp) this.powerUp.reset();
    this.ball.reset(this.arena);
  }

  private checkGame(ball: Ball): void {
    this.checkIfBallHitsSide(ball);
    this.checkIfBallHitsBats(ball);
    if (
      this.calcIntersect(this.ball.position, this.ball.radius, this.powerUp)
    ) {
      // powerup emit
      if (ball.velocity.x > 0) {
        this.connection.to(this.roomID).emit("powerUpActivated", {
          uid: this.player1Profile.uid,
          size: "50vh"
        });
        this.player1Bat.size.height = this.scaleViewInput("50vh");
        this.connection.to(this.roomID).emit("powerUpActivated", {
          uid: this.player2Profile.uid,
          size: "20vh"
        });
        this.player2Bat.size.height = this.scaleViewInput("20vh");
      } else {
        this.connection.to(this.roomID).emit("powerUpActivated", {
          uid: this.player1Profile.uid,
          size: "20vh"
        });
        this.player1Bat.size.height = this.scaleViewInput("20vh");
        this.connection.to(this.roomID).emit("powerUpActivated", {
          uid: this.player2Profile.uid,
          size: "50vh"
        });
        this.player2Bat.size.height = this.scaleViewInput("50vh");
      }

      this.powerUp.reset();
      this.connection.to(this.roomID).emit("powerUp", {
        size: this.inputToScaled(this.powerUp.size.height, "vh"),
        posX: this.inputToScaled(this.powerUp.position.posX, "vw"),
        posY: this.inputToScaled(this.powerUp.position.posY, "vh")
      });
    }
    this.checkIfGameIsFinished();
  }

  private calcBounce(ball: Ball, bat: Bat): void {
    const relativeIntersectY = bat.position.posY - ball.position.posY;
    const normalizedRelativeIntersectionY =
      relativeIntersectY / (bat.size.height / 2);
    const bounceAngle = normalizedRelativeIntersectionY * ((5 * Math.PI) / 12);
    if (ball.velocity.x <= 40 && ball.velocity.x >= -40) {
      if (ball.velocity.x > 0)
        ball.velocity.x = ball.velocity.x + ball.acceleration;
      else ball.velocity.x = ball.velocity.x - ball.acceleration;
    }

    ball.velocity.x = -ball.velocity.x;
    ball.velocity.y = Math.abs(ball.velocity.x) * -Math.sin(bounceAngle);
  }

  private checkIfBallHitsBats(ball: Ball): void {
    // Check p1 hit ball
    if (this.calcIntersect(ball.position, ball.radius, this.player1Bat)) {
      this.calcBounce(ball, this.player1Bat);
    }
    // check if p2 hit ball
    if (this.calcIntersect(ball.position, ball.radius, this.player2Bat)) {
      this.calcBounce(ball, this.player2Bat);
    }
  }

  private checkIfBallHitsSide(ball: Ball): void {
    // Checks if left side of the field is hit
    if (ball.position.posX - ball.radius <= 0) {
      this.score.player2++;
      this.resetGame();
      this.connection
        .to(this.roomID)
        .emit("scoreUpdate", [this.score.player1, this.score.player2]);
    }
    // Checks if right side of the field is hit
    if (ball.position.posX + ball.radius >= this.arena.width) {
      this.score.player1++;
      this.resetGame();
      this.connection
        .to(this.roomID)
        .emit("scoreUpdate", [this.score.player1, this.score.player2]);
    }
  }

  private calcIntersect(
    ballPos: Game.Position,
    ballRad: number,
    rect: PowerUp | Bat
  ): boolean {
    if (!rect) return;
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
    // If one of the player's score exeeds maxScore, the game is over
    if (
      this.score.player1 >= this.maxScore ||
      this.score.player2 >= this.maxScore
    ) {
      this.status = Match.Status.Finished;
      this.connection.to(this.roomID).emit("gameStatus", this.status);

      const members = this.roomManager.getRoomMembers(this.roomID);
      this.roomManager.removeMemberFromRoom(members);
      console.log("From game instance");
      this.roomManager.logAllRooms();
    }
  }
}

export default GameInstance;
