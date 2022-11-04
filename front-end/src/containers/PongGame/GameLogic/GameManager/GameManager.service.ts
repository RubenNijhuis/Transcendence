// Elements
import { Ball, Bat } from "../GameElements";
import PowerUps from "../PowerUps";

    const displayText = () => {
        if (
            this.player1Score !== this.maxScore &&
            this.player2Score !== this.maxScore
        ) {
            this.context.font = "30px Arial";
            this.context.textAlign = "center";
            this.context.fillText(
                `${this.player1Score} - ${this.player2Score}`,
                this.canvas.clientWidth / 2,
                100
            );
        }
    }

    const resetGame = () => {
        this.player1Bat.reset();
        this.player2Bat.reset();

        this.pongBall.reset();
    }

    const checkGame = (pongball: Ball) => {
        this.checkIfBallHitsSide(pongball);
        this.checkIfBallHitsBats(pongball);
        this.checkIfBallHitsPowerUp();
        this.checkIfGameIsFinished();
    }

    const checkIfBallHitsBats(pongball: Ball) {
        // Check if left bat is hit
        if (
            pongball.positionX <=
            this.player1Bat.positionX + this.player1Bat.width + pongball.radius
        ) {
            if (
                pongball.positionY >
                    this.player1Bat.positionY - this.player1Bat.height / 2 &&
                pongball.positionY <
                    this.player1Bat.positionY + this.player1Bat.height / 2
            ) {
                var relativeIntersectY =
                    this.player1Bat.positionY - pongball.positionY;
                var normalizedRelativeIntersectionY =
                    relativeIntersectY / (this.player1Bat.height / 2);
                var bounceAngle =
                    normalizedRelativeIntersectionY * ((5 * Math.PI) / 12);
                pongball.velocityX = -pongball.velocityX;
                pongball.velocityY = pongball.velocity * -Math.sin(bounceAngle);
                pongball.velocity = this.canvas.width / 270;
                this.powerUp.turn = 0;
            }
        }
        // Check if right bat is hit
        if (
            pongball.positionX >=
            this.player2Bat.positionX - pongball.radius - this.player1Bat.width
        ) {
            if (
                pongball.positionY >
                    this.player2Bat.positionY - this.player2Bat.height / 2 &&
                pongball.positionY <
                    this.player2Bat.positionY + this.player2Bat.height / 2
            ) {
                var relativeIntersectY =
                    this.player2Bat.positionY - pongball.positionY;
                var normalizedRelativeIntersectionY =
                    relativeIntersectY / (this.player2Bat.height / 2);
                var bounceAngle =
                    normalizedRelativeIntersectionY * ((5 * Math.PI) / 12);
                pongball.velocityX = -pongball.velocityX;
                pongball.velocityY = -pongball.velocity * Math.sin(bounceAngle);
                pongball.velocity = this.canvas.width / 270;
                this.powerUp.turn = 1;
            }
        }
    }

    checkIfBallHitsSide(pongball: Ball) {
        // Checks if left side of the field is hit
        if (pongball.positionX - pongball.radius < 0) {
            this.player2Score++;
            this.powerUp.power = false;
            if (this.powerUp.hit == true) {
                this.powerUp.hit = false;
                this.powerUp.positionX = this.powerUp.getPositionX(4);
                this.powerUp.positionY = this.powerUp.getPositionY(3);
            }
            this.powerUp.powerTaken = false;
            this.resetGame();
        }
        // Checks if right side of the field is hit
        if (pongball.positionX + pongball.radius > this.canvas.width) {
            this.player1Score++;
            this.powerUp.power = false;
            if (this.powerUp.hit == true) {
                this.powerUp.hit = false;
                this.powerUp.positionX = this.powerUp.getPositionX(4);
                this.powerUp.positionY = this.powerUp.getPositionY(3);
            }
            this.powerUp.powerTaken = false;
            this.resetGame();
        }
    }

    checkIfBallHitsPowerUp() {
        if (
            this.pongBall.positionX + this.pongBall.radius >=
                this.powerUp.positionX &&
            this.pongBall.positionX + this.pongBall.radius <=
                this.powerUp.positionX + this.powerUp.width &&
            this.pongBall.positionY + this.pongBall.radius >=
                this.powerUp.positionY &&
            this.pongBall.positionY + this.pongBall.radius <=
                this.powerUp.positionY + this.powerUp.height
        ) {
            this.powerUp.hit = true;
            this.powerUp.power = true;
        }
        if (
            this.pongBall.positionX - this.pongBall.radius >=
                this.powerUp.positionX &&
            this.pongBall.positionX - this.pongBall.radius <=
                this.powerUp.positionX + this.powerUp.width &&
            this.pongBall.positionY + this.pongBall.radius >=
                this.powerUp.positionY &&
            this.pongBall.positionY + this.pongBall.radius <=
                this.powerUp.positionY + this.powerUp.height
        ) {
            this.powerUp.hit = true;
            this.powerUp.power = true;
        }
        if (
            this.pongBall.positionX - this.pongBall.radius >=
                this.powerUp.positionX &&
            this.pongBall.positionX - this.pongBall.radius <=
                this.powerUp.positionX + this.powerUp.width &&
            this.pongBall.positionY - this.pongBall.radius >=
                this.powerUp.positionY &&
            this.pongBall.positionY - this.pongBall.radius <=
                this.powerUp.positionY + this.powerUp.height
        ) {
            this.powerUp.hit = true;
            this.powerUp.power = true;
        }
        if (
            this.pongBall.positionX + this.pongBall.radius >=
                this.powerUp.positionX &&
            this.pongBall.positionX + this.pongBall.radius <=
                this.powerUp.positionX + this.powerUp.width &&
            this.pongBall.positionY - this.pongBall.radius >=
                this.powerUp.positionY &&
            this.pongBall.positionY - this.pongBall.radius <=
                this.powerUp.positionY + this.powerUp.height
        ) {
            this.powerUp.hit = true;
            this.powerUp.power = true;
        }
    }

    checkIfGameIsFinished() {
        //If one of the player's score exeeds maxScore, the game is over
        if (
            this.player1Score >= this.maxScore ||
            this.player2Score >= this.maxScore
        ) {
            this.context.font = "60px Arial";
            this.context.textAlign = "center";
            this.context.fillText(
                `${
                    this.player1Score > this.player2Score
                        ? "Player 1 won!"
                        : "Player 2 won!"
                }`,
                this.canvas.clientWidth / 2,
                this.canvas.height / 3
            );
        }
    }

