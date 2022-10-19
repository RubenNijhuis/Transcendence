
// Crowns
import GoldCrown from "../../../assets/accesoires/gold-crown.svg";
import SilverCrown from "../../../assets/accesoires/silver-crown.svg";
import BronzeCrown from "../../../assets/accesoires/bronze-crown.svg";

// Types
import { ProfileType } from "../../../types/profile";

// Routing
import Asset from "../../../components/Asset";
import { Link } from "react-router-dom";
import PageRoutes from "../../../config/PageRoutes";
import { PodiumContainer, PodiumPosition } from "./Podium.style";

interface Props {
    rankings: ProfileType[];
}

const PositionDisplay = ({ rank }: { rank: number }): JSX.Element => {
    let src: any = GoldCrown;

    if (rank === 1) src = GoldCrown;
    else if (rank === 2) src = SilverCrown;
    else if (rank === 3) src = BronzeCrown;

    return <img src={src} alt="crown" className="crown" />;
};

const Podium = ({ rankings }: Props): JSX.Element => {
    const firstPlace = rankings[0];
    const secondPlace = rankings[1];
    const thirdPlace = rankings[2];

    return (
        <PodiumContainer>
            <PodiumPosition pos={1}>
                <div className="stage">
                    <Link to={`${PageRoutes.profileWithUserName(firstPlace.username)}`}>
                        <div className="finalist">
                            <PositionDisplay rank={1} />
                            <Asset
                                url={firstPlace.img_url}
                                alt={`winner ${firstPlace.username}`}
                            />
                            <span>{firstPlace.username}</span>
                        </div>
                    </Link>
                </div>
            </PodiumPosition>
            <PodiumPosition pos={2}>
                <div className="stage">
                    <Link to={`${PageRoutes.profileWithUserName(firstPlace.username)}`}>
                        <div className="finalist">
                            <PositionDisplay rank={1} />
                            <Asset
                                url={firstPlace.img_url}
                                alt={`winner ${firstPlace.username}`}
                            />
                            <span>{firstPlace.username}</span>
                        </div>
                    </Link>
                </div>
            </PodiumPosition>
            <PodiumPosition pos={3}>
                <div className="stage">
                    <Link to={`${PageRoutes.profileWithUserName(firstPlace.username)}`}>
                        <div className="finalist">
                            <PositionDisplay rank={1} />
                            <Asset
                                url={firstPlace.img_url}
                                alt={`winner ${firstPlace.username}`}
                            />
                            <span>{firstPlace.username}</span>
                        </div>
                    </Link>
                </div>
            </PodiumPosition>
        </PodiumContainer>
    );
};

export default Podium;
