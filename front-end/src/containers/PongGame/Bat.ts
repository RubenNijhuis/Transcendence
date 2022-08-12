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
        this.context.beginPath();
        this.context.fillRect(
            this.positionX - this.width / 2,
            this.positionY - this.height / 2,
            this.width,
            this.height
        );
        this.context.closePath();
    }

    setPosition(posX: number, posY: number) {
        this.positionX = posX;
        this.positionY = posY;
    }
}

export default Bat;
