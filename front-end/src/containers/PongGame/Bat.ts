class Bat {
    positionX: number;
    positionY: number;

    startX: number;
    startY: number;

    width: number;
    height: number;

    context: any;
    canvas: any;

    color: string;

    constructor(posX: number, posY: number, context: any, c: any) {
        this.startX = posX;
        this.startY = posY;

        this.positionX = posX;
        this.positionY = posY;

        this.width = 20;
        this.height = 125;

        this.canvas = c;
        this.context = context;

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
}

export default Bat;
