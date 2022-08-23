// Styling
import {
    EntryList,
    Entry,
    ImageContainer,
    ProfileData,
    GameData
} from "./RankingList.style";

// Types
import type { Profile } from "../../utils/GlobalTypes";

// Routing
import { Link } from "react-router-dom";

interface Props {
    rankings: Profile[];
}

const RankingList = ({ rankings }: Props) => (
    <EntryList>
        {rankings.map(
            (
                { username, rank, img_url, uid }: Profile,
                count: number
            ) => (
                <Entry key={count}>
                    <ProfileData>
                        <span>{rank}</span>
                        <ImageContainer>
                            <img src={img_url} alt={`profile of ${username}`} />
                        </ImageContainer>
                    </ProfileData>
                    <GameData>
                        <Link to={`/profile/${uid}`}>
                            <h3>{username}</h3>
                        </Link>
                        <span>Games won: 10</span>
                        <span>Highest streak: 10</span>
                    </GameData>
                </Entry>
            )
        )}
    </EntryList>
);

export default RankingList;
