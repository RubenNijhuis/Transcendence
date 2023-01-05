import styled from "styled-components";
import {
    largeRadius,
    lightTextColor,
    magicNum,
    mainColor,
    mediumRadius,
    secondaryColor,
    smallRadius,
} from "../../../styles/StylingConstants";

const Container = styled.div`
    position: relative;

    padding: calc(${magicNum} / 2);
    margin-bottom: calc(${magicNum} / 2);

    border-radius: ${mediumRadius};
    background-color: ${mainColor};

    .banner {
        height: 100%;
        aspect-ratio: 9/4;

        background-color: ${lightTextColor};
        border-radius: ${mediumRadius};
        overflow: hidden;

        &__container {
            position: relative;
        }
    }

    .profile {
        position: absolute;
        left: 50%;
        top: 50%;

        width: fit-content;

        display: flex;
        flex-direction: column;
        align-items: center;

        transform: translate(-50%, -50%);

        .crown {
            width: calc(${magicNum} * 1.5);
        }

        .img {
            width: calc(${magicNum} * 2);
            height: calc(${magicNum} * 2);
            aspect-ratio: 1/1;

            box-shadow: 0px 0px 35px 15px rgba(0, 0, 0, 0.35);
            margin-bottom: calc(${magicNum} / 8);

            border-radius: ${mediumRadius};
            border: solid 6px ${secondaryColor};

            background-color: ${secondaryColor};
            overflow: hidden;

            img {
                border-radius: inherit;
            }
        }

        .heading {
            margin-bottom: 0;
            color: ${lightTextColor};

            text-align: center;
            text-shadow: 0px 0px 4px #000000;
        }
    }

    .description {
        color: ${lightTextColor};
        max-width: calc(${magicNum} * 8);
        margin: auto;
        margin-bottom: calc(${magicNum});

        text-align: center;

        .heading {
            color: ${lightTextColor};
        }
    }
`;

export { Container };
