class Ball {
    positionX: number;
    positionY: number;

    velocityX: number;
    velocityY: number;

    radius: number;

    context: any;
    canvas: any;

    color: string;

    constructor(posX: number, posY: number, context: any, c: any) {
        this.positionX = posX;
        this.positionY = posY;

        this.velocityX = 2.5;
        this.velocityY = 2.5;

        this.radius = 10;

        this.canvas = c;
        this.context = context

        this.color = '#1e1e1e';
    }

    draw() {
        this.calculatePosition();
        this.context.beginPath();
        this.context.arc(this.positionX, this.positionY, this.radius, 0, Math.PI * 2, false);
        this.context.fillStyle = this.color;
        this.context.fill();
        this.context.closePath();
    }

    calculatePosition() {
        this.positionX += this.velocityX;
        this.positionY += this.velocityY;

        if (this.positionX + this.radius > this.canvas.width || this.positionX - this.radius < 0) {
            this.velocityX = -this.velocityX;
        }

        if (this.positionY + this.radius > this.canvas.height || this.positionY - this.radius < 0) {
            this.velocityY = -this.velocityY;
        }

        this.positionX += this.velocityX;
        this.positionY += this.velocityY;

    }
}

export default Ball;
