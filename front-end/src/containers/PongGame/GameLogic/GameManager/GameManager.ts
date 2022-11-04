// Elements
import { Game } from "../../../../types";
import { Ball, Bat } from "../../GameElements";
import PowerUps from "../PowerUps";

class GameManager {
    player1Score: number;
    player2Score: number;

    ball: Ball;
    player1Bat: Bat;
    player2Bat: Bat;
    // powerUps: PowerUps;

    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement, gameSettings: any) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d") as CanvasRenderingContext2D;

        this.player1Score = 0;
        this.player2Score = 0;

        this.context = undefined!;

        this.ball = new Ball(this.context, this.getMiddleOfBoard(), 10);
        this.player1Bat = new Bat(this.context, this.getBatStartingPostion());
        this.player2Bat = new Bat(this.context, this.getBatStartingPostion());

        // if (gameSettings.powered === true) {
        //     this.powerUps = powerUps;
        // }

        // // Start drawing the game
        // drawGame(canvasRef.current, context);
    }

    // Service
    displayText() {
        this.context.font = "30px Arial";
        this.context.textAlign = "center";
        this.context.fillText(
            `${this.player1Score} - ${this.player2Score}`,
            this.canvas.clientWidth / 2,
            100
        );
    }

    // Service
    getMiddleOfBoard(): Game.Position {
        const middle: Game.Position = {
            posX: 0,
            posY: 0
        };

        return middle;
    }

    // Service
    resetGame() {
        this.player1Bat.reset();
        this.player2Bat.reset();

        const middleOfBoard = this.getMiddleOfBoard();
        this.ball.reset(middleOfBoard);
    }

    // Service
    scalePosition(position: Game.Position): Game.Position {
        const scaledPosition: Game.Position = {
            posX: 0,
            posY: 0
        };

        scaledPosition.posX = position.posX + 0;
        scaledPosition.posY = position.posY + 0;

        return scaledPosition;
    }

    // From BE to FE
    updateBall(position: Game.Position) {
        const scaledValue = this.scalePosition(position);

        this.ball.setPosition(scaledValue);
    }

    startGame() {}

    updateOpponent() {}

    updatePowerUps() {}

    updateScore() {}

    updateMatchStatus() {}

    // From BE to FE
    sendPlayerBatPosition() {}
}

export default GameManager;
