import styled from "styled-components";

import {
    backgroundColor,
    darkTextColor,
    lightTextColor,
    mainColor,
    smallRadius
} from "../../utils/StylingConstants";

const Container = styled.div`
    border-radius: ${smallRadius};
    overflow: hidden;

    .title {
        padding: 18px 36px;
        background-color: ${mainColor};
        margin-bottom: 36px;
        border-radius: ${smallRadius};

        h3 {
            color: ${lightTextColor};
            font-weight: 500;
            margin-bottom: 0;
        }
    }

    .list {
        list-style: none;
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

export { Container, DirectMessageEntry };
