import { Socket } from "socket.io";
import Game from "./Game";

class Manager {
  isRunning: boolean;
  games: Game[];
  connection: Socket;

  constructor(connection: Socket) {
    this.games = [];
    this.isRunning = true;
    this.connection = connection;
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
    // while (games.length > 0) {
    //   for (let i = 0; i < runningGames.length; i++) {
    //     updateGameStats(runningGames[i]);
    //   }
    //   console.log(runningGames);
    //   await timer(1000);
    // }
  }

    runGames(games: Game[]): void {
      
    }
    
    newGame()
}

// const amountGames = 100;
// const deltaTime = 16;
// const runTime = 60;

// let runningGames = [];

// ////////////////////////////////////////////////////////////

// for (let i = 0; i < 10; i++) {
//   runningGames.push({ id: i + 1, amountHits: 0, finished: false });
// }

// ////////////////////////////////////////////////////////////

// const timer = (ms) => new Promise((res) => setTimeout(res, ms));

// const removeGameFromRunning = (id) => {
//   runningGames = runningGames.filter((game) => game.id !== id);
//   // update data in database
//   // emit (finished game)
// };

// const updateGameStats = async (game) => {
//   await timer(60);
//   game.amountHits++;

//   if (game.amountHits === runTime * game.id) {
//     game.finished = true;
//     removeGameFromRunning(game.id);
//   }
// };

// ////////////////////////////////////////////////////////////

// (async () => {
//   console.time("Game running 1 sec");

//   while (runningGames.length !== 0) {
//     for (let i = 0; i < runningGames.length; i++) {
//       updateGameStats(runningGames[i]);
//     }
//     await timer(16);
//   }

//   console.timeLog("Game running 1 sec");
// })();

export default Manager;

// // Elements
// import { Ball, Bat } from "../GameElements";
// import PowerUps from "../PowerUps";

//     const displayText = () => {
//         if (
//             this.player1Score !== this.maxScore &&
//             this.player2Score !== this.maxScore
//         ) {
//             this.context.font = "30px Arial";
//             this.context.textAlign = "center";
//             this.context.fillText(
//                 `${this.player1Score} - ${this.player2Score}`,
//                 this.canvas.clientWidth / 2,
//                 100
//             );
//         }
//     }

//     const resetGame = () => {
//         this.player1Bat.reset();
//         this.player2Bat.reset();

//         this.pongBall.reset();
//     }

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
//             if (this.powerUp.hit == true) {
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
//             if (this.powerUp.hit == true) {
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

//     checkIfGameIsFinished() {
//         //If one of the player's score exeeds maxScore, the game is over
//         if (
//             this.player1Score >= this.maxScore ||
//             this.player2Score >= this.maxScore
//         ) {
//             this.context.font = "60px Arial";
//             this.context.textAlign = "center";
//             this.context.fillText(
//                 `${
//                     this.player1Score > this.player2Score
//                         ? "Player 1 won!"
//                         : "Player 2 won!"
//                 }`,
//                 this.canvas.clientWidth / 2,
//                 this.canvas.height / 3
//             );
//         }
//     }
