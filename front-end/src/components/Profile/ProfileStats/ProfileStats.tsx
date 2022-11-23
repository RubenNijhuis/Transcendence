// Types
import { Match, Profile } from "../../../types";

// UI
import Heading from "../../Heading";

// Styling
import { Container } from "./ProfileStats.style";

///////////////////////////////////////////////////////////

interface IProfileStats {
    player: Profile.Instance;
    matches: Match.Record[];
}

const ProfileStats = ({ player, matches }: IProfileStats): JSX.Element => {
    return (
        <Container>
            <div className="stats">
                <div className="item">
                    <Heading type={3}>Rank</Heading>
                    <span>{player.rank}</span>
                </div>
                <div className="item">
                    <Heading type={3}>Games played</Heading>
                    <span>{player.losses + player.wins}</span>
                </div>
                <div className="item">
                    <Heading type={3}>Color</Heading>
                    <div
                        className="color"
                        style={{
                            width: 36,
                            height: 36,
                            backgroundColor: player.color
                        }}
                    />
                </div>
                <div className="item">
                    <Heading type={3}>Friends</Heading>
                    {/* <span>{player.friends.length}</span> */}
                </div>
            </div>
        </Container>
    );
};

///////////////////////////////////////////////////////////

export default ProfileStats;
