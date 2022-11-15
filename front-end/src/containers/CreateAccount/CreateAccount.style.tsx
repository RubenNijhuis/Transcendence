// Styling
import styled from "styled-components";
import {
    magicNum,
    mainColor,
    smallRadius
} from "../../styles/StylingConstants";

const StyledInput = styled.div`
    margin-bottom: calc(${magicNum} / 2);
    width: 100%;

    label {
        display: block;
        font-size: calc(${magicNum} / 4);
        font-weight: 500;
        margin-bottom: calc(${magicNum} / 8);
    }

    input,
    textarea {
        width: 100%;
        border: 1px rgb(230, 230, 230);
        height: calc(${magicNum} / 2);
        padding: calc(${magicNum} / 8) calc(${magicNum} / 4);
        border-radius: ${smallRadius};
    }
`;

const CreateAccountForm = styled.form`
    width: calc(${magicNum} * 10);
    max-width: calc(${magicNum} * 10);
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    border: solid 2px ${mainColor};
    border-radius: ${smallRadius};
    background-color: white;

    .heading {
        text-align: center;
        margin: calc(${magicNum} / 2) 0;
    }

    .slide {
        padding: calc(${magicNum} / 2);

        &:last-child {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    button {
        width: 100%;
    }
`;

const StyledError = styled.div`
    border: solid 2px red;
    background: red;
    width: 100%;

    color: black;
`;

export { StyledInput, CreateAccountForm, StyledError };
