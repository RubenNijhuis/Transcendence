import { useRef, useEffect } from "react";

// Styling
import styled from "styled-components";

// Game components
import Ball from "./Ball";
import Bat from "./Bat";
import GameManager from "./GameManager";

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

    const GameManagement = new GameManager(
        PongBall,
        Player1,
        Player2,
        canvas,
        context
    );

    // Keylogger
    window.addEventListener("keypress", (e) => {
        const splitValue = e.code.split("Key")[1];
        console.log(splitValue);
    });

    // Draws the canvas in an animationFrame
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

    animate();
};

const StyledCanvas = styled.canvas`
    box-sizing: border-box;
    outline: black 1px solid;
`;

const Container = styled.div`
    aspect-ratio: 16/9;
    background-color: rgba(0, 0, 0, 0.1);
    width: 100%;
`;

const Canvas = () => {
    const canvasRef = useRef(null);
    const canvasContainerRef = useRef(null);

    useEffect(() => {
        if (canvasRef.current !== null && canvasContainerRef.current !== null) {
            const canvas = canvasRef.current as HTMLCanvasElement;
            const canvasContainer: HTMLElement = canvasContainerRef.current;

            let context = canvas.getContext("2d");

            canvas.width = canvasContainer.offsetWidth;
            canvas.height = canvasContainer.offsetHeight;

            if (context !== null) {
                drawGame(canvas, context);
            }
        }
    }, []);

    return (
        <Container ref={canvasContainerRef}>
            <StyledCanvas ref={canvasRef} id="pong" width="0px" height="0px" />
        </Container>
    );
};

export default Canvas;
