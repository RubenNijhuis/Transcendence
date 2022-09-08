import { useRef, useEffect } from "react";

// Styling
import styled from "styled-components";

const StyledCanvas = styled.canvas`
    box-sizing: border-box;
    outline: black 1px solid;
`;

const Container = styled.div`
    aspect-ratio: 16/9;
    background-color: rgba(0, 0, 0, 0.1);
    width: 100%;
`;

interface Props {
    canvasRef: React.RefObject<HTMLCanvasElement>;
}

const Canvas = ({ canvasRef }: Props) => {
    const canvasContainerRef = useRef(null!);

    useEffect(() => {
        if (canvasRef.current !== null) {
            const canvasContainer: HTMLElement = canvasContainerRef.current;

            // Set canvas width and height to container
            canvasRef.current.width = canvasContainer.offsetWidth;
            canvasRef.current.height = canvasContainer.offsetHeight;
        }
    }, [canvasRef]);

    return (
        <Container ref={canvasContainerRef}>
            <StyledCanvas ref={canvasRef} id="pong" width="0px" height="0px" />
        </Container>
    );
};

export default Canvas;
