import styled from "styled-components";

const StyledButton = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;

    padding: calc(72px / 4) calc(72px / 2);
    border-radius: 6px;

    color: ${(props) => (props.theme === "light" ? "#1e1e1e" :  "#cdcdcd")};
    background: ${(props) => (props.theme === "light" ? "#cdcdcd" : "#1e1e1e")};

    border: none;

    &:hover {
        cursor: pointer;
    }
`;

export { StyledButton };
