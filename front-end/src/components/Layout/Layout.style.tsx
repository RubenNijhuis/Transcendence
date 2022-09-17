import styled from "styled-components";
import { magicNum, secondaryColor } from "../../styles/StylingConstants";

const Container = styled.div`
    background: ${secondaryColor};
    position: relative;
    min-height: 100%;

    display: flex;
    flex-direction: column;
`;

const Content = styled.main`
    margin: 0 auto;
    width: 100%;
    max-width: calc(${magicNum} * 20);
    padding: calc(${magicNum} / 2);

    flex-grow: 2;
`;

export { Container, Content };
