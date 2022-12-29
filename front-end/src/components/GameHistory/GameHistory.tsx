// React
import { useEffect, useState } from "react";

// Style
import {
    Container,
    MatchListContainer,
    MatchItem,
    OpponentProfile,
    ScoreBoard
} from "./GameHistory.style";

// Routing
import { Link } from "react-router-dom";

// Types
import { Game, Profile } from "../../types";

// UI
import Heading from "../Heading";
import Asset from "../Asset";
import Button from "../Button";

// Utils
import { paginateArray } from "../../utils/array";
import Match from "../../types/Match";

////////////////////////////////////////////////////////////

interface IMatchList {
    matches: Match.Record[];
}

const MatchList = ({ matches }: IMatchList) => {
    return (
        <ul>
            {matches.map(({ player1, player2, score }, count) => (
                <MatchItem key={count} win={score.player1 < score.player2}>
                    <OpponentProfile>
                        <Asset url={player1.img_url} alt="player1" />
                        <Link to={`/profile/${player1.username}`}>
                            <span>{player1.username}</span>
                        </Link>
                    </OpponentProfile>
                    <ScoreBoard>
                        <div>
                            <span>{score.player1}</span>
                            <span>—</span>
                            <span>{score.player2}</span>
                        </div>
                    </ScoreBoard>
                </MatchItem>
            ))}
        </ul>
    );
};

interface IGameHistory {
    player: Profile.Instance;
    matches: Match.Record[];
}

const GameHistory = ({ player, matches }: IGameHistory): JSX.Element => {
    const [selectedPage, setSelectedPage] = useState<number>(0);
    const [matchesPage, setMatchesPage] = useState<Match.Record[]>(null!);

    ////////////////////////////////////////////////////////

    const paginatedMatches = paginateArray<Match.Record>(matches, 8);

    ////////////////////////////////////////////////////////

    const handlePageChange = (amountPageChange: number): void => {
        if (
            selectedPage + amountPageChange !== -1 &&
            selectedPage + amountPageChange <= paginatedMatches.length - 1
        ) {
            setSelectedPage((prev) => prev + amountPageChange);
            setMatchesPage(paginatedMatches[selectedPage]);
        }
    };

    ////////////////////////////////////////////////////////

    useEffect(() => {
        setMatchesPage(paginatedMatches[0]);
    }, [setMatchesPage]);

    ////////////////////////////////////////////////////////

    return (
        <Container>
            <Heading type={3}>History</Heading>
            <MatchListContainer>
                <div>
                    <Heading type={4}>Page {selectedPage}</Heading>
                    <div>
                        <Button
                            theme="dark"
                            onClick={() => handlePageChange(-1)}
                        >
                            👈
                        </Button>
                        <Button
                            theme="dark"
                            onClick={() => handlePageChange(1)}
                        >
                            👉
                        </Button>
                    </div>
                </div>
                {matches && matchesPage && <MatchList matches={matchesPage} />}
            </MatchListContainer>
        </Container>
    );
};

////////////////////////////////////////////////////////////

export default GameHistory;
