import styled from "styled-components";
import { magicNum } from "../../../styles/StylingConstants";

const MatchMakingStatusContainer = styled.div`
    margin-bottom: calc(${magicNum} / 4);

    .heading {
        text-align: center;
    }

    .players {
        display: flex;
        justify-content: space-between;
    }
`;

const Opponent = styled.div`
.asset {
    width: 36px;
    height: 36px;
}
`;

export { MatchMakingStatusContainer, Opponent };
