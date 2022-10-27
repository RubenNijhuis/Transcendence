// Game components
import Ball from "./Ball";
import Bat from "./Bat";
import GameManager from "./GameManager";
import PowerUps from "./PowerUps";

const keyPressListener = (gameManager: GameManager) => {
    // Function to be run on key event
    const updateBats = (e: KeyboardEvent) => {
        // Value of keyboard
        let splitValue = "";

        // Keyboard event type
        const keyboardType = e.code.substring(0, 5);

        if (keyboardType === "Arrow") {
            splitValue = e.code.split("Arrow")[1];
        } else {
            splitValue = e.code.split("Key")[1];
        }

        const Player1Bat: Bat = gameManager.player1Bat;
        const Player2Bat: Bat = gameManager.player2Bat;

        if (splitValue === "W" && !Player1Bat.wallCollisionBatUp()) {
            Player1Bat.setPosition(
                Player1Bat.positionY - Player1Bat.height / 10
            );
        }

        if (splitValue === "S" && !Player1Bat.wallCollisionBatDown()) {
            Player1Bat.setPosition(
                Player1Bat.positionY + Player1Bat.height / 10
            );
        }

        if (splitValue === "O" && !Player2Bat.wallCollisionBatUp()) {
            Player2Bat.setPosition(
                Player2Bat.positionY - Player2Bat.height / 10
            );
        }

        if (splitValue === "L" && !Player2Bat.wallCollisionBatDown()) {
            Player2Bat.setPosition(
                Player2Bat.positionY + Player2Bat.height / 10
            );
        }
    };

    // Keylogger
    window.addEventListener("keydown", updateBats);
    window.addEventListener("keyup", updateBats);
};

const drawGame = (
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
) => {
    // Setup components to be drawn on the canvas
    const PongBall = new Ball(context, canvas);
    const PongBallPower = new Ball(context, canvas);
    const Player1 = new Bat(
        canvas.clientWidth * 0.01,
        canvas.clientHeight / 2,
        context,
        canvas
    );
    const Player2 = new Bat(
        canvas.clientWidth * 0.99,
        canvas.clientHeight / 2,
        context,
        canvas
    );

    const Power = new PowerUps(context, canvas);

    // Initialize the game manager
    const GameManagement = new GameManager(
        PongBall,
        Player1,
        Player2,
        Power,
        canvas,
        context
    );

    // Draws the canvas in an animationFrame
    const animate = (): void => {
        requestAnimationFrame(animate);
        context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

        // PowerUps
        Power.getRandomPower(Player1, Player2, PongBall, PongBallPower);

        // Draw the elements
        if (
            GameManagement.player1Score !== GameManagement.maxScore &&
            GameManagement.player2Score !== GameManagement.maxScore
        ) {
            PongBall.draw();
            Player1.draw();
            Player2.draw();
            Power.draw();
        }
        // Draws and checks extra ball (Powerup)
        if (Power.extraPongBall == true) {
            PongBallPower.draw();
            GameManagement.checkGame(PongBallPower);
        }

        GameManagement.displayText();

        // Check game
        GameManagement.checkGame(PongBall);
    };

    // Respond to keypresses
    keyPressListener(GameManagement);

    // Start the loop
    animate();
};

export default drawGame;
