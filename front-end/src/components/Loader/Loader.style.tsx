import styled from "styled-components";

const LoaderContainer = styled.div`
    width: 100%;
    height: 100%;
`;

const LoaderLine = styled.div`
    width: 50%;
    height: 10px;
    margin: auto;
    border-radius: 100px;
    position: relative;
    background: rgba(0, 0, 0, 0.1);
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

        height: 10px;
        width: 0%;
        max-width: 100%;

        background-color: black;

        animation-name: minToMaxWidth;
        animation-duration: 3s;
        transition-timing-function: cubic-bezier(0.34, 0.75, 0.38, 0.99);
        animation-fill-mode: forwards;
    }
`;

export { LoaderContainer, LoaderLine };
