import styled from "styled-components";

import {
    lightTextColor,
    magicNum,
    mainColor,
    smallRadius
} from "../../../styles/StylingConstants";

const Container = styled.div`
    border: solid 2px ${mainColor};
    border-radius: ${smallRadius};
    position: relative;
    display: flex;
    flex-direction: column;

    .chat-title {
        padding: calc(${magicNum} / 4);
        background-color: ${mainColor};

        display: flex;
        justify-content: space-between;

        .title {
            display: flex;
            align-items: center;
            gap: calc(${magicNum} / 4);
        }

        .heading {
            color: ${lightTextColor};
            margin-bottom: 0;
        }

        .asset {
            width: calc(${magicNum} / 2 * 1.5);
            height: calc(${magicNum} / 2 * 1.5);
            border-radius: ${smallRadius};
        }
    }

    .chat-content {
        display: flex;
        flex-direction: column-reverse;
        overscroll-behavior: contain;
        position: relative;
        padding: calc(${magicNum} / 4);
        min-height: calc(${magicNum} * 10);
        max-height: calc(${magicNum} * 10);
        overflow: scroll;
    }
`;

export { Container };
