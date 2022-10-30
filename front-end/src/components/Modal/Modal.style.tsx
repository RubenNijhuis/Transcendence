import styled from "styled-components";
import {
    backgroundColor,
    lightTextColor,
    magicNum,
    mainColor,
    smallRadius
} from "../../styles/StylingConstants";

///////////////////////////////////////////////////////////

const Container = styled.div`
    background-color: rgba(0, 0, 0, 0.3);
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
`;

const ElementContainer = styled.div`
    position: relative;

    border-radius: ${smallRadius};
    background-color: ${backgroundColor};
`;

const CloseButtonContainer = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);

    display: flex;
    align-items: center;
    justify-content: center;

    border: solid 2px ${mainColor};
    border-radius: 100px;

    width: calc(${magicNum});
    height: calc(${magicNum});
    background-color: ${backgroundColor};

    &:hover {
        cursor: pointer;
    }
`;

///////////////////////////////////////////////////////////

export { Container, ElementContainer, CloseButtonContainer };
