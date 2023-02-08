import { Ball, Bat } from "../GameElements";
import * as Game from '../../../types/Game'

class PowerUps {
    position: Game.Position;
    width: number;
    height: number;

    context: CanvasRenderingContext2D;

    color: string;

    constructor(context: CanvasRenderingContext2D, position: Game.Position, size: number) {
        this.context = context;

        this.position = position;

        this.width = size;
        this.height = size;

        this.color = "Yellow";
    }

    draw() {
        this.context.beginPath();
        this.context.fillStyle = this.color;
        this.context.fillRect(
            this.position.posX,
            this.position.posY,
            this.width,
            this.height
        );
        this.context.closePath();
    }

}
export default PowerUps;
