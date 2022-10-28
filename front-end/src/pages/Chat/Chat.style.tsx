import styled from "styled-components";
import { magicNum } from "../../styles/StylingConstants";

////////////////////////////////////////////////////////////

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: calc(${magicNum} / 2);
`;

////////////////////////////////////////////////////////////

export { Container };
