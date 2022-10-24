import styled from "styled-components";
import { magicNum, smallRadius } from "../../../styles/StylingConstants";

const PodiumContainer = styled.div`
    display: grid;
    grid-template-columns: 2fr 3fr 2fr;
`;

const PodiumPosition = styled.div<{ pos: number }>`
    background: rgb(194, 194, 194);
    border: solid 1px blue;
    border-radius: ${smallRadius} ${smallRadius} 0 0;

    display: flex;
    flex-direction: column;
    align-items: center;

    .finalist {
        .profile-img {
            height: calc(${magicNum} * 2);
            width: calc(${magicNum} * 2);
            border-radius: ${smallRadius};
        }

        .crown {
            height: calc(${magicNum});
            width: calc(${magicNum});
        }

        &:first-child {
            /* margin-right: -100px; */
        }
    }
`;

export { PodiumPosition, PodiumContainer };
