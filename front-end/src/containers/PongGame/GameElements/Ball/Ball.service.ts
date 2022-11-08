export const tempnum = 0;
// function startVelocity(velocity: number): number {
//     var randomNum: Number = Math.random();
//     if (randomNum < 0.5) return velocity * -1;
//     else return velocity;
// }

// class Ball {
//     positionX: number;
//     positionY: number;

//     velocity: number;
//     velocityX: number;
//     velocityY: number;

//     radius: number;

//     context: CanvasRenderingContext2D;
//     canvas: HTMLCanvasElement;

//     color: string;

//     constructor(context: CanvasRenderingContext2D, c: HTMLCanvasElement) {
//         this.positionX = c.clientWidth / 2;
//         this.positionY = c.clientHeight / 2;

//         this.canvas = c;
//         this.context = context;

//         this.radius = this.canvas.width / 75;

//         this.velocity = this.canvas.width / 170;

//         this.velocityX = startVelocity(this.velocity);
//         this.velocityY = 0;

//         this.color = "#1e1e1e";
//     }

//     draw() {
//         this.calculatePosition();
//         this.context.beginPath();
//         this.context.arc(
//             this.positionX,
//             this.positionY,
//             this.radius,
//             0,
//             Math.PI * 2,
//             false
//         );
//         this.context.fillStyle = this.color;
//         this.context.fill();
//         this.context.closePath();
//     }

//     reset(posX: number, posY: number) {
//         this.positionX = posX;
//         this.positionY = posY;
//         this.velocityY = 0;
//         this.velocityX = startVelocity(this.velocityX);
//     }

//     setPosition(posX: number, posY: number) {
//         this.positionX = posX;
//         this.positionY = posY;
//     }

//     calculatePosition() {
//         this.positionX += this.velocityX;
//         this.positionY += this.velocityY;

//         // if the ball hits the sides (X axis) swap velocities
//         if (
//             this.positionX + this.radius >= this.canvas.width ||
//             this.positionX - this.radius <= 0
//         ) {
//             this.velocityX = -this.velocityX;
//         }

//         // If the ball hits the sides (Y axis) swap velocities
//         if (
//             this.positionY + this.radius >= this.canvas.height ||
//             this.positionY - this.radius <= 0
//         ) {
//             this.velocityY = -this.velocityY;
//         }
//     }
// }

// export default Ball;
