// Types
import * as Game from "../../../../types/Game";
import * as SocketType from "../../../../types/Socket";
import * as SocketRoutes from "../../../../config/SocketRoutes";

// Game elements
import { Ball, Bat } from "../../GameElements";
import PowerUps from "../PowerUps";

class GameManager {
    player1Score: number;
    player2Score: number;
    playerBatPos: number;
    playerBat: Bat;

    ball: Ball;
    player1Bat: Bat;
    player2Bat: Bat;
    // powerUps: PowerUps;

    context: CanvasRenderingContext2D;
    canvasWidth: number;
    canvasHeigth: number;

    constructor(
        context: CanvasRenderingContext2D,
        gameSettings: any,
        connection: SocketType.Instance
    ) {
        if (!connection) {
            throw Error(
                "No connection supplied in the game manager constructor"
            );
        }

        if (!gameSettings) {
            throw Error(
                "No game settings supplied in the game manager constructor"
            );
        }

        if (!context) {
            throw Error("No canvas supplied in the game manager constructor");
        }

        this.context = context;

        this.player1Score = 0;
        this.player2Score = 0;

        this.canvasHeigth = this.context.canvas.height;
        this.canvasWidth = this.context.canvas.width;

        this.ball = new Ball(this.context, this.getMiddleOfBoard(), 20);

        const leftSideBat = this.scaleViewInput("10vw");
        const rightSideBat = this.scaleViewInput("90vw");

        const bat1pos = {
            posX: this.scaleViewInput("10vw"),
            posY: this.scaleViewInput("50vh")
        };

        const bat2pos = {
            posX: this.canvasWidth - this.scaleViewInput("10vw"),
            posY: this.scaleViewInput("50vh")
        };

        const batSize = {
            posX: this.scaleViewInput("1vw"),
            posY: this.scaleViewInput("20vh")
        };

        this.player1Bat = new Bat(
            this.context,
            bat1pos,
            batSize.posX,
            batSize.posY
        );
        this.player2Bat = new Bat(
            this.context,
            bat2pos,
            batSize.posX,
            batSize.posY
        );

        this.playerBat = this.player1Bat;
        this.playerBatPos = 0;
    }

    setPlayerPosition(pos: number): void {
        this.playerBat = pos === 0 ? this.player1Bat : this.player2Bat;
        this.playerBatPos = pos;
    }

    // Service
    getMiddleOfBoard(): Game.Position {
        const middle: Game.Position = {
            posX: this.context.canvas.width / 2,
            posY: this.context.canvas.height / 2
        };

        return middle;
    }

    // Service
    resetGame() {
        this.player1Bat.reset();
        this.player2Bat.reset();

        this.ball.setPosition(this.getMiddleOfBoard());
    }

    // Service
    scaleViewInput(position: string): number {
        const num = parseFloat(position.slice(0, -2));

        if (position.includes("vw")) {
            return this.canvasWidth * (num / 100);
        } else if (position.includes("vh")) {
            return this.canvasHeigth * (num / 100);
        }

        return 0;
    }

    updateBall(posX: string, posY: string) {
        const newPosX = this.scaleViewInput(posX);
        const newPosY = this.scaleViewInput(posY);

        const newPosition: Game.Position = {
            posX: newPosX,
            posY: newPosY
        };

        this.ball.setPosition(newPosition);
    }

    updateOpponentBat(pos: string) {
        const scaledValue = this.scaleViewInput(pos);

        if (this.playerBatPos === 1) {
            this.player2Bat.positionX = scaledValue;
        } else {
            this.player1Bat.positionX = scaledValue;
        }
    }

    startGame() {
        const drawLoop = () => {
            requestAnimationFrame(drawLoop);
            this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeigth);
            this.player1Bat.draw();
            this.player2Bat.draw();
            this.ball.draw();
        };
        drawLoop();
    }
}

export default GameManager;
