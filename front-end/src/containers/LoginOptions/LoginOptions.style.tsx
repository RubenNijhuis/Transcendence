import styled from "styled-components";
import {
    magicNum,
    mainColor,
    smallRadius,
} from "../../styles/StylingConstants";

////////////////////////////////////////////////////////////

const Container = styled.section`
    .login-options-list {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: calc(${magicNum} / 2);

        margin: auto;

        width: 100%;
        max-width: calc(${magicNum} * 8);

        list-style-type: none;

        .login-option {
            aspect-ratio: 1/1;
            width: 100%;
            box-sizing: border-box;

            display: flex;
            flex-direction: column;
            align-items: center;

            .asset {
                background-color: ${mainColor};
                width: 100%;
                height: 100%;
                border-radius: ${smallRadius};
            }

            span {
                margin-top: calc(${magicNum} / 8);
                font-weight: 500;
            }

            &:hover {
                cursor: pointer;
            }
        }
    }
`;

////////////////////////////////////////////////////////////

export { Container };
