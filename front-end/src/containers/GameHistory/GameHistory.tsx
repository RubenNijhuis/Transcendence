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

// Components
import Heading from "../../components/Heading";
import type { Profile, MatchRecord } from "../../utils/GlobalTypes";
import { capitalizeString } from "../../utils/StringManipulation";

interface Props {
    player: Profile;
    matches: MatchRecord[];
}

const GameHistory = ({ player, matches }: Props) => (
    <Container>
        <div className="left-col">
            <Heading type={2}>Player statistics</Heading>
            <p>Rank: {player.ranking}</p>
            <p>Streak: 2</p>
            <p>Wins: 100</p>
            <p>Losses: 10</p>
        </div>
        <div className="right-col">
            <Heading type={2}>History</Heading>

            <MatchList>
                {matches.map(({ opponent, score }, count) => (
                    <Match key={count} win={score.opponent < score.self}>
                        <OpponentProfile>
                            <img src={opponent.img_url} alt="opponent" />
                            <Link to={`/profile/${opponent.user_id}`}>
                                <span>{opponent.username}</span>
                            </Link>
                        </OpponentProfile>
                        <ScoreBoard>
                            <div>
                                <span>
                                    {capitalizeString(opponent.username)} -{" "}
                                    {score.opponent}
                                </span>
                            </div>
                            <div>
                                <span>
                                    {capitalizeString(player.username)} -{" "}
                                    {score.self}
                                </span>
                            </div>
                        </ScoreBoard>
                    </Match>
                ))}
            </MatchList>
        </div>
    </Container>
);

export default GameHistory;
