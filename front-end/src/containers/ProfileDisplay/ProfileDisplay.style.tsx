import styled from "styled-components";
import { magicNum, smallRadius } from "../../utils/StylingConstants";

const Container = styled.div`
    margin-bottom: calc(${magicNum});

    .profile {
        display: grid;

        grid-template-columns: calc(${magicNum} * 3.5) 1fr;
        column-gap: calc(${magicNum} / 2);

        .user-data {
            padding: calc(${magicNum} / 2);
            border-radius: ${smallRadius};
            width: 100%;

            background: rgba(0, 0, 0, 0.05);

            p {
                margin-bottom: calc(${magicNum} / 4);
            }
        }

        .asset {
            aspect-ratio: 1/1;
            width: calc(${magicNum} * 3.5);
            height: calc(${magicNum} * 3.5);
            border-radius: ${smallRadius};
        }
    }
`;

export { Container };
