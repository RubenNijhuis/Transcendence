// Styling
import { EntryList, Entry, ProfileData, GameData } from "./RankingList.style";

// Types
import * as Profile from "../../../types/Profile";

// Routing
import { Link } from "react-router-dom";
import Asset from "../../../components/Asset";
import PageRoutes from "../../../config/PageRoutes";

////////////////////////////////////////////////////////////

interface IRankEntry {
    profile: Profile.Instance;
    rank: number;
}

const RankEntry = ({ profile, rank }: IRankEntry) => {
    const { img_url, username, wins } = profile;

    return (
        <Entry>
            <ProfileData>
                <span>{rank}</span>
                <Asset url={img_url} alt={username} className="profile-img" />
            </ProfileData>
            <GameData>
                <Link to={PageRoutes.profileWithUsername(username)}>
                    <h3>{username}</h3>
                </Link>
                <span>Games won: {wins}</span>
                <span>Elo: {profile.elo}</span>
            </GameData>
        </Entry>
    );
};

interface IRankingList {
    rankings: Profile.Instance[];
}

const RankingList = ({ rankings }: IRankingList): JSX.Element => {
    // Remove first three because of podium
    const filteredRankingList = rankings.slice(3, rankings.length);

    ////////////////////////////////////////////////////////

    return (
        <EntryList>
            {filteredRankingList.map((profile, count) => (
                <RankEntry profile={profile} key={count} rank={count + 3}/>
            ))}
        </EntryList>
    );
};

////////////////////////////////////////////////////////////

export default RankingList;
