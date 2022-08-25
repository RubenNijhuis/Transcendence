import styled from "styled-components";
import {
    largeRadius,
    lightTextColor,
    magicNum,
    mainColor,
    mediumRadius
} from "../../utils/StylingConstants";

const Container = styled.div`
    .stats {
        position: relative;
        z-index: 100;
        width: fit-content;
        margin: auto;
        margin-bottom: calc(${magicNum} * -0.5);
        min-height: calc(${magicNum} * 2);
        display: flex;
        gap: 72px;
        padding: 36px 72px;
        flex-direction: row;
        justify-content: space-evenly;
        border-radius: ${largeRadius};
        background-color: ${mainColor};
        box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
        min-width: 75%;
        transform: translateY(-50%);

        .item {
            .heading {
                color: rgba(255, 255, 255, 0.75);
                text-align: center;
                font-size: 24px;
                margin-bottom: calc(${magicNum} / 6);
            }

            span {
                font-weight: 600;
                font-size: 30px;
                text-align: center;
                display: block;
                width: 100%;
                color: ${lightTextColor};
            }

            .color {
                margin: auto;
            }
        }
    }
`;

export { Container };
