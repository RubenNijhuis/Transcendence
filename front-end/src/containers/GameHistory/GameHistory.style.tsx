import styled from "styled-components";

const Container = styled.div`
    background: rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    padding: 36px;

    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 72px;
`;

const MatchList = styled.div`
    display: flex;

    border-radius: 6px;

    gap: 18px;

    flex-direction: column;
`;

const Match = styled.div<{ win: boolean }>`
    padding: 18px;
    padding-right: 36px;

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

    .asset {
        width: 56px;
        height: 56px;
        border-radius: 6px;
        overflow: hidden;

        margin-right: 18px;
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
    font-size: 36px;

    span {
        margin-right: 8px;

        &:last-child {
            margin-right: 0;
        }
    }

`;

export { Container, MatchList, Match, OpponentProfile, ScoreBoard };
