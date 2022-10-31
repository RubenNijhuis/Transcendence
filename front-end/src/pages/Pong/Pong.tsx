// React
import { useEffect, useRef } from "react";

// UI
import Layout from "../../components/Layout";
import SocketRoutes from "../../config/SocketRoutes";

// Game logic
import Canvas, { drawGame } from "../../containers/PongGame";
import GameManager from "../../containers/PongGame/GameLogic";
import { useSocket } from "../../contexts/SocketContext";

////////////////////////////////////////////////////////////

const Pong = (): JSX.Element => {
    const canvasRef = useRef<HTMLCanvasElement>(null!);

    ////////////////////////////////////////////////////////////

    // const Manager: GameManager = new GameManager();

    ////////////////////////////////////////////////////////////

    const { connection } = useSocket();

    ////////////////////////////////////////////////////////////

    useEffect(() => {
        const context = canvasRef.current.getContext("2d");

        if (context === null) return;

        // Start drawing the game
        drawGame(canvasRef.current, context);

        type ballPos = { x: number; y: number };

        /**
         * From back-end
         * Ball pos
         * Score
         * Other player bat position
         * Match status = Finished | Started | Abrupt quit
         *
         * At start game
         * Other player data
         *
         * Send to back-end
         * Bat position
         */

        // connection.on(
        //     SocketRoutes.newBallPosition(),
        //     (newPosition: ballPos) => {
        //         GameManager.updateBallPosition(newPosition);
        //     }
        // );
    });

    ////////////////////////////////////////////////////////////

    return (
        <Layout>
            <Canvas canvasRef={canvasRef} />
        </Layout>
    );
};

export default Pong;
