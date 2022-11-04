// React
import { useEffect, useRef } from "react";

// UI
import Layout from "../../components/Layout";
import SocketRoutes from "../../config/SocketRoutes";

// Game logic
import Canvas from "../../containers/PongGame";
import GameManager from "../../containers/PongGame/GameLogic/GameManager";

// Sockets
import { useSocket } from "../../contexts/SocketContext";
import { Game, Socket } from "../../types";

////////////////////////////////////////////////////////////

const Pong = (): JSX.Element => {
    const canvasRef = useRef<HTMLCanvasElement>(null!);

    ////////////////////////////////////////////////////////////

    let Manager: GameManager;

    ////////////////////////////////////////////////////////////

    const { connection, createConnection } = useSocket();

    ////////////////////////////////////////////////////////////

    // Setup connection
    useEffect(() => {
        createConnection(Socket.SocketType.Game);
    }, []);

    useEffect(() => {
        const context = canvasRef.current.getContext("2d");

        if (context === null) return;

        const gameSettings = {
            gameType: Game.GameType.Classic,
            prefferedSide: "left",
            controlSettings: "keyboard"
        };

        Manager = new GameManager(canvasRef.current, gameSettings);

        if (!connection) return;

        connection.on(SocketRoutes.game.updateBall(), Manager.updateBall);
        connection.on(
            SocketRoutes.game.updateOpponent(),
            Manager.updateOpponent
        );
        connection.on(SocketRoutes.game.updateScore(), Manager.updateScore);
        connection.on(
            SocketRoutes.game.updateMatchStatus(),
            Manager.updateMatchStatus
        );

        // TODO: emit player bat position

        return () => {
            connection.off(SocketRoutes.game.updateBall());
            connection.off(SocketRoutes.game.updateOpponent());
            connection.off(SocketRoutes.game.updateScore());
            connection.off(SocketRoutes.game.updateMatchStatus());
        };
    }, [connection]);

    ////////////////////////////////////////////////////////////

    return (
        <Layout>
            <Canvas canvasRef={canvasRef} />
        </Layout>
    );
};

export default Pong;
