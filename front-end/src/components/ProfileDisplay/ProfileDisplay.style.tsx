import styled from "styled-components";
import {
    backgroundColor,
    darkTextColor,
    largeRadius,
    lightTextColor,
    magicNum,
    mainColor,
    mediumRadius,
    smallRadius
} from "../../utils/StylingConstants";

const Container = styled.div`
    background-color: ${mainColor};
    padding: 36px;
    padding-bottom: 0;
    border-radius: ${largeRadius};
    position: relative;

    .banner {
        width: 100%;
        aspect-ratio: 9/4;
        .asset {
            border-radius: ${mediumRadius};
            overflow: hidden;
            width: 100%;
            height: 100%;
        }
    }

    .profile {
        position: absolute;
        left: 50%;
        top: 50%;

        transform: translate(-50%, -50%);

        width: fit-content;

        .asset {
            aspect-ratio: 1/1;
            width: calc(${magicNum} * 2);
            height: calc(${magicNum} * 2);
            border-radius: ${smallRadius};

            border-radius: ${smallRadius};
            overflow: hidden;

            margin-bottom: calc(${magicNum} / 8);
            background-color: ${mainColor};

            border: solid 6px #9d653d;
        }

        .heading {
            margin-bottom: 0;
            text-align: center;
            color: ${lightTextColor};

            text-shadow: 0px 0px 4px #000000;
        }
    }
`;

export { Container };
