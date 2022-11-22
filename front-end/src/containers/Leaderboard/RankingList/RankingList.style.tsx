import styled from "styled-components";

import {
    backgroundColor,
    darkTextColor,
    magicNum,
    mainColor,
    smallRadius,
} from "../../../styles/StylingConstants";

///////////////////////////////////////////////////////////

const Entry = styled.li`
    position: sticky;
    padding: calc(${magicNum} / 2) calc(${magicNum} / 2);
    top: 0;

    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: calc(${magicNum} / 2);
    width: 50%;

    border-bottom: 2px solid ${mainColor};

    background-color: ${backgroundColor};

    &:after {
        content: "";
        position: absolute;
        left: 50%;
        bottom: -2px;

        width: calc(100% - ${magicNum});
        height: 2px;

        border: 10px;
        background-color: rgba(0, 0, 0, 0.1);
        transform: translate(-50%, 0);
    }

    &:last-child {
        border-bottom: none;
        &:after {
            content: none;
        }
    }
`;

const ProfileData = styled.div`
    display: flex;
    align-items: flex-start;
    transform: translateY(-5%);

    span {
        z-index: 10;
        font-size: calc(${magicNum} / 2);
        font-weight: 900;
        text-shadow: 2px 2px rgba(255, 255, 255, 0.25);
        color: ${mainColor};
    }

    div {
        transform: translate(-25%, 20%);
    }

    .profile-img {
        border-radius: ${smallRadius};
        width: calc(${magicNum});
        height: calc(${magicNum});
    }
`;

const EntryList = styled.ol`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;

    border-radius: ${smallRadius};
`;

const GameData = styled.div`
    display: flex;
    flex-direction: column;

    a {
        color: ${darkTextColor};
    }

    h3 {
        font-size: 24px;
        margin-bottom: calc(${magicNum} / 4);
        font-weight: 900;
    }
`;

///////////////////////////////////////////////////////////

export { EntryList, Entry, ProfileData, GameData };
