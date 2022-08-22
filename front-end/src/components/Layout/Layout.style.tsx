import styled from "styled-components";
import { magicNum } from "../../utils/StylingConstants";

const Container = styled.div`
    background: rgba(235, 235, 235, 0.9);
    position: relative;
`;

const Content = styled.main`
    padding: calc(${magicNum} / 2);
`;

export { Container, Content };
