import styled from "styled-components";

import {
    magicNum,
    smallRadius,
    mainColor,
    backgroundColor,
    darkTextColor,
    lightTextColor
} from "../../utils/StylingConstants";

const StyledButton = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;

    padding: calc(${magicNum} / 4) calc(${magicNum} / 2);
    border-radius: ${smallRadius};

    color: ${(props) =>
        props.theme === "light" ? `${darkTextColor}` : `${lightTextColor}`};
    background: ${(props) =>
        props.theme === "light" ? `${lightTextColor}` : `${mainColor}`};

    border: none;

    &:hover {
        cursor: pointer;
    }
`;

export { StyledButton };
