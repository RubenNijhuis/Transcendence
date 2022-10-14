// React
import { useState } from "react";

// Style
import {
    Container,
    MatchList,
    Match,
    OpponentProfile,
    ScoreBoard
} from "./GameHistory.style";

// Routing
import { Link } from "react-router-dom";

// Types
import { MatchRecord } from "../../types/game";
import { ProfileType } from "../../types/profile";

// UI
import Heading from "../Heading";
import Asset from "../Asset";
import Button from "../Button";

// Utils
import { paginateArray } from "../../utils/paginateArray";

// DEBUG
import Logger from "../../utils/Logger";

////////////////////////////////////////////////////////////

interface Props {
    player: ProfileType;
    matches: MatchRecord[];
}

const GameHistory = ({ player, matches }: Props): JSX.Element => {
    const [selectedPage, setSelectedPage] = useState<number>(0);
    const paginatedMatches = paginateArray<MatchRecord>(matches, 8);

    ////////////////////////////////////////////////////////////

    const changePage = (amountPageChange: number): void => {
        if (
            selectedPage + amountPageChange !== -1 &&
            selectedPage + amountPageChange <= paginatedMatches.length - 1
        ) {
            setSelectedPage((prev) => prev + amountPageChange);
        } else {
            Logger("ERROR", "Game History", "Page changing in match records", {
                error: "Page change would result in position outside of array size"
            });
        }
    };

    ////////////////////////////////////////////////////////////

    return (
        <Container>
            <div className="left-col">
                <Heading type={3}>Friends</Heading>
            </div>
            <div className="right-col">
                <Heading type={3}>History</Heading>
                <MatchList>
                    <div>
                        <Heading type={4}>Page {selectedPage}</Heading>
                        <div>
                            <Button theme="dark" onClick={() => changePage(-1)}>
                                👈
                            </Button>
                            <Button theme="dark" onClick={() => changePage(1)}>
                                👉
                            </Button>
                        </div>
                    </div>
                    {paginatedMatches.map((matches, page) => {
                        if (page === selectedPage) {
                            return matches.map(({ opponent, score }, count) => (
                                <Match
                                    key={count}
                                    win={score.opponent < score.self}
                                >
                                    <OpponentProfile>
                                        <Asset
                                            url={opponent.img_url}
                                            alt="opponent"
                                        />
                                        <Link
                                            to={`/profile/${opponent.username}`}
                                        >
                                            <span>{opponent.username}</span>
                                        </Link>
                                    </OpponentProfile>
                                    <ScoreBoard>
                                        <div>
                                            <span>{score.self}</span>
                                            <span>—</span>
                                            <span>{score.opponent}</span>
                                        </div>
                                    </ScoreBoard>
                                </Match>
                            ));
                        }
                        return null;
                    })}
                </MatchList>
            </div>
        </Container>
    );
};

export default GameHistory;
