import styled from "styled-components";

import {
    backgroundColor,
    darkTextColor,
    magicNum,
    mainColor,
    smallRadius
} from "../../styles/StylingConstants";

const Entry = styled.li`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: calc(${magicNum} / 2);

    position: relative;

    padding: calc(${magicNum} / 2) calc(${magicNum} / 2);

    background: ${backgroundColor};

    &:after {
        content: "";
        width: calc(100% - ${magicNum});
        height: 2px;
        border: 10px;
        background-color: rgba(0, 0, 0, 0.1);
        position: absolute;
        bottom: -2px;
        left: 50%;
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
`;

const ImageContainer = styled.div`
    width: ${magicNum};
    height: ${magicNum};

    img {
        border-radius: 100px;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const EntryList = styled.ol`
    display: flex;
    flex-direction: column;
    border-radius: ${smallRadius};
    overflow: hidden;

    margin: auto;
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

export { EntryList, Entry, ImageContainer, ProfileData, GameData };
