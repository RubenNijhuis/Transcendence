import styled from "styled-components";
import { magicNum, smallRadius } from "../../styles/StylingConstants";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.45);
    position: absolute;
    top: 0;
    left: 0;
`;

const Modal = styled.div`
    border: red 2px solid;
    background-color: white;
    width: calc(${magicNum} * 12);
    height: calc(${magicNum} * 10);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: ${smallRadius};

    .heading-container {
        border-bottom: solid 2px red;
        padding: calc(${magicNum} / 2);

        .heading {
            margin-bottom: 0px;
        }
    }

    .content {
        padding: calc(${magicNum} / 2) calc(${magicNum});

        p {
            margin-bottom: calc(${magicNum} / 4);
        }

        span {
            font-weight: 900;
            display: block;
        }
    }
`;

export { Container, Modal };
