import { useRef, useEffect, useState } from "react";

// Styling
import styled from "styled-components";

// Socket
import { useSocket } from "../../contexts/SocketContext";
import { SocketType } from "../../types/socket";
import SocketRoutes from "../../config/SocketRoutes";

// Debug
import Logger, { LogTypes } from "../../modules/Logger";

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

interface ICanvas {
    canvasRef: React.RefObject<HTMLCanvasElement>;
}

const Canvas = ({ canvasRef }: ICanvas): JSX.Element => {
    const canvasContainerRef = useRef(null!);

    const [socketResponse, setSocketResponse] = useState<string>(
        "Put ur data here lets goooo 🚌"
    );
    const dataRef = useRef<HTMLSpanElement>(null!);

    const { socket, socketType, setSocketType } = useSocket();

    ////////////////////////////////////////////////////////////

    useEffect(() => {
        setSocketType(SocketType.Game);

        const emitRet = socket.emit(
            SocketRoutes.healthCheck(),
            "pee pee poo poo"
        );
        Logger(
            LogTypes.DEBUG,
            "Canvas",
            `Socket.emit('${SocketRoutes.healthCheck()}') return`,
            emitRet
        );

        const ret = socket.on(SocketRoutes.healthCheck(), (arg: string) =>
            setSocketResponse(arg)
        );

        Logger(
            LogTypes.DEBUG,
            "Canvas",
            `Socket.on('${SocketRoutes.healthCheck()}') return`,
            ret
        );
    });

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
