import { Socket } from "socket.io";
import { User } from "src/entities";
import Ball from "./Ball";
import Bat from "./Bat";
import { Game, Match } from "./types";

class GameInstance {
  ball: Ball;
  player1Bat: Bat;
  player2Bat: Bat;

  player1Profile: User;
  player2Profile: User;

  finished: boolean;
  status: Match.Status;

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
    if (this.status === Match.Status.Starting) {
      this.status = Match.Status.Playing;
    }

    // updateBallPos();
  }

  setupGame(): void {
    this.status = Match.Status.Setup;
  }

  // retrieve ball pos
  getBallPos(): Game.Position {
    return this.ball.getPosition();
  }

  getPlayersPos(): [
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
}

export default GameInstance;
