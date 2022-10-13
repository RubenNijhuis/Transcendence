import styled from "styled-components";
import { magicNum, smallRadius } from "../../../styles/StylingConstants";

const Container = styled.div`
    border-radius: ${smallRadius};
    aspect-ratio: 7/5;
    background-color: rgba(0, 0, 0, 0.2);
    max-width: 800px;

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
        display: flex;
    }
`;

const ChangeSlideButtons = styled.div`
    display: flex;
    justify-content: space-between;


    .button {
        width: 35%;
    }

`;

export { Container, ChangeSlideButtons };
