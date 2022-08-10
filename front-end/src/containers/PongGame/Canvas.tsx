import { useRef, useEffect } from "react";
import styled from "styled-components";

const StyledCanvas = styled.canvas`
    aspect-ratio: 16/9;
    height: 400px;
    border: solid 2px black;
`;

const Canvas = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (canvasRef.current != null) {
            const canvas = canvasRef.current as HTMLCanvasElement;
            let context = canvas.getContext("2d");

            if (context !== null) {
                //Our first draw
                context.fillStyle = "#000000";
                context.fillRect(0, 0, context.canvas.width, context.canvas.height);
            }
        }
    }, []);

    return <StyledCanvas ref={canvasRef} id="pong" />;
};

export default Canvas;
