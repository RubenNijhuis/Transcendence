import styled from "styled-components";

import {
    backgroundColor,
    darkTextColor,
    lightTextColor,
    magicNum,
    mainColor,
    smallRadius
} from "../../../styles/StylingConstants";

////////////////////////////////////////////////////////////

const Container = styled.div`
    border-radius: ${smallRadius};
    overflow: hidden;
    max-width: 100%;

    .divider {
        height: 100%;
        background-color: black;
        width: 2px;
    }
`;

const DirectMessageEntry = styled.li<{ active: boolean }>`
    padding: calc(${magicNum} / 4) calc(${magicNum} / 2);

    border-bottom: 2px solid ${mainColor};

    &:last-child {
        border-bottom: 0;
    }

    background-color: ${({ active }) => (active ? mainColor : backgroundColor)};

    .heading {
        margin-bottom: calc(${magicNum} / 4);
        color: ${({ active }) => (active ? backgroundColor : mainColor)};
    }

    ul {
        display: flex;
        align-items: center;
        list-style-type: none;
        overflow-x: scroll;
        .profile {
            .asset {
                margin-right: calc(${magicNum} / 4);
                width: calc(${magicNum} / 4 * 3);
                height: calc(${magicNum} / 4 * 3);
                border-radius: 6px;
            }
        }
    }
`;

const ChatTypeSelectorContainer = styled.div`
    display: flex;
    justify-content: space-between;
    border: solid 2px ${mainColor};
    margin-bottom: calc(${magicNum} / 2);
    border-radius: ${smallRadius};
    overflow: hidden;

    .chat-type {
        width: 50%;
        padding: calc(${magicNum} / 4);
        display: flex;
        align-items: center;
        justify-content: center;

        background-color: ${backgroundColor};

        .heading {
            color: ${darkTextColor};
        }

        &.active {
            .heading {
                color: ${lightTextColor};
            }
            background-color: ${mainColor};
        }
    }

    h3 {
        color: ${lightTextColor};
        font-weight: 500;
        margin-bottom: 0;
    }
`;

const DirectMessageList = styled.ul`
    list-style: none;
    border: solid 2px ${mainColor};
    border-radius: ${smallRadius};
    overflow-y: scroll;
    overscroll-behavior: contain;

    max-height: calc(${magicNum} * 10);
`;

////////////////////////////////////////////////////////////

export {
    Container,
    DirectMessageEntry,
    ChatTypeSelectorContainer,
    DirectMessageList
};
