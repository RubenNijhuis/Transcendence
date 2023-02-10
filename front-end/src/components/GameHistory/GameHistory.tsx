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
import * as Game from "../../types/Game";
import * as Profile from "../../types/Profile";
import * as Match from "../../types/Match";

// UI
import Heading from "../Heading";
import Asset from "../Asset";
import Button from "../Button";

// Utils
import { paginateArray } from "../../utils/array";

////////////////////////////////////////////////////////////

interface IMatchList {
    matches: Match.Record[];
}

const MatchList = ({ matches }: IMatchList) => {
    return (
        <ul>
            {matches.map(({ playerOne, playerTwo, scoreOne, scoreTwo }, count) => (
                <MatchItem key={count}>
                    <OpponentProfile>
                        <Asset url={playerOne.img_url} alt="playerOne" />
                        <Link to={`/profile/${playerOne.username}`}>
                            <span>{playerOne.username}</span>
                        </Link>
                    </OpponentProfile>
                    <ScoreBoard>
                        <div>
                            <span>{scoreOne}</span>
                            <span>—</span>
                            <span>{scoreTwo}</span>
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
    const [matchesPage, setMatchesPage] = useState<Match.Record[]>([]);

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
        console.log(matches, matchesPage);
    }, [setMatchesPage, matches]);

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
