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
import type { Profile, MatchRecord } from "../../utils/GlobalTypes";

// Components
import Heading from "../Heading";
import Asset from "../Asset";
import Button from "../Button";

// Utils
import { PaginateArray } from "../../utils/paginateArray";

interface Props {
    player: Profile;
    matches: MatchRecord[];
}

const GameHistory = ({ player, matches }: Props) => {
    const [selectedPage, setSelectedPage] = useState(0);
    const paginatedMatches: MatchRecord[][] = PaginateArray(matches);

    const changePage = (number: any) => {
        if (
            selectedPage + number !== -1 &&
            selectedPage + number <= paginatedMatches.length - 1
        ) {
            setSelectedPage((prev) => prev + number);
        }
    };

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
                                        <Link to={`/profile/${opponent.intraID}`}>
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
