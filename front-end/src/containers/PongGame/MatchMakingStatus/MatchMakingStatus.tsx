// React
import { useState } from "react";

// Types
import { Game } from "../../../types";

// Style
import { MatchMakingStatusContainer } from "./MatchMakingStatus.style";

////////////////////////////////////////////////////////////

const MatchMakingStatus = (): JSX.Element => {
    const [matchStatus, setMatchStatus] =
        useState<Game.MatchMakingStatus.Queue>(Game.MatchMakingStatus.Queue);

    ////////////////////////////////////////////////////////////

    return (
        <MatchMakingStatusContainer>{matchStatus}</MatchMakingStatusContainer>
    );
};

////////////////////////////////////////////////////////////

export default MatchMakingStatus;
