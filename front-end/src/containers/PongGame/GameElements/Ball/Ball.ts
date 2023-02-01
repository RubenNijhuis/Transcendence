import * as Game from "../../../../types/Game";

class Ball {
    size: number;
    position: Game.Position;
    color: string;
    radius: number;

    context: CanvasRenderingContext2D;

    constructor(
        context: CanvasRenderingContext2D,
        position: Game.Position,
        size: number,
    ) {
        this.size = size;
        this.position = position;
        this.context = context;
        this.radius = size / 2;
        this.color = "#1e1e1e";
    }

    draw() {
        this.context.beginPath();
        this.context.arc(
            this.position.posX,
            this.position.posY,
            this.radius,
            0,
            Math.PI * 2,
            false
        );
        this.context.fillStyle = this.color;
        this.context.fill();
        this.context.closePath();
    }

    setPosition(position: Game.Position) {
        this.position = position;
    }
}

export default Ball;
