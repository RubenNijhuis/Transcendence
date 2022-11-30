import styled from "styled-components";
import {
    lightTextColor,
    magicNum,
    mainColor,
    smallRadius,
} from "../../../styles/StylingConstants";

///////////////////////////////////////////////////////////

const PodiumContainer = styled.div`
    display: grid;
    grid-template-columns: 2fr 3fr 2fr;
    height: calc(${magicNum} * 7);
    max-height: calc(${magicNum} * 6);

    overflow: hidden;
    gap: calc(${magicNum} / 4);

    padding-top: calc(${magicNum} * 2);
    margin-bottom: calc(${magicNum});
`;

const PodiumPosition = styled.div<{ pos: number }>`
    background-color: ${mainColor};
    border-radius: ${smallRadius} ${smallRadius} 0 0;

    display: flex;
    flex-direction: column;
    align-items: center;

    padding: calc(${magicNum} / 4);

    &:first-child {
        transform: translateY(25%);
    }

    &:last-child {
        transform: translateY(45%);
    }

    .finalist {
        transform: translateY(-57.5%);
        display: flex;
        flex-direction: column;
        align-items: center;

        color: ${lightTextColor};
        text-decoration: none;
        font-size: 24px;
        font-weight: bold;

        .crown {
            height: calc(${magicNum});
            width: calc(${magicNum});
            margin-bottom: calc(${magicNum} / 4 * -1);
            z-index: 100;
        }

        .profile-img {
            height: calc(${magicNum} * 2);
            width: calc(${magicNum} * 2);
            border-radius: ${smallRadius};
            margin-bottom: calc(${magicNum} / 4);
        }
    }
`;

///////////////////////////////////////////////////////////

export { PodiumPosition, PodiumContainer };
