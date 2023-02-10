import styled from "styled-components";
import {
    backgroundColor,
    darkTextColor,
    largeRadius,
    lightTextColor,
    magicNum,
    mainColor,
    mediumRadius,
    smallRadius,
} from "../../styles/StylingConstants";

///////////////////////////////////////////////////////////

const Container = styled.div`
    .heading {
        color: ${lightTextColor};
    }
`;

const MatchListContainer = styled.div`
    display: flex;

    border-radius: ${smallRadius};

    gap: calc(${magicNum} / 4);

    flex-direction: column;

    ul li {
        margin-bottom: calc(${magicNum} / 4);

        &:last-child {
            margin-bottom: 0;
        }
    }
`;

const MatchItem = styled.li`
    padding: calc(${magicNum} / 4);
    padding-right: calc(${magicNum} / 2);

    display: flex;
    border-radius: ${smallRadius};

    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: ${backgroundColor};
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
        color: ${darkTextColor};
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

///////////////////////////////////////////////////////////

export {
    Container,
    MatchListContainer,
    MatchItem,
    OpponentProfile,
    ScoreBoard,
};
