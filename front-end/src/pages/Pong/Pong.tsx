// React
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
import { Bat } from "../../containers/PongGame/GameElements";

const keyPressListener = (gameManager: GameManager) => {
    // Function to be run on key event
    const updateBats = (e: KeyboardEvent) => {
        // Value of keyboard
        let splitValue = "";

        // Keyboard event type
        const keyboardType = e.code.substring(0, 5);

        if (keyboardType === "Arrow") {
            splitValue = e.code.split("Arrow")[1];
        } else {
            splitValue = e.code.split("Key")[1];
        }

        const PlayerBat: Bat = gameManager.playerBat;

        if (splitValue === "W" && !PlayerBat.wallCollisionBatUp()) {
            gameManager.updatePlayerBat(true);
        }

        if (splitValue === "S" && !PlayerBat.wallCollisionBatDown()) {
            gameManager.updatePlayerBat(false);
        }
    };

    // Keylogger
    window.addEventListener("keydown", updateBats);
    window.addEventListener("keyup", updateBats);
};

////////////////////////////////////////////////////////////

const ScoreBoard = ({ score }: { score: [number, number] }): JSX.Element => {
    return (
        <div style={{display: "flex", fontSize: '24px', justifyContent: "center"}}>
            <span>{score[0]}</span> - <span>{score[1]}</span>
        </div>
    );
};

const Pong = (): JSX.Element => {
    const [matchState, setMatchState] = useState<Match.Status>(
        Match.Status.Queue
    );
    const [players, setPlayers] = useState<Profile.Instance[]>([]);
    const [score, setScore] = useState<[number, number]>([0, 0]);

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const navigate = useNavigate();
    let Manager: GameManager;

    ////////////////////////////////////////////////////////

    interface WatchPongState {
        watchId: string | null;
    }

    const location = useLocation();
    const locState = location.state as WatchPongState;
    const { gameConnection } = useSocket();
    const { user } = useUser();

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
        if (matchState === Match.Status.Finished) {
            setTimeout(() => {
                navigate(PageRoutes.profile);
            }, 3000);
        }
    }, [matchState]);

    useEffect(() => {
        if (!gameConnection) return;
        if (canvasRef.current === null) return;

        const context = canvasRef.current.getContext("2d");
        if (context === null) return;

        const gameType = getGameTypeFromLocation(location.pathname);

        if (locState && locState.watchId !== null) {
            gameConnection.emit("watchMatch", {
                gameId: locState.watchId
            });
        } else {
            gameConnection.emit("joinQueue", { gameType });
        }

        Manager = new GameManager(context, gameConnection);

        gameConnection.on("gameStatus", (res: Match.Status) => {
            setMatchState(res);

            switch (res) {
                case Match.Status.Playing:
                    Manager.startGame();
            }
        });

        gameConnection.on("newBatPosition", (res: any) => {
            Manager.updateBat(res.posY, res.playerUid);
        });

        gameConnection.on("powerUpActivated", (res) => {
            Manager.activatePowerUp(res.uid, res.size)            
        });

        gameConnection.on("powerUp", (res) => {
            const { posX, posY, size } = res;

            Manager.placePowerup(posX, posY, size);
        })

        gameConnection.on("gameConfig", async (res) => {
            console.log(res);
            try {
                const playerOne = await getProfileByUid(res.players[0], {
                    profile: true,
                    banner: false
                });
                const playerTwo = await getProfileByUid(res.players[1], {
                    profile: true,
                    banner: false
                });

                Manager.setPlayers(playerOne, playerTwo);

                if (playerOne.uid === user.uid) {
                    Manager.setActivePlayer(0);
                } else if (playerTwo.uid === user.uid) {
                    Manager.setActivePlayer(1);
                }

                setPlayers([playerOne, playerTwo]);
                setMatchState(res.state);

                Manager.startGame();
            } catch (err) {
                console.error(err);
            }
        });

        gameConnection.on("watchGameSetup", console.log);

        gameConnection.on("scoreUpdate", setScore);

        gameConnection.on("newBallPosition", (res: any) => {
            Manager.updateBall(res.posX, res.posY);
        });

        // Respond to keypresses
        keyPressListener(Manager);

        return () => {
            gameConnection.removeAllListeners();
            window.removeEventListener("keydown", () => {});
            window.removeEventListener("keyup", () => {});
        };
    }, [gameConnection, canvasRef]);

    ////////////////////////////////////////////////////////

    return (
        <Layout>
            <MatchMakingStatus status={matchState} players={players} />
            <ScoreBoard score={score} />

            {matchState === Match.Status.Finished ?
                <div style={{textAlign: "center"}}>
                    {score[0] === 5 ? players[0].username : players[1].username} won the game!
                </div>
            : null}
            <Canvas canvasRef={canvasRef} />
        </Layout>
    );
};

export default Pong;
