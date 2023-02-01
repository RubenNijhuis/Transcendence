// React
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

// Routing
import PageRoutes from "../../config/PageRoutes";

// Sockets
import { useSocket } from "../../contexts/SocketContext";

// UI
import Layout from "../../components/Layout";

// Game logic
import Canvas from "../../containers/PongGame";
import GameManager from "../../containers/PongGame/GameLogic/GameManager";
import MatchMakingStatus from "../../containers/PongGame/MatchMakingStatus";

// Types
import * as Match from "../../types/Match";
import * as Game from "../../types/Game";
import * as Profile from "../../types/Profile";

// Context
import { useUser } from "../../contexts/UserContext";
import { getProfileByUsername } from "../../proxies/profile";
import { getProfileByUid } from "../../proxies/profile/getProfileByUid";

////////////////////////////////////////////////////////////

const Pong = (): JSX.Element => {
    const [matchMakingState, setMatchMakingState] = useState<Match.Status>(
        Match.Status.Queue
    );
    const [matchOpponent, setMatchOpponent] = useState<Profile.Instance | null>(
        null
    );

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    let Manager: GameManager;

    ////////////////////////////////////////////////////////

    const location = useLocation();
    const { gameConnection } = useSocket();

    ////////////////////////////////////////////////////////

    const getGameTypeFromLocation = (path: string): Game.Type => {
        // TODO: should be done through routet state
        const gameTypeString = path.split(`${PageRoutes.pong}/`)[1];
        const gameTypeValue =
            gameTypeString === "classic"
                ? Game.Type.Classic
                : Game.Type.Powered;

        return gameTypeValue;
    };

    useEffect(() => {
        if (!gameConnection) return;

        const gameType = getGameTypeFromLocation(location.pathname);

        if (canvasRef.current === null) return;
        const context = canvasRef.current.getContext("2d");

        if (context === null) return;

        const gameSettings = {
            gameType,
            prefferedSide: "left",
            controlSettings: "keyboard"
        };

        Manager = new GameManager(context, gameSettings, gameConnection);

        Manager.startGame();

        gameConnection.on("gameStatus", (res: Match.Status) => {
            setMatchMakingState(res);

            switch (res) {
                case Match.Status.Playing:
                    Manager.startGame();
                    break;
                case Match.Status.Finished:
                    break;
                // Manager.finishGame();
            }
        });

        gameConnection.on("playPosition", (res) =>
            Manager.setPlayerPosition(res.posX)
        );
        gameConnection.on("newBatPosition", (res: any) => {
            // if (res.playerUid !== user)
            Manager.updateOpponentBat(res.posX);
        });

        gameConnection.on("matchedWith", (res: Profile.ID) => {
            getProfileByUid(res, { profile: true, banner: false })
                .then(setMatchOpponent)
                .catch(console.error);
        });

        gameConnection.emit("joinQueue", { gameType });

        gameConnection.on("newBallPosition", (res: any) => {
            Manager.updateBall(res.posX, res.posY);
        });

        setTimeout(() => {
            console.log(":(");
            gameConnection.emit("newBatPosition", { posX: "20vh" });
        }, 3000);

        return () => {
            gameConnection.removeAllListeners();
        };
    }, [gameConnection, canvasRef]);

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
