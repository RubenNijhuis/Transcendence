// React
import { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import Button from "../../components/Button";
import { useFormInput } from "../../components/Form/hooks";

// UI
import Layout from "../../components/Layout";
import SocketRoutes from "../../config/SocketRoutes";

// Game logic
import Canvas from "../../containers/PongGame";
import GameManager from "../../containers/PongGame/GameLogic/GameManager";

// Sockets
import { useSocket } from "../../contexts/SocketContext";
import { useUser } from "../../contexts/UserContext";
import { Game, SocketType } from "../../types";

////////////////////////////////////////////////////////////

const Pong = (): JSX.Element => {
    const canvasRef = useRef<HTMLCanvasElement>(null!);
    const nameHandeler1 = useFormInput("");
    const nameHandeler2 = useFormInput("");

    ////////////////////////////////////////////////////////////

    let Manager: GameManager;

    ////////////////////////////////////////////////////////////

    const { connection, createConnection, destroyConnectionInstance } =
        useSocket();

    const { user } = useUser();

    ////////////////////////////////////////////////////////////

    // TODO: Abstract into business logic part
    useEffect(() => {
        createConnection(SocketType.SocketType.Game);
    }, []);

    useEffect(() => {
        const context = canvasRef.current.getContext("2d");

        if (context === null) return;

        // TODO: get from user database settings or whatever
        const gameSettings = {
            gameType: Game.GameType.Classic,
            prefferedSide: "left",
            controlSettings: "keyboard"
        };

        Manager = new GameManager(canvasRef.current, gameSettings);

        if (!connection) return;
        setupConnections(connection);

        return () => {
            removeConnections(connection);
            destroyConnectionInstance();
        };
    }, [connection]);

    const getRooms = () => {
        const gameRequest = {
            requester: nameHandeler1.value,
            joiner: nameHandeler2.value
        };
        connection.emit("joinFriendlyMatch", gameRequest);
    };

    ////////////////////////////////////////////////////////////

    const setupConnections = (socket: Socket) => {
        socket.on("gameStatus", (res) => console.log(res));
        socket.on(SocketRoutes.game.updateBall(), Manager.updateBall);
        socket.on(SocketRoutes.game.updateOpponent(), Manager.updateOpponent);
        socket.on(SocketRoutes.game.updateScore(), Manager.updateScore);
        socket.on(
            SocketRoutes.game.updateMatchStatus(),
            Manager.updateMatchStatus
        );
    };

    const removeConnections = (socket: Socket) => {
        socket.off("gameStatus");
        socket.off(SocketRoutes.game.updateBall());
        socket.off(SocketRoutes.game.updateOpponent());
        socket.off(SocketRoutes.game.updateScore());
        socket.off(SocketRoutes.game.updateMatchStatus());
    };

    ////////////////////////////////////////////////////////////

    return (
        <Layout>
            <Button onClick={getRooms}>Get le rooms</Button>
            <p>Profile 1</p>
            <input type="text" {...nameHandeler1} />
            <hr />
            <p>Profile 2</p>
            <input type="text" {...nameHandeler2} />
            <Canvas canvasRef={canvasRef} />
        </Layout>
    );
};

export default Pong;
