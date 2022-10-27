// React
import { useEffect, useRef } from "react";

// UI
import Layout from "../components/Layout";

// Game logic
import Canvas, { drawGame } from "../containers/PongGame";

////////////////////////////////////////////////////////////

const Pong = (): JSX.Element => {
    const canvasRef = useRef<HTMLCanvasElement>(null!);

    ////////////////////////////////////////////////////////////

    useEffect(() => {
        const context = canvasRef.current.getContext("2d");

        if (context === null) return;

        // Start drawing the game
        drawGame(canvasRef.current, context);
    });

    ////////////////////////////////////////////////////////////

    return (
        <Layout>
            <Canvas canvasRef={canvasRef} />;
        </Layout>
    );
};

export default Pong;
