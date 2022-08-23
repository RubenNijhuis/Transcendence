import styled from "styled-components";
import { magicNum } from "../../utils/StylingConstants";

const Container = styled.div`
    background: rgba(235, 235, 235, 0.9);
    position: relative;
    height: 100%;

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
