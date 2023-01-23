// React
import Asset from "../../../components/Asset";
import Heading from "../../../components/Heading";

// Types
import * as Profile from "../../../types/Profile";
import * as Match from "../../../types/Match";

// Style
import { MatchMakingStatusContainer, Opponent } from "./MatchMakingStatus.style";

////////////////////////////////////////////////////////////

interface IMatchMakingStatus {
    status: Match.Status;
    opponent: Profile.Instance | null;
}

const MatchMakingStatus = ({
    status,
    opponent
}: IMatchMakingStatus): JSX.Element => {
    ////////////////////////////////////////////////////////

    return (
        <MatchMakingStatusContainer>
            <Heading type={3}>Match making status</Heading>
            {/* <p>{status}</p> */}
            {opponent ? (
                <Opponent>
                    <Asset url={opponent.img_url} alt="a" />
                    <Heading type={4}>{opponent.username}</Heading>
                </Opponent>
            ) : null}
        </MatchMakingStatusContainer>
    );
};

////////////////////////////////////////////////////////////

export default MatchMakingStatus;
