// Styling
import { EntryList, Entry, ProfileData, GameData } from "./RankingList.style";

// Types
import { Profile } from "../../../types";

// Routing
import { Link } from "react-router-dom";
import Asset from "../../../components/Asset";
import PageRoutes from "../../../config/PageRoutes";

////////////////////////////////////////////////////////////

interface IRankEntry {
    profile: Profile.Instance;
}

const RankEntry = ({ profile }: IRankEntry) => {
    const { rank, img_url, username, wins } = profile;

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
                <span>Elo: 100</span>
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

    ////////////////////////////////////////////////////////////

    return (
        <EntryList>
            {filteredRankingList.map((profile) => (
                <RankEntry profile={profile} key={profile.uid} />
            ))}
        </EntryList>
    );
};

////////////////////////////////////////////////////////////

export default RankingList;
