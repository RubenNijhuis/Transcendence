class Bat {
    positionX: number;
    positionY: number;

    startX: number;
    startY: number;

    width: number;
    height: number;

    context: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;

    color: string;

    constructor(
        posX: number,
        posY: number,
        context: CanvasRenderingContext2D,
        c: HTMLCanvasElement
    ) {
        this.startX = posX;
        this.startY = posY;

        this.positionX = posX;
        this.positionY = posY;

        this.canvas = c;
        this.context = context;

        this.width = this.canvas.width / 130;
        this.height = this.canvas.width / 7;

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

    setPosition(posY: number) {
        this.positionY = posY;
    }

    wallCollisionBatUp() {
        if (this.positionY - this.height / 2 <= 0) return true;
        else return false;
    }
    wallCollisionBatDown() {
        if (this.positionY + this.height / 2 >= this.canvas.height) return true;
        else return false;
    }
}

export default Bat;
