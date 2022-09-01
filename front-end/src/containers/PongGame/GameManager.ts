import { stringify } from "querystring";
import Logger from "../../utils/Logger";
import Ball from "./Ball";
import Bat from "./Bat";
import PowerUps from "./PowerUps";

class GameManager {
    player1Score: number;
    player2Score: number;
    maxScore: number;

    pongBall: Ball;
    player1Bat: Bat;
    player2Bat: Bat;
    powerUp: PowerUps;

    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;

    constructor(
        pongBall: Ball,
        player1Bat: Bat,
        player2Bat: Bat,
        powerUp: PowerUps,
        canvas: HTMLCanvasElement,
        context: CanvasRenderingContext2D
    ) {
        this.player1Score = 0;
        this.player2Score = 0;
        this.maxScore = 10;

        this.pongBall = pongBall;
        this.player1Bat = player1Bat;
        this.player2Bat = player2Bat;
        this.powerUp = powerUp;

        this.canvas = canvas;
        this.context = context;
    }

    displayText() {
        if (
            this.player1Score != this.maxScore &&
            this.player2Score != this.maxScore
        ) {
            this.context.font = "30px Arial";
            this.context.textAlign = "center";
            this.context.fillText(
                `${this.player1Score} - ${this.player2Score}`,
                this.canvas.clientWidth / 2,
                100
            );
        }
    }

    resetGame() {
        this.player1Bat.reset();
        this.player2Bat.reset();

        this.pongBall.reset();
    }

    checkIfBallHitsBats() {
        if (
            this.pongBall.positionX - this.pongBall.radius <=
                this.player1Bat.positionX + this.player1Bat.width / 2 &&
            this.pongBall.positionX >
                this.player1Bat.positionX +
                    this.player1Bat.width -
                    this.player1Bat.width / 4 &&
            this.pongBall.positionY >
                this.player1Bat.positionY - this.player1Bat.height / 2 &&
            this.pongBall.positionY <
                this.player1Bat.positionY + this.player1Bat.height / 2
        ) {
            // Logger("GAME", "LEFTHIT", {});
            this.pongBall.velocityX = -this.pongBall.velocityX;
            //this.pongBall.positionX - this.pongBall.radius < this.player1Bat.positionX + this.player1Bat.width / 2
        }
        if (
            this.pongBall.positionX + this.pongBall.radius >=
                this.player2Bat.positionX - this.player2Bat.width / 2 &&
            this.pongBall.positionX <
                this.player2Bat.positionX -
                    this.player1Bat.width +
                    this.player1Bat.width / 4 &&
            this.pongBall.positionY >
                this.player2Bat.positionY - this.player2Bat.height / 2 &&
            this.pongBall.positionY <
                this.player2Bat.positionY + this.player2Bat.height / 2
        ) {
            this.pongBall.velocityX = -this.pongBall.velocityX;
        }
    }

    checkIfBallHitsSide() {
        if (this.pongBall.positionX - this.pongBall.radius < 0) {
            this.player2Score++;
            this.resetGame();
        }

        if (
            this.pongBall.positionX + this.pongBall.radius >
            this.canvas.width
        ) {
            this.player1Score++;
            this.resetGame();
        }
    }

    checkIfGameIsFinished() {
        if (
            this.player1Score >= this.maxScore ||
            this.player2Score >= this.maxScore
        ) {
            this.context.font = "60px Arial";
            this.context.textAlign = "center";
            this.context.fillText(
                `${
                    this.player1Score > this.player2Score
                        ? "Player 1 won!"
                        : "Player 2 won!"
                }`,
                this.canvas.clientWidth / 2,
                this.canvas.height / 3
            );
        }
    }

    checkIfBallHitsPowerUp() {
        if (
            this.pongBall.positionX >=
                this.powerUp.positionX - this.powerUp.width / 2 &&
            this.pongBall.positionX <=
                this.powerUp.positionX + this.powerUp.width / 2 &&
            this.pongBall.positionY >=
                this.powerUp.positionY - this.powerUp.height / 2 &&
            this.pongBall.positionY <=
                this.powerUp.positionY + this.powerUp.height / 2
        )
            this.powerUp.hit = 1;
    }
}

export default GameManager;
