import styled from "styled-components";

import {
    lightTextColor,
    magicNum,
    mainColor,
    smallRadius,
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
        overscroll-behavior: contain;
        position: relative;
        padding: calc(${magicNum} / 4);
        min-height: calc(${magicNum} * 10);
        max-height: calc(${magicNum} * 10);
        overflow: scroll;
    }
`;

const PasswordLayer = styled.div`
    position: absolute;
    top: 0;
    left: 0;

    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .error {
        border: solid 2px red;
        padding: 8px 19px;
        border-radius: ${smallRadius};
    }

    .heading {
        font-size: 18px;
    }

    input {
        border-radius: ${smallRadius};
        border: solid 2px ${mainColor};
        padding: 8px 19px;
        margin-bottom: calc(${magicNum} / 4);
    }
`;

export { Container, PasswordLayer };
