// Types
import * as Game from "../../../../types/Game";
import * as SocketType from "../../../../types/Socket";
import * as SocketRoutes from "../../../../config/SocketRoutes";
import * as Profile from "../../../../types/Profile";
// Game elements
import { Ball, Bat } from "../../GameElements";
import PowerUps from "../PowerUps";
import { Socket } from "socket.io-client";

class GameManager {
    player1Score: number;
    player2Score: number;
    playerBat: Bat;

    ball: Ball;
    player1Bat: Bat;
    player2Bat: Bat;
    // powerUps: PowerUps;

    context: CanvasRenderingContext2D;
    canvasWidth: number;
    canvasHeigth: number;

    connection: Socket;

    constructor(
        context: CanvasRenderingContext2D,
        connection: SocketType.Instance
    ) {
        if (!connection) {
            throw Error(
                "No connection supplied in the game manager constructor"
            );
        }

        if (!context) {
            throw Error("No canvas supplied in the game manager constructor");
        }

        this.context = context;

        this.player1Bat = null!; // I dont care about the rules
        this.player2Bat = null!;
        this.playerBat = null!;

        this.connection = connection;

        this.player1Score = 0;
        this.player2Score = 0;

        this.canvasHeigth = this.context.canvas.height;
        this.canvasWidth = this.context.canvas.width;

        this.ball = new Ball(
            this.context,
            this.getMiddleOfBoard(),
            this.scaleViewInput("2.5vh")
        );
    }

    setPlayers(playerOne: Profile.Instance, playerTwo: Profile.Instance): void {
        const bat1pos = {
            posX: this.scaleViewInput("10vw"),
            posY: this.scaleViewInput("50vh")
        };

        const bat2pos = {
            posX: this.canvasWidth - this.scaleViewInput("10vw"),
            posY: this.scaleViewInput("50vh")
        };

        const batSize = {
            width: this.scaleViewInput("1vw"),
            height: this.scaleViewInput("20vh")
        };

        this.player1Bat = new Bat(this.context, bat1pos, batSize);
        this.player1Bat.playerUid = playerOne.uid;

        this.player2Bat = new Bat(this.context, bat2pos, batSize);
        this.player2Bat.playerUid = playerTwo.uid;
    }

    setActivePlayer(whichOne: number) {
        this.playerBat = whichOne === 0 ? this.player1Bat : this.player2Bat;
    }

    // Service
    getMiddleOfBoard(): Game.Position {
        const middle: Game.Position = {
            posX: this.context.canvas.width / 2,
            posY: this.context.canvas.height / 2
        };

        return middle;
    }

    resetGame() {
        this.player1Bat.reset();
        this.player2Bat.reset();

        this.ball.setPosition(this.getMiddleOfBoard());
    }

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

    // Service
    inputToScaled(position: number, type: string): string {
        let scaledValue = 0;

        if (type === "vw") {
            scaledValue = (position / this.canvasWidth) * 100;
        } else {
            scaledValue = (position / this.canvasHeigth) * 100;
        }

        return `${scaledValue}${type}`;
    }

    updatePlayerBat(directionUp: boolean) {
        if (directionUp) {
            this.playerBat.updatePosition(this.scaleViewInput("2vh"), true);
        } else {
            this.playerBat.updatePosition(this.scaleViewInput("2vh"), false);
        }

        const newPosY = this.inputToScaled(this.playerBat.positionY, "vh");

        this.connection.emit("newBatPosition", {
            posY: newPosY
        });
    }

    updateBat(pos: string, playerUid: string) {
        const scaledValue = this.scaleViewInput(pos);
        if (this.player1Bat.playerUid === playerUid) {
            this.player1Bat.positionY = scaledValue;
        } else if (this.player2Bat.playerUid === playerUid) {
            this.player2Bat.positionY = scaledValue;
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
