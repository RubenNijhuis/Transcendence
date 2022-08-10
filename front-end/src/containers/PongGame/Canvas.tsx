import { useRef, useEffect } from "react";
import styled from "styled-components";

const drawGame = (canvas: HTMLCanvasElement, context: any) => {
    const c = context;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const animate = () => {
        requestAnimationFrame(animate);

        /*
            drawPlayerBat();
            drawOpponentBat();
            drawBall();
        */

        c.clearRect(0, 0, 400, 400);
        c.beginPath();
        c.arc(50, 50, 30, 0, Math.PI * 2, false);
        c.strokeStyle = "blue";
        c.stroke();
    };

    animate();
};

const StyledCanvas = styled.canvas`
    border: solid 2px black;
`;

const Container = styled.div`
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

            canvas.width = canvasContainer.clientWidth;
            canvas.height = canvasContainer.clientHeight;

            if (context !== null) {
                drawGame(canvas, context);
            }
        }
    }, []);

    return (
        <Container ref={canvasContainerRef}>
            <StyledCanvas
                ref={canvasRef}
                id="pong"
                width="500px"
                height="500px"
            />
        </Container>
    );
};

export default Canvas;
