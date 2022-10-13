import styled from "styled-components";
import { magicNum } from "../../styles/StylingConstants";

const Container = styled.div`
    position: fixed;
    top: calc(${magicNum} / 4);
    left: calc(${magicNum} / 4);
    padding: 18;
    min-height: 200;
    background: "rgb(230,230,230)";
    box-shadow: "0px 5px 5px rgba(30, 30, 30, 0.23)";
    border-radius: 6;
    display: "flex";
    flex-direction: "column";
    gap: 18;
    max-width: 21;
`;

const Box = styled.div``;

export { Container, Box };
