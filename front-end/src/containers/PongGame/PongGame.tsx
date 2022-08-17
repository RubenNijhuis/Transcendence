import { useEffect, useRef } from "react";
import Canvas from "./Canvas";

// Game components
import Ball from "./Ball";
import Bat from "./Bat";
import GameManager from "./GameManager";

const keyPressListener = (gameManager: GameManager) => {
    // Function to be run on key event
    const updateBats = (e: KeyboardEvent) => {

        // Value of keyboard
        let splitValue = '';

        // Keyboard event type
        const keyboardType = e.code.substring(0, 5)

        if (keyboardType === 'Arrow') {
            splitValue = e.code.split('Arrow')[1];
        } else {
            splitValue = e.code.split('Key')[1];
        }

        const Player1Bat: Bat = gameManager.player1Bat;
        const Player2Bat: Bat = gameManager.player2Bat;

        if (splitValue === "W") {
            Player1Bat.setPosition(Player1Bat.positionY - 5);
        }

        if (splitValue === "S") {
            Player1Bat.setPosition(Player1Bat.positionY + 5);
        }

        if (splitValue === "L") {
            Player2Bat.setPosition(Player2Bat.positionY + 5);
        }

        if (splitValue === "O") {
            Player2Bat.setPosition(Player2Bat.positionY - 5);
        }
    };

    // Keylogger
    window.addEventListener("keydown", updateBats);
    window.addEventListener("keyup", updateBats);
};

const drawGame = (canvas: HTMLCanvasElement, context: any) => {
    // Setup components to be drawn on the canvas
    const PongBall = new Ball(context, canvas);
    const Player1 = new Bat(100, canvas.clientHeight / 2, context, canvas);
    const Player2 = new Bat(
        canvas.clientWidth - 100,
        canvas.clientHeight / 2,
        context,
        canvas
    );

    // Initialize the game manager
    const GameManagement = new GameManager(
        PongBall,
        Player1,
        Player2,
        canvas,
        context
    );

    // Draws the canvas in an animationFrame
    const animate = () => {
        requestAnimationFrame(animate);
        context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

        // Draw the elements
        PongBall.draw();
        Player1.draw();
        Player2.draw();
        GameManagement.displayText();

        // Check game
        GameManagement.checkIfBallHitsSide();
    };

    // Respond to keypresses
    keyPressListener(GameManagement);

    // Start the loop
    animate();
};

const PongGame = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current !== null) {
            const context = canvasRef.current.getContext("2d");

            // Start drawing the game
            if (context !== null) {
                drawGame(canvasRef.current, context);
            }
        }
    }, []);

    return <Canvas canvasRef={canvasRef} />;
};

export default PongGame;
