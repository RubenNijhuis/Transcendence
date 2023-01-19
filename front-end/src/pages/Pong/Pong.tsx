// React
import { useEffect, useRef } from "react";

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
import { useUser } from "../../contexts/UserContext";

////////////////////////////////////////////////////////////

const Pong = (): JSX.Element => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const { user } = useUser();
    ////////////////////////////////////////////////////////

    let Manager: GameManager;

    ////////////////////////////////////////////////////////

    const { gameConnection } = useSocket();

    ////////////////////////////////////////////////////////

    useEffect(() => {
        if (canvasRef.current === null) return;

        const context = canvasRef.current.getContext("2d");

        if (context === null) return;

        // TODO: get from user database settings or whatever
        const gameSettings = {
            gameType: Match.GameType.Classic,
            prefferedSide: "left",
            controlSettings: "keyboard"
        };

        Manager = new GameManager(canvasRef.current, gameSettings);

        if (!gameConnection) return;
        // setupConnections(gameConnection);
    }, [gameConnection]);

    const joinMatch = () => {
        const gameRequest = {
            profile: {
                uid: Date.now().toString(),
                elo: 100
            }
        };

        console.log(gameRequest.profile.uid);

        gameConnection.emit("joinMatch", gameRequest);
    };

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
            <MatchMakingStatus />
            <Button onClick={joinMatch}>Join match</Button>
            <Canvas canvasRef={canvasRef} />
        </Layout>
    );
};

export default Pong;
