import styled from "styled-components";
import { backgroundColor, darkTextColor, magicNum, mainColor, smallRadius } from "../../utils/StylingConstants";

const Container = styled.div`
    margin-bottom: calc(${magicNum} / 2);

    .profile {
        display: grid;

        grid-template-columns: calc(${magicNum} * 3.5) 1fr;
        column-gap: calc(${magicNum} / 2);

        .user-data {
            padding: calc(${magicNum} / 2);
            border-radius: ${smallRadius};
            width: 100%;

            color: ${darkTextColor};
            background: ${backgroundColor};

            p {
                margin-bottom: calc(${magicNum} / 4);
            }
        }

        .asset {
            aspect-ratio: 1/1;
            width: calc(${magicNum} * 3.5);
            height: calc(${magicNum} * 3.5);
            border-radius: ${smallRadius};

            border-radius: ${smallRadius};
            overflow: hidden;

            background-color: ${mainColor};
        }
    }
`;

export { Container };
