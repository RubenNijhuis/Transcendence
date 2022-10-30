// Types
import { Profile } from "../../../types";

// Routing
import PageRoutes from "../../../config/PageRoutes";
import { Link } from "react-router-dom";

// Style
import { PodiumContainer, PodiumPosition } from "./Podium.style";

// UI
import Asset from "../../../components/Asset";
import Crown from "../../../components/Crown";

/////////////////////////////////////////////////////////////

interface IPodium {
    rankings: Profile.Instance[];
}

const Podium = ({ rankings }: IPodium): JSX.Element => {
    const formattedRankings: Profile.Instance[] = rankings.slice(0, 3);
    // Swap pos 1 and 2 in array
    [formattedRankings[0], formattedRankings[1]] = [
        formattedRankings[1],
        formattedRankings[0]
    ];

    ////////////////////////////////////////////////////////////

    return (
        <PodiumContainer>
            {formattedRankings.map(({ img_url, username, rank }) => (
                <PodiumPosition pos={rank} key={rank}>
                    <Link
                        to={PageRoutes.profileWithUsername(username)}
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

///////////////////////////////////////////////////////////

export default Podium;
