import styled from "styled-components";
import { readBuilderProgram } from "typescript";

const Container = styled.div`
    max-width: 560px;
`;

const MatchList = styled.div`
    display: flex;

    border-radius: 6px;

    gap: 18px;

    flex-direction: column;
`;

const Match = styled.div<{ win: boolean }>`
    padding: 18px 36px;

    display: flex;
    border-radius: 6px;

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

    img {
        width: 56px;
        height: 56px;
        border-radius: 100px;

        margin-right: 18px;
    }

    a {
        color: black;
    }

    span {
        font-weight: 900;
    }
`;

const ScoreBoard = styled.div``;

export { Container, MatchList, Match, OpponentProfile, ScoreBoard };