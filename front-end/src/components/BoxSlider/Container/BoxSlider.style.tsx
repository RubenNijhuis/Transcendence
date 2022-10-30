import styled from "styled-components";
import { lightTextColor, magicNum, smallRadius } from "../../../styles/StylingConstants";

const Container = styled.div`
    background-color: rgba(0, 0, 0, 0.2);
    max-width: calc(${magicNum} * 12);

    .slides {
        overflow-x: hidden;
        
        // Hide scrollbar
        &::-webkit-scrollbar {
            display: none;
        }
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none;
        // Hide scrollbar

        width: 100%;
        height: 100%;
        min-height: calc(${magicNum} * 6);
        display: flex;
    }
`;

const ChangeSlideButtons = styled.div`
    display: flex;
    justify-content: space-between;
    padding: calc(${magicNum} / 4);

    background-color: ${lightTextColor};
    .button {
        width: 35%;
    }
`;

export { Container, ChangeSlideButtons };
