import { Socket } from "socket.io";

import Game from "./GameInstance";

////////////////////////////////////////////////////////////

declare namespace Match {
  export type ID = string;

  export enum Status {
    Queue = "Queue",
    Setup = "Setup",
    Matched = "Matches",
    Starting = "Starting",
    Playing = "Playing",
    Finished = "Finished"
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
}

////////////////////////////////////////////////////////////

declare namespace Game {
  export type Position = {
    posX: number;
    posY: number;
  };

  export interface Score {
    player1: number;
    player2: number;
  }
}

////////////////////////////////////////////////////////////

declare namespace Room {
  export interface Instance {
    roomID: string;
    profiles: Match.PlayerProfile[];
  }
}

export { Match, Game, Room };
