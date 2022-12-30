import * as Game from "../../../../types/Game";

class Ball {
    positionX: number;
    positionY: number;
    radius: number;
    color: string;

    context: CanvasRenderingContext2D;

    constructor(
        context: CanvasRenderingContext2D,
        position: Game.Position,
        radius: number
    ) {
        this.positionX = position.posX;
        this.positionY = position.posY;

        this.context = context;

        this.radius = radius;

        this.color = "#1e1e1e";
    }

    draw() {
        this.context.beginPath();
        this.context.arc(
            this.positionX,
            this.positionY,
            this.radius,
            0,
            Math.PI * 2,
            false
        );
        this.context.fillStyle = this.color;
        this.context.fill();
        this.context.closePath();
    }

    reset(position: Game.Position) {
        this.positionX = position.posX;
        this.positionY = position.posY;
    }

    setPosition(position: Game.Position) {
        this.positionX = position.posX;
        this.positionY = position.posY;
    }
}

export default Ball;
