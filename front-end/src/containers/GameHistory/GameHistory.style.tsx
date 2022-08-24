import styled from "styled-components";
import { magicNum, smallRadius } from "../../utils/StylingConstants";

const Container = styled.div`
    background: rgba(0, 0, 0, 0.1);
    border-radius: ${smallRadius};
    padding: calc(${magicNum} / 2);

    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: ${magicNum};
`;

const MatchList = styled.div`
    display: flex;

    border-radius: ${smallRadius};

    gap: calc(${magicNum} / 4);

    flex-direction: column;
`;

const Match = styled.div<{ win: boolean }>`
    padding: calc(${magicNum} / 4);
    padding-right: calc(${magicNum} / 2);

    display: flex;
    border-radius: ${smallRadius};

    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: ${(props) =>
        props.win ? `rgba(0, 255, 0, 0.1)` : `rgba(255, 0, 0, 0.1)`};
`;

const OpponentProfile = styled.div`
    display: flex;

    flex-direction: row;
    align-items: center;

    .asset {
        width: calc(${magicNum} / 2 * 1.5);
        height: calc(${magicNum} / 2 * 1.5);
        border-radius: ${smallRadius};
        overflow: hidden;

        margin-right: calc(${magicNum} / 4);
    }

    a {
        color: black;
    }

    span {
        font-weight: 900;
    }
`;

const ScoreBoard = styled.div`
    font-weight: 900;
    font-size: calc(${magicNum} / 2);

    span {
        margin-right: calc(${magicNum} / 8);

        &:last-child {
            margin-right: 0;
        }
    }
`;

export { Container, MatchList, Match, OpponentProfile, ScoreBoard };
