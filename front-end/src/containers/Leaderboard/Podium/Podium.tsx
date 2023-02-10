// Types
import * as Profile from "../../../types/Profile";

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

    ////////////////////////////////////////////////////////

    return (
        <PodiumContainer>
            {formattedRankings.map(({ img_url, username, wins }, count) => (
                <PodiumPosition pos={count} key={count}>
                    <Link
                        to={PageRoutes.profileWithUsername(username)}
                        className="finalist"
                    >
                        <Crown rank={count} />
                        <Asset
                            url={img_url}
                            className="profile-img"
                            alt={`winner ${username}`}
                        />
                        <span>{username}</span>
                        <span>Wins: {wins}</span>
                    </Link>
                </PodiumPosition>
            ))}
        </PodiumContainer>
    );
};

///////////////////////////////////////////////////////////

export default Podium;
