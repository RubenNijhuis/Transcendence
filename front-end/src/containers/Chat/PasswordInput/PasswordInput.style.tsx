import styled from "styled-components";
import {
    magicNum,
    smallRadius,
    mainColor
} from "../../../styles/StylingConstants";

const PasswordLayer = styled.div`
    position: absolute;
    top: 0;
    left: 0;

    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .error {
        border: solid 2px red;
        padding: 8px 19px;
        margin-bottom: calc(${magicNum} / 4);
        border-radius: ${smallRadius};
    }

    .heading {
        font-size: 18px;
    }

    input {
        border-radius: ${smallRadius};
        border: solid 2px ${mainColor};
        padding: 8px 19px;
        margin-bottom: calc(${magicNum} / 4);
    }
`;

export { PasswordLayer };
