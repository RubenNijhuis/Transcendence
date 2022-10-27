// UI
import Heading from "../Heading";

// Styling
import { AdvancedCard } from "./GameCard.style";

// Routing
import { Link } from "react-router-dom";
import Asset from "../Asset";

interface Props {
    img_url: string;
    title: string;
    description: string;
    url: string;
    cta: string;
}

const GameCard = ({
    img_url,
    title,
    description,
    url,
    cta
}: Props): JSX.Element => {
    return (
        <AdvancedCard>
            <div className="img">
                <Asset url={img_url} alt={`test`} />
            </div>
            <div className="content">
                <div className="content__container">
                    <Heading type={3}>{title}</Heading>
                    <p>{description}</p>
                    <Link to={`/play/${url}`}>{cta}</Link>
                </div>
            </div>
        </AdvancedCard>
    );
};
export default GameCard;
