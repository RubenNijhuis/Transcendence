// React
import Asset from "../../../components/Asset";
import Heading from "../../../components/Heading";

// Types
import * as Profile from "../../../types/Profile";
import * as Match from "../../../types/Match";

// Style
import {
    MatchMakingStatusContainer,
    Opponent
} from "./MatchMakingStatus.style";

////////////////////////////////////////////////////////////

interface IMatchMakingStatus {
    status: Match.Status;
    players: Profile.Instance[] | null;
}

const MatchMakingStatus = ({
    status,
    players
}: IMatchMakingStatus): JSX.Element => {
    ////////////////////////////////////////////////////////

    return (
        <MatchMakingStatusContainer>
            <Heading type={3}>Match making status</Heading>
            {players?.length === 2 ? (
                <>
                    <Opponent>
                        <Asset url={players[0].img_url} alt="a" />
                        <Heading type={4}>{players[0].username}</Heading>
                    </Opponent>
                    <Opponent>
                        <Asset url={players[1].img_url} alt="a" />
                        <Heading type={4}>{players[1].username}</Heading>
                    </Opponent>
                </>
            ) : null}
        </MatchMakingStatusContainer>
    );
};

////////////////////////////////////////////////////////////

export default MatchMakingStatus;
