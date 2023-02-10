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
        this.runGames();
      }
    }, 1000);

    // Start managing games
  }

  updateBatPosition(playerUid: string, roomID: Room.ID, newPosY: string): void {
    this.games.find((game) => {
      if (game.getId() === roomID) {
        game.updateBatPosition(playerUid, newPosY);
      }
    });
  }

  async runGames(): Promise<void> {
    this.isRunning = true;
    // Adds the delay
    const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
    // Keep looping as long as there are this.games
    while (this.games.length > 0) {
      // Go through each game
      for (let i = 0; i < this.games.length; i++) {
        this.games[i].render();

        // Check every loop which this.games are finished
        this.removeGamesFromRunning(this.games);
      }
      // Add delay
      await delay(this.deltaTime);
    }
  }

  createGame(roomID: Room.ID, gameType: number): void {
    const room = this.roomManager.getRoomByID(roomID);
    this.server.to(roomID).emit("gameStatus", Match.Status.Setup);
    const newGame = new GameInstance(this.server, room, this.roomManager, gameType);
    this.games.push(newGame);
  }

  removeGamesFromRunning(games: GameInstance[]): void {
    this.games = games.filter((game) => {
      return game.getGameStatus() !== Match.Status.Finished;
    });


    if (this.games.length === 0) {
      this.isRunning = false;
    }
  }
}

export default GameManager;
