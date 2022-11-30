import styled from "styled-components";

// Vars
import {
    largeRadius,
    lightTextColor,
    magicNum,
    mainColorMono,
    smallRadius,
} from "../../../styles/StylingConstants";

////////////////////////////////////////////////////////////

const Container = styled.div`
    margin-bottom: calc((${magicNum} / 4) * -1);

    .stats {
        position: relative;
        z-index: 100;
        width: fit-content;
        margin: auto;
        min-height: calc(${magicNum} * 2);
        display: flex;
        gap: calc(${magicNum});
        padding: calc(${magicNum} / 2) calc(${magicNum});
        flex-direction: row;
        justify-content: space-evenly;
        border-radius: ${largeRadius};
        background-color: ${mainColorMono};
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
                border-radius: ${smallRadius};
            }
        }
    }
`;

////////////////////////////////////////////////////////////

export { Container };
