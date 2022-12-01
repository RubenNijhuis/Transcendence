import styled from "styled-components";
import { magicNum } from "../../../../styles/StylingConstants";

////////////////////////////////////////////////////////////

const Container = styled.section`
    .button {
        margin: calc(${magicNum} / 4);
    }
    width: calc(${magicNum} * 8);
    max-width: calc(${magicNum} * 10);
    display: flex;
    flex-direction: column;
    align-items: stretch;

`;

////////////////////////////////////////////////////////////

export { Container };
