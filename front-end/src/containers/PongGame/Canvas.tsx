import { useRef, useEffect, useState } from "react";
import { io } from "socket.io-client";

// Styling
import styled from "styled-components";

////////////////////////////////////////////////////////////

const StyledCanvas = styled.canvas`
    box-sizing: border-box;
    outline: black 1px solid;
`;

const Container = styled.div`
    aspect-ratio: 16/9;
    background-color: rgba(0, 0, 0, 0.1);
    width: 100%;
`;

////////////////////////////////////////////////////////////

interface Props {
    canvasRef: React.RefObject<HTMLCanvasElement>;
}

const Canvas = ({ canvasRef }: Props): JSX.Element => {
    const canvasContainerRef = useRef(null!);

    const [socketResponse, setSocketResponse] = useState<string>(
        "Put ur data here lets goooo 🚌"
    );
    const dataRef = useRef<HTMLSpanElement>(null!);

    ////////////////////////////////////////////////////////////

    useEffect(() => {
        console.log("websocket test");
        const socket = io("ws://localhost:8080");
        console.log("socket: ", socket);

        const emitRet = socket.emit("healthCheck", "pee pee poo poo");
        console.log("emit ret: ", emitRet);

        const ret = socket.on("healthCheck", (arg: any) => {
            setSocketResponse(arg as string);
        });
        
        console.log("socket.on ret: ", ret);
    }, []);

    useEffect(() => {
        if (canvasRef.current === null) return;

        const canvasContainer: HTMLElement = canvasContainerRef.current;

        // Set canvas width and height to container
        canvasRef.current.width = canvasContainer.offsetWidth;
        canvasRef.current.height = canvasContainer.offsetHeight;
    }, [canvasRef]);

    ////////////////////////////////////////////////////////////

    return (
        <>
            <div>
                <span ref={dataRef}>{socketResponse}</span>
            </div>
            <Container ref={canvasContainerRef} style={{ display: "none" }}>
                <StyledCanvas
                    ref={canvasRef}
                    id="pong"
                    width="0px"
                    height="0px"
                />
            </Container>
        </>
    );
};

export default Canvas;
