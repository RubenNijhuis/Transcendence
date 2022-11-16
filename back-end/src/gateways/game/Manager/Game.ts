import { Socket } from "socket.io";
import { User } from "src/entities";
import Ball from "./Ball";
import Bat from "./Bat";
import { GameStatus, Position } from "./types";

class Game {
  ball: Ball;
  player1Bat: Bat;
  player2Bat: Bat;

  player1Profile: User;
  player2Profile: User;

  finished: boolean;
  status: GameStatus;

  roomID: string;
  connection: Socket;

  constructor(connection: Socket, roomID: string) {
    this.ball = new Ball();
    this.player1Bat = new Bat();
    this.player2Bat = new Bat();

    this.connection = connection;
    this.roomID = roomID;

    this.setupGame();
  }

  // update game data
  render(): void {
    if (this.status === GameStatus.Setup) {
      this.status = GameStatus.Running;
    }

    // updateBallPos();
  }

  setupGame(): void {
    this.status = GameStatus.Setup;
  }

  // retrieve ball pos
  getBallPos(): Position {
    return this.ball.getPosition();
  }

  getPlayersPos(): [
    { id: string; pos: Position },
    { id: string; pos: Position }
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

  getGameStatus(): GameStatus {
    return this.status;
  }
}

export default Game;
