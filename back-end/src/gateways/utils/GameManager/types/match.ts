import { Socket } from "socket.io-client";
import * as Game from "./game";

export type ID = string;

export enum Status {
  Queue,
  NoMatch,
  Matched,
  Setup,
  Playing,
  Finished
}

export enum GameType {
  Classic,
  Powered
}

export enum ScoreType {
  Friendly,
  Ranked
}

export interface ELO {
  player1: number;
  player2: number;
}

export interface PlayerProfile {
  uid: string;
  connection: Socket;
  username: string;
  elo: number;
}

export interface Request {
  profile: PlayerProfile;
  gameType: GameType;
  scoreType: ScoreType;
}

export interface Record {
  uid: ID;

  player1: PlayerProfile;
  player2: PlayerProfile;

  scoreType: ScoreType;
  gameType: GameType;

  elo: ELO;
  score: Game.Score;
}
