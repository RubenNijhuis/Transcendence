import styled from "styled-components";
import { lightTextColor, magicNum, mainColor, smallRadius } from "../../../styles/StylingConstants";

const PodiumContainer = styled.div`
    display: grid;
    grid-template-columns: 2fr 3fr 2fr;
    height: calc(${magicNum} * 6);
    max-height: calc(${magicNum} * 6);

    overflow: hidden;
    gap: calc(${magicNum} / 4);

    padding-top: calc(${magicNum} * 1.5);
    margin-bottom: calc(${magicNum});
`;

const PodiumPosition = styled.div<{ pos: number }>`
    background: ${mainColor};
    border-radius: ${smallRadius} ${smallRadius} 0 0;

    display: flex;
    flex-direction: column;
    align-items: center;

    padding: calc(${magicNum} / 4);

    &:first-child {
        transform: translateY(15%);
    }

    &:last-child {
        transform: translateY(25%);
    }

    .finalist {
        transform: translateY(-50%);
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

export { PodiumPosition, PodiumContainer };
