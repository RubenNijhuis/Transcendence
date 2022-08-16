import randomIntFromInterval from "../../utils/randomNumFromInterval";

class Ball {
    positionX: number;
    positionY: number;

    velocityX: number;
    velocityY: number;

    radius: number;

    context: any;
    canvas: any;

    color: string;

    constructor(context: any, c: HTMLCanvasElement) {
        this.positionX = c.clientWidth / 2;
        this.positionY = c.clientHeight / 2;

        this.velocityX = 2.5;
        this.velocityY = 2.5;

        this.radius = 10;

        this.canvas = c;
        this.context = context;

        this.color = "#1e1e1e";
    }

    draw() {
        this.calculatePosition();
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

    start() {
        this.velocityX = randomIntFromInterval(-2.5, 2.5);
        this.velocityY = randomIntFromInterval(-2.5, 2.5);
    }

    reset() {
        this.positionX = this.canvas.clientWidth / 2;
        this.positionY = this.canvas.clientHeight / 2;
        this.start();
    }

    calculatePosition() {
        this.positionX += this.velocityX;
        this.positionY += this.velocityY;

        // if the ball hits the sides (X axis) swap velocities
        if (
            this.positionX + this.radius > this.canvas.width ||
            this.positionX - this.radius < 0
        ) {
            this.velocityX = -this.velocityX;
        }

        // If the ball hits the sides (Y axis) swap velocities
        if (
            this.positionY + this.radius > this.canvas.height ||
            this.positionY - this.radius < 0
        ) {
            this.velocityY = -this.velocityY;
        }
    }
}

export default Ball;
