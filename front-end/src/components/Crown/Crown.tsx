// Crowns
import GoldCrown from "../../assets/accesoires/gold-crown.svg";
import SilverCrown from "../../assets/accesoires/silver-crown.svg";
import BronzeCrown from "../../assets/accesoires/bronze-crown.svg";

// UI
import Asset from "../Asset";

////////////////////////////////////////////////////////////

interface ICrown {
    rank: number;
}

const Crown = ({ rank }: ICrown): JSX.Element => {
    let src: any = GoldCrown;

    if (rank === 0) src = SilverCrown;
    else if (rank === 1) src = GoldCrown;
    else if (rank === 2) src = BronzeCrown;

    return <Asset url={src} alt="crown" className="crown" />;
};

export default Crown;
