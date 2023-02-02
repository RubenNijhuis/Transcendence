// Connections
import { Server } from "socket.io";
import RoomManager, { Room } from "../RoomManager";

// Game instance
import GameInstance from "./GameInstance";

// Types
import * as Game from "./types/game";
import * as Match from "./types/match";

/**
 * Removing and adding new game instances
 * Running game instances
 * Saving of game record
 *
 * Game Instance
 * Sending and receiving of data
 * Updating game state (score, powerups)
 */

class GameManager {
  private readonly roomManager: RoomManager;
  private readonly deltaTime: number;
  private readonly server: Server;

  private isRunning: boolean;
  private games: GameInstance[];

  constructor(server: Server, roomManager: RoomManager) {
    if (!roomManager) {
      throw Error("No room manager supplied in game manager construcor");
    }

    this.server = server;
    this.roomManager = roomManager;
    this.games = [];
    this.isRunning = false;
    this.deltaTime = 16; // ms
  }

  run() {
    /**
     * Check if games should be ran. In case of new games starting.
     * Will keep those games running until there are none left.
     * Basically observing the games array
     */
    setInterval(() => {
      if (this.isRunning === true) return;
      if (this.games.length > 0) {
        this.runGames(this.games);
      }
    }, 1000);

    // Start managing games
  }

  updateBatPosition(playerUid: string, roomID: Room.ID, newPosX: string): void {
    this.games.find((game) => {
      if (game.getId() === roomID) {
        game.updateBatPosition(playerUid, newPosX);
      }
    });
  }

  async runGames(games: GameInstance[]): Promise<void> {
    // Adds the delay
    const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
    // Keep looping as long as there are games
    while (games.length > 0) {
      // Go through each game
      for (let i = 0; i < games.length; i++) {
        games[i].render();

        // Check every loop which games are finished
        // this.removeGamesFromRunning(games);
      }
      // Add delay
      await delay(this.deltaTime);
    }
  }

  createGame(roomID: Room.ID): void {
    const room = this.roomManager.getRoomByID(roomID);
    this.server.to(roomID).emit("gameStatus", Match.Status.Setup);

    const newGame = new GameInstance(this.server, room);
    this.games.push(newGame);
  }

  removeGamesFromRunning(games: GameInstance[]): void {
    this.games = games.filter((game) => {
      return game.getGameStatus() !== Match.Status.Finished;
    });
  }
}

export default GameManager;
