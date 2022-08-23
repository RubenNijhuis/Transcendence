import styled from "styled-components";
import { magicNum, smallRadius } from "../../utils/StylingConstants";

const StyledButton = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;

    padding: calc(${magicNum} / 4) calc(${magicNum} / 2);
    border-radius: ${smallRadius};

    color: ${(props) => (props.theme === "light" ? "#1e1e1e" : "#cdcdcd")};
    background: ${(props) => (props.theme === "light" ? "#cdcdcd" : "#1e1e1e")};

    border: none;

    &:hover {
        cursor: pointer;
    }
`;

export { StyledButton };
