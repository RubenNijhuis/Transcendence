import styled from "styled-components";
import { magicNum } from "../../../styles/StylingConstants";

const MatchMakingStatusContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: calc(${magicNum} / 4);
`;

const Opponent = styled.div``;

export { MatchMakingStatusContainer, Opponent };
