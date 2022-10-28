import styled from "styled-components";
import {
    largeRadius,
    lightTextColor,
    magicNum,
    mainColor,
    mediumRadius,
    smallRadius
} from "../../../styles/StylingConstants";

const Container = styled.div`
    position: relative;

    padding: calc(${magicNum} / 2);
    padding-bottom: 0;
    margin-bottom: calc(${magicNum});
    
    border-radius: ${largeRadius};
    background-color: ${mainColor};

    .banner {
        width: 100%;
        height: 100%;
        aspect-ratio: 9/4;

        background-color: ${lightTextColor};
        border-radius: ${mediumRadius};
        overflow: hidden;

        &__container {
            position: relative;
        }

        img {
            transition: filter 0.35s ease-in-out;
            filter: blur(8px);
        }

        &:hover {
            img {
                filter: blur(0px);
            }
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

        &__img {
            width: calc(${magicNum} * 2);
            height: calc(${magicNum} * 2);
            aspect-ratio: 1/1;

            margin-bottom: calc(${magicNum} / 8);

            border-radius: ${smallRadius};
            border: solid 6px #9d653d;

            background-color: ${mainColor};
            overflow: hidden;
        }

        .heading {
            margin-bottom: 0;
            color: ${lightTextColor};

            text-align: center;
            text-shadow: 0px 0px 4px #000000;
        }
    }
`;

export { Container };
