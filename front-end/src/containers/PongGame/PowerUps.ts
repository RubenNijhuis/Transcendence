import randomIntFromInterval from '../../utils/randomNumFromInterval';
import Ball from './Ball';
import Bat from './Bat';
import GameManager from './GameManager';

class PowerUps {
    context: any;
    canvas: any;
    
    positionX: number;
    positionY: number;
    
    turn: number;
    hit: boolean;
    power: boolean;
    powerTaken: boolean;

    extraPongBall: boolean;
    
    width: number;
    height: number;

>>>>>>> origin/master
    positionX: number;
    positionY: number;
    
    turn: number;
    hit: boolean;
    power: boolean;
    powerTaken: boolean;

<<<<<<< HEAD
    context: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;

    color: string[];

    constructor(context: CanvasRenderingContext2D, c: HTMLCanvasElement) {
        this.turn = 0;
        this.hit = 0;

        this.context = context;
        this.canvas = c;
        
        this.positionX = this.getPositionX(6);
        this.positionY = this.getPositionY(3);
        
        this.turn = 0;
        this.hit = false;
        this.power = false;
        this.powerTaken = false;
        
        this.extraPongBall = false;
        
        this.width = this.canvas.width/20;
        this.height = this.canvas.width/20;

        this.color = ['Yellow', 'Green', 'Red'];
    }

    draw() {
        if (this.hit == false) {
            this.context.beginPath();
            this.context.fillStyle = this.color[0];
            this.context.fillRect(
                this.positionX,
                this.positionY,
                this.width,
                this.height
            );
        }
        this.context.closePath();
    }

    getPositionX(max: number) {
        const i = Math.floor(Math.random() * max);
        const positionx = [this.canvas.width * 0.6, this.canvas.width * 0.3, this.canvas.width * 0.7, this.canvas.width * 0.2, this.canvas.width * 0.65, this.canvas.width * 0.15];
        return (positionx[i]);
    }

    getPositionY(max: number) {
        const i = Math.floor(Math.random() * max);
        const positiony = [this.canvas.height * 0.5, this.canvas.height * 0.45, this.canvas.height * 0.40];
        return (positiony[i]);
    }

    tinyBallPower (pongBall: Ball) {
        pongBall.radius = this.canvas.width / 200;
        pongBall.velocityY *= 1.3;
        pongBall.velocityX *= 1.3;
    }

    // hugeBallPower (pongBall: Ball) {
    //     pongBall.radius = this.canvas.width / 20;
    //     pongBall.velocityY *= 1.2;
    //     pongBall.velocityX *= 1.2;
    // }

    bigBatPower (player1: Bat, player2: Bat, pongBall: Ball) {
        if (this.turn == 0)
            player1.height = this.canvas.width / 4;
        if (this.turn == 1)
            player2.height = this.canvas.width / 5;
        pongBall.velocityY *= 1.3;
        pongBall.velocityX *= 1.3;
    }
    
    smallBatPower (player1: Bat, player2: Bat) {
        if (this.turn == 0) 
            player2.height = this.canvas.width / 10;
        if (this.turn == 1) {
            player1.height = this.canvas.width / 10;
        }
    }

    fastBallPower (pongBall: Ball) {
        pongBall.velocityY *= 1.5;
        pongBall.velocityX *= 1.5;
    }

    duplicateBallPower (pongballpower: Ball) {
        pongballpower.velocityX *= 0.4;
        pongballpower.velocityY *= 0.4;
        this.extraPongBall = true;
    }

    getRandomPower (player1: Bat, player2: Bat, pongball: Ball, pongballpower: Ball) {
        var randomNum: Number = Math.floor(Math.random() * 5);
        // randomNum = 0;
        if (this.power == true && !this.powerTaken) {
            this.powerTaken = true;
            if (randomNum == 0)
                this.bigBatPower(player1, player2, pongball);
            else if (randomNum == 1)
                this.smallBatPower(player1, player2);
            else if (randomNum == 2)
                this.tinyBallPower(pongball);
            else if (randomNum == 3)
                this.fastBallPower(pongball);
            else
                this.duplicateBallPower(pongballpower);
        }
        if (!this.powerTaken) {
            player1.height = this.canvas.width / 7;
            player2.height = this.canvas.width / 7;
            pongball.radius = this.canvas.width / 75;
            this.extraPongBall = false;
            pongballpower.velocityX = pongball.velocityX;
            pongballpower.velocityY = pongball.velocityY;
            pongballpower.reset();
        }
    }
}
export default PowerUps;
