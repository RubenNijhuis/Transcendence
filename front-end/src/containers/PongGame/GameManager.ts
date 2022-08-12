import Ball from "./Ball";
import Bat from "./Bat";

class GameManager {
    player1Score: number;
    player2Score: number;

    pongBall: Ball;
    player1Bat: Bat;
    player2Bat: Bat;

    canvas: HTMLCanvasElement;
    context: any;

    constructor(
        pongBall: Ball,
        player1Bat: Bat,
        player2Bat: Bat,
        canvas: HTMLCanvasElement,
        context: any
    ) {
        this.player1Score = 0;
        this.player2Score = 0;

        this.pongBall = pongBall;
        this.player1Bat = player1Bat;
        this.player2Bat = player2Bat;

        this.canvas = canvas;
        this.context = context;
    }

    displayText() {
        this.context.font = "30px Arial";
        this.context.textAlign = "center";
        this.context.fillText(
            `${this.player1Score} - ${this.player2Score}`,
            this.canvas.clientWidth / 2,
            50
        );
    }

    checkIfBallHitsSide() {
        if (this.pongBall.positionX < this.player1Bat.positionX) {
            console.log("WHEN PAST BAT1");
            this.pongBall.reset();
        }

        if (this.pongBall.positionX > this.player2Bat.positionX) {
            console.log("WHEN PAST BAT2");
            this.pongBall.reset();
        }
    }
}

export default GameManager;
