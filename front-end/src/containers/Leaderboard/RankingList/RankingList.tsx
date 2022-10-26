// Styling
import { EntryList, Entry, ProfileData, GameData } from "./RankingList.style";

// Types
import { ProfileType } from "../../../types/profile";

// Routing
import { Link } from "react-router-dom";
import Asset from "../../../components/Asset";
import PageRoutes from "../../../config/PageRoutes";

////////////////////////////////////////////////////////////

interface Props {
    rankings: ProfileType[];
}

const RankingList = ({ rankings }: Props): JSX.Element => {
    return (
        <EntryList>
            {rankings
                .slice(3, rankings.length) // Remove first three because of podium
                .map(({ username, rank, img_url, wins }) => (
                    <Entry key={rank}>
                        <ProfileData>
                            <span>{rank}</span>
                            <Asset
                                url={img_url}
                                alt={username}
                                className="profile-img"
                            />
                        </ProfileData>
                        <GameData>
                            <Link to={PageRoutes.profileWithUsername(username)}>
                                <h3>{username}</h3>
                            </Link>
                            <span>Games won: {wins}</span>
                            <span>Elo: 100</span>
                        </GameData>
                    </Entry>
                ))}
        </EntryList>
    );
};

export default RankingList;
