import styled from "styled-components";

import {
    backgroundColor,
    darkTextColor,
    lightTextColor,
    mainColor,
    smallRadius
} from "../../../styles/StylingConstants";

const Container = styled.div`
    border-radius: ${smallRadius};
    overflow: hidden;

    .divider {
        height: 100%;
        background: black;
        width: 2px;
    }

    .list {
        list-style: none;
        border: solid 2px ${mainColor};
        border-radius: ${smallRadius};
        overflow: hidden;
    }
`;

const DirectMessageEntry = styled.li<{ active: boolean }>`
    padding: 18px 36px;

    border-bottom: 2px solid ${mainColor};

    &:last-child {
        border-bottom: 0;
    }

    background-color: ${({ active }) =>
        active ? `${mainColor}` : `${backgroundColor}`};

    .profile {
        display: flex;
        flex-direction: row;
        align-items: center;

        span {
            color: ${({ active }) =>
                active ? `${lightTextColor}` : `${darkTextColor}`};
        }

        .asset {
            margin-right: 18px;
            width: 56px;
            height: 56px;
            border-radius: 6px;
            overflow: hidden;
        }
    }
`;

const ChatTypeSelectorContainer = styled.div`
    display: flex;
    justify-content: space-between;
    border: solid 2px ${mainColor};
    margin-bottom: 36px;
    border-radius: ${smallRadius};

    // For each one if
    .chat-type {
        width: 50%;
        padding: 18px;
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

export { Container, DirectMessageEntry, ChatTypeSelectorContainer };
