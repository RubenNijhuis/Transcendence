class Bat {
    positionX: number;
    positionY: number;

    width: number;
    height: number;

    context: any;
    canvas: any;

    color: string;

    constructor(posX: number, posY: number, context: any, c: any) {
        this.positionX = posX;
        this.positionY = posY;

        this.width = 20;
        this.height = 125;

        this.canvas = c;
        this.context = context;

        this.color = "#1e1e1e";
    }

    draw() {
        // this.calculatePosition();
        this.context.beginPath();
        this.context.fillRect(
            this.positionX - this.width / 2,
            this.positionY - this.height / 2,
            this.width,
            this.height
        );
        // this.context.fill();
        this.context.closePath();
    }

    // calculatePosition() {
    //     this.positionX += this.velocityX;
    //     this.positionY += this.velocityY;

    //     if (this.positionX + this.radius > this.canvas.width || this.positionX - this.radius < 0) {
    //         this.velocityX = -this.velocityX;
    //     }

    //     if (this.positionY + this.radius > this.canvas.height || this.positionY - this.radius < 0) {
    //         this.velocityY = -this.velocityY;
    //     }

    //     this.positionX += this.velocityX;
    //     this.positionY += this.velocityY;
    // }
}

export default Bat;
