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
    background-color: ${mainColor};
    padding: calc(${magicNum} / 2);
    padding-bottom: 0;
    border-radius: ${largeRadius};
    position: relative;

    .banner {
        width: 100%;
        aspect-ratio: 9/4;

        .asset {
            img {
                transition: filter 0.35s ease-in-out;
                filter: blur(8px);
            }
            background-color: ${lightTextColor};
            border-radius: ${mediumRadius};
            overflow: hidden;
            width: 100%;
            height: 100%;
        }

        &:hover {
            .asset img {
                filter: blur(0px);
            }
        }
    }

    .profile {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: fit-content;

        .crown {
            width: calc(${magicNum} * 1.5);
        }

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
