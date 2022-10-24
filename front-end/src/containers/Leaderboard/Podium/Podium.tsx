// Types
import { ProfileType } from "../../../types/profile";

// Routing
import PageRoutes from "../../../config/PageRoutes";
import { Link } from "react-router-dom";

// Style
import { PodiumContainer, PodiumPosition } from "./Podium.style";

// UI
import Asset from "../../../components/Asset";
import Crown from "../../../components/Crown";

/////////////////////////////////////////////////////////////

interface Props {
    rankings: ProfileType[];
}

const Podium = ({ rankings }: Props): JSX.Element => {
    const formattedRankings: ProfileType[] = rankings.slice(0, 3);
    // Swap pos 1 and 2 in array
    [formattedRankings[0], formattedRankings[1]] = [
        formattedRankings[1],
        formattedRankings[0]
    ];

    return (
        <PodiumContainer>
            {formattedRankings.map(({ img_url, username, rank }) => (
                <PodiumPosition pos={rank} key={rank}>
                    <Link
                        to={`${PageRoutes.profileWithUserName(username)}`}
                        className="finalist"
                    >
                        <Crown rank={rank} />
                        <Asset
                            url={img_url}
                            className="profile-img"
                            alt={`winner ${username}`}
                        />
                        <span>{username}</span>
                    </Link>
                </PodiumPosition>
            ))}
        </PodiumContainer>
    );
};

export default Podium;
