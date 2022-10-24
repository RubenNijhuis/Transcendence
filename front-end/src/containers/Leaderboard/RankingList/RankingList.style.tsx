import styled from "styled-components";

import {
    backgroundColor,
    darkTextColor,
    magicNum,
    mainColor,
    smallRadius
} from "../../../styles/StylingConstants";

const Entry = styled.li`
    position: relative;
    padding: calc(${magicNum} / 2) calc(${magicNum} / 2);

    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: calc(${magicNum} / 2);

    background: ${backgroundColor};

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
        border-radius: 1000px;
        width: 100%;
        height: 100%;
    }
`;

const EntryList = styled.ol`
    display: flex;
    flex-direction: column;
    margin: auto;

    overflow: hidden;
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

export { EntryList, Entry, ProfileData, GameData };
