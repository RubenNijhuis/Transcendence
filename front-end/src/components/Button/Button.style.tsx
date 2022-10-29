import styled from "styled-components";

import {
    magicNum,
    smallRadius,
    mainColor,
    darkTextColor,
    lightTextColor,
    backgroundColor
} from "../../styles/StylingConstants";

///////////////////////////////////////////////////////////

const StyledButton = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;

    padding: calc(${magicNum} / 4) calc(${magicNum} / 2);
    border-radius: ${smallRadius};

    color: ${({ theme }) =>
        theme === "light" ? darkTextColor : lightTextColor};
    background-color: ${({ theme }) =>
        theme === "light" ? backgroundColor : mainColor};

    border: ${({ theme }) =>
        theme === "light" ? `2px solid ${mainColor}` : "none"};

    &:hover {
        cursor: pointer;
    }
`;

///////////////////////////////////////////////////////////

export { StyledButton };
