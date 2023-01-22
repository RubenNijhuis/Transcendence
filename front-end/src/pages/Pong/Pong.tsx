// React
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

// Sockets
import { useSocket } from "../../contexts/SocketContext";
import * as SocketRoutes from "../../config/SocketRoutes";

// UI
import Button from "../../components/Button";
import Layout from "../../components/Layout";

// Game logic
import Canvas from "../../containers/PongGame";
import GameManager from "../../containers/PongGame/GameLogic/GameManager";
import MatchMakingStatus from "../../containers/PongGame/MatchMakingStatus";

// Types
import * as SocketType from "../../types/Socket";
import * as Match from "../../types/Match";
import * as Game from "../../types/Game";
import * as Profile from "../../types/Profile";

// Context
import { useUser } from "../../contexts/UserContext";
import PageRoutes from "../../config/PageRoutes";

////////////////////////////////////////////////////////////

const Pong = (): JSX.Element => {
    const [matchMakingState, setMatchMakingState] = useState<Match.Status>(
        Match.Status.Queue
    );
    const [gameType, setGameType] = useState<Game.Type>(Game.Type.Classic);
    const [matchOpponent, setMatchOpponent] = useState<Profile.Instance | null>(
        null
    );

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    let Manager: GameManager;

    ////////////////////////////////////////////////////////

    const location = useLocation();
    const { gameConnection } = useSocket();

    ////////////////////////////////////////////////////////

    useEffect(() => {
        // TODO: should be done through state
        const gameTypeString = location.pathname
            .split(PageRoutes.pong)[1]
            .slice(1);
        const gameTypeValue =
            gameTypeString === "classic"
                ? Game.Type.Classic
                : Game.Type.Powered;

        if (canvasRef.current === null) return;
        const context = canvasRef.current.getContext("2d");

        if (context === null) return;

        const gameSettings = {
            gameType: gameTypeValue,
            prefferedSide: "left",
            controlSettings: "keyboard"
        };

        Manager = new GameManager(
            canvasRef.current,
            gameSettings,
            gameConnection
        );

        // Setup socket stuff
        gameConnection.emit("joinMatch", { gameType: gameTypeValue });
    }, [gameConnection, canvasRef]);

    // const joinMatch = () => {
    //     gameConnection.emit("joinMatch", gameRequest);
    // };

    ////////////////////////////////////////////////////////

    // const setupConnections = (socket: Socket) => {
    //     socket.on("gameStatus", (res) => console.log(res));
    //     socket.on(SocketRoutes.game.updateBall(), Manager.updateBall);
    //     socket.on(SocketRoutes.game.updateOpponent(), Manager.updateOpponent);
    //     socket.on(SocketRoutes.game.updateScore(), Manager.updateScore);
    //     socket.on(
    //         SocketRoutes.game.updateMatchStatus(),
    //         Manager.updateMatchStatus
    //     );
    // };

    // const removeConnections = (socket: Socket) => {
    //     socket.off("gameStatus");
    //     socket.off(SocketRoutes.game.updateBall());
    //     socket.off(SocketRoutes.game.updateOpponent());
    //     socket.off(SocketRoutes.game.updateScore());
    //     socket.off(SocketRoutes.game.updateMatchStatus());
    // };

    ////////////////////////////////////////////////////////

    return (
        <Layout>
            <MatchMakingStatus
                status={matchMakingState}
                opponent={matchOpponent}
            />
            <Canvas canvasRef={canvasRef} />
        </Layout>
    );
};

export default Pong;
