import * as Game from "../../../../types/Game";

class Bat {
    positionX: number;
    positionY: number;

    startX: number;
    startY: number;

    width: number;
    height: number;

    context: CanvasRenderingContext2D;

    color: string;

    constructor(context: CanvasRenderingContext2D, position: Game.Position) {
        this.startX = position.posX;
        this.startY = position.posY;

        this.positionX = position.posX;
        this.positionY = position.posY;

        this.context = context;

        this.width = 7;
        this.height = 130;

        this.color = "#1e1e1e";
    }

    draw() {
        this.context.beginPath();
        this.context.fillRect(
            this.positionX - this.width / 2,
            this.positionY - this.height / 2,
            this.width,
            this.height
        );
        this.context.closePath();
    }

    reset() {
        this.positionX = this.startX;
        this.positionY = this.startY;
    }

    setPosition(position: Game.Position) {
        this.positionY = position.posY;
        this.positionX = position.posX;
    }

    wallCollisionBatUp() {
        if (this.positionY - this.height / 2 <= 0) return true;
        else return false;
    }

    wallCollisionBatDown() {
        if (this.positionY + this.height / 2 >= 10) return true;
        else return false;
    }
}

export default Bat;
