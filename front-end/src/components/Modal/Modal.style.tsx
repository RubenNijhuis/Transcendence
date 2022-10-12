import styled from "styled-components";
import { magicNum } from "../../styles/StylingConstants";

const Container = styled.div`
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;

    z-index: 9999;
    position: fixed;
    top: 0;
    left: 0;

    padding: calc(${magicNum} * 2);
`;

const ElementContainer = styled.div``;

export { Container, ElementContainer };
