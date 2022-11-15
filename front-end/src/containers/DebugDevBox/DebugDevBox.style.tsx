import styled from "styled-components";
import {
    backgroundColor,
    magicNum,
    mainColor,
    smallRadius
} from "../../styles/StylingConstants";

const Container = styled.div`
    position: fixed;
    top: calc(${magicNum} / 4);
    left: calc(${magicNum} / 4);
    min-height: 200;
    box-shadow: "0px 5px 5px rgba(30, 30, 30, 0.23)";
    border-radius: 6;
    display: "flex";
    flex-direction: "column";
    gap: 18;
    max-width: 21;
`;

const Box = styled.div`
    display: flex;
    flex-direction: column;
    padding: calc(${magicNum} / 4);
    border-radius: ${smallRadius};

    background-color: ${backgroundColor};

    border: solid 2px ${mainColor};

    .heading {
        font-size: 18px;
        margin-bottom: calc(${magicNum} / 4);
    }

    button {
        margin-bottom: calc(${magicNum} / 4);

        &:last-child {
            margin-bottom: 0;
        }
    }
`;

export { Container, Box };
