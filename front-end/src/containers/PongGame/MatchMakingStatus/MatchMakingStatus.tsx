// React
import { useState } from "react";

// Types
import { Game, Match } from "../../../types";

// Style
import { MatchMakingStatusContainer } from "./MatchMakingStatus.style";

////////////////////////////////////////////////////////////

const MatchMakingStatus = (): JSX.Element => {
    const [matchStatus, setMatchStatus] = useState<Match.Status.Queue>(
        Match.Status.Queue
    );

    ////////////////////////////////////////////////////////////

    return (
        <MatchMakingStatusContainer>{matchStatus}</MatchMakingStatusContainer>
    );
};

////////////////////////////////////////////////////////////

export default MatchMakingStatus;
