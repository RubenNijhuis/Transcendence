import { Socket } from "socket.io";
import { User } from "src/entities";

enum GameStatus {
  Initial,
  Setup,
  Running,
  Finished
}

type Position = {
  posX: number;
  posY: number;
};

class Game {
  ball: Ball;
  player1Bat: Player;
  player2Bat: Player;

  player1Profile: User;
  player2Profile: User;

  finished: boolean;
  status: GameStatus;

  roomID: string;
  connection: Socket;

  constructor(
    connection: Socket,
    roomID: string,
    player1ID: string,
    player2ID: string
  ) {
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

    updateBallPos();
  }

  setupGame(): void {
    this.status = GameStatus.Setup;
  }

  // retrieve ball pos
  getBallPos(): { posX: number; posY: number } {
    return this.ball.getPosition();
  }

  getPlayersPos(): [
    { id: string; pos: Position },
    { id: string; pos: Position }
  ] {
    const player1 = {
      id: this.player1Profile.uid,
      pos: this.player1Bat.getPosition()
    };

    const player2 = {
      id: this.player2Profile.uid,
      pos: this.player2Bat.getPosition()
    };

    return [player1, player2];
  }

  getGameStatus(): GameStatus {
    return this.status;
  }
}

export default Game;
