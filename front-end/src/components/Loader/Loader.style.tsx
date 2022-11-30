import styled from "styled-components";
import {
    backgroundColor,
    magicNum,
    mainColor,
} from "../../styles/StylingConstants";

///////////////////////////////////////////////////////////

const LoaderContainer = styled.div`
    width: 100%;
    height: 100%;
`;

const LoaderLine = styled.div`
    width: 50%;
    height: calc(${magicNum} / 8);
    margin: auto;
    border-radius: 100px;
    position: relative;
    background-color: ${backgroundColor};
    overflow: hidden;

    @keyframes minToMaxWidth {
        from {
            width: 0%;
        }

        to {
            width: 100%;
        }
    }

    &:before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;

        height: calc(${magicNum} / 8);
        width: 0%;
        max-width: 100%;
        border-radius: 100px;

        background-color: ${mainColor};

        animation-name: minToMaxWidth;
        animation-duration: 3s;
        transition-timing-function: cubic-bezier(0.34, 0.75, 0.38, 0.99);
        animation-fill-mode: forwards;
    }
`;

///////////////////////////////////////////////////////////

export { LoaderContainer, LoaderLine };
