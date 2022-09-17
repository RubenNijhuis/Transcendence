// Styling
import {
    EntryList,
    Entry,
    ImageContainer,
    ProfileData,
    GameData
} from "./RankingList.style";

// Types
import type { Profile } from "../../types/GlobalTypes";

// Routing
import { Link } from "react-router-dom";

interface Props {
    rankings: Profile[];
}

const RankingList = ({ rankings }: Props) => (
    <EntryList>
        {rankings.length > 0 &&
            rankings.map(
                (
                    { username, rank, img_url, wins }: Profile,
                    count: number
                ) => (
                    <Entry key={count}>
                        <ProfileData>
                            <span>{rank}</span>
                            <ImageContainer>
                                <img
                                    src={img_url}
                                    alt={`profile of ${username}`}
                                />
                            </ImageContainer>
                        </ProfileData>
                        <GameData>
                            <Link to={`/profile/${username}`}>
                                <h3>{username}</h3>
                            </Link>
                            <span>Games won: {wins}</span>
                            <span>Elo: 100</span>
                        </GameData>
                    </Entry>
                )
            )}
    </EntryList>
);

export default RankingList;
