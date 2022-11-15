// Styling
import styled from "styled-components";

import {
    lightTextColor,
    magicNum,
    mainColor,
    mediumRadius,
    smallRadius
} from "../../styles/StylingConstants";

////////////////////////////////////////////////////////////

const AdvancedCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: end;
    position: relative;
    height: 100%;
    aspect-ratio: 5 / 7;

    border-radius: ${mediumRadius};
    background-color: ${mainColor};
    overflow: hidden;

    .img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        .asset {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    &:hover {
        .content {
            height: 100%;

            a {
                opacity: 1;
                transform: translateY(0%);
            }

            &__container {
                transform: translateY(0%);
            }
        }
    }

    .content {
        &__container {
            max-height: fit-content;
            display: flex;
            flex-direction: column;

            transition: all 0.35s ease-in-out;

            transform: translateY(20%);
        }

        z-index: 10;
        text-align: center;
        display: flex;
        justify-content: center;
        flex-direction: column;
        padding: calc(${magicNum} / 2);
        border-radius: ${smallRadius};

        height: 35%;

        transition: all 0.35s ease-in-out;

        /* From https://css.glass */
        background-color: rgba(0, 0, 0, 0.1);
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(10px);

        h3,
        p {
            color: ${lightTextColor};
        }

        p {
            margin: auto;
            margin-bottom: calc(${magicNum} / 2);
            max-width: 36ch;
        }

        a {
            // Animation
            opacity: 0;
            transform: translateY(200%);
            transition: all 0.4s ease-in-out;

            width: fit-content;
            margin: auto;
            font-size: 18px;
            padding: 14px 32px;
            border-radius: 100px;
            text-decoration: none;
            color: ${mainColor};
            font-weight: 700;
            background-color: ${lightTextColor};
        }
    }
`;

///////////////////////////////////////////////////////////

export { AdvancedCard };
