import styled from "styled-components";
import {
    lightTextColor,
    magicNum,
    smallRadius
} from "../../../styles/StylingConstants";

const Container = styled.div<{ followsProfile: boolean }>`
    margin: auto;
    max-width: 75%;
    margin-bottom: ${magicNum};

    display: flex;
    flex-direction: row;
    justify-content: space-around;

    padding: calc(${magicNum} / 4) calc(${magicNum} / 2);

    .status {
        display: flex;
        flex-direction: row;
        align-items: center;

        border: solid 2px white;
        border-radius: ${smallRadius};

        .header {
            padding: 18px;
            display: flex;
            justify-content: center;
            align-items: center;

            background: white;
            height: 100%;

            .heading {
                font-size: 20px;
                margin-bottom: 0;
            }
        }
    }

    button {
        height: calc(${magicNum} * 1.25);
        width: calc(${magicNum} * 3);
        padding: calc(${magicNum} / 4) calc(${magicNum} / 2);
        border-radius: ${smallRadius};

        color: ${lightTextColor};
        font-size: 20px;
        font-weight: 700;
        letter-spacing: 0.5px;

        box-shadow: 0px 0px 5px 2px rgba(53, 113, 255, 0.15);
        background: rgb(53, 113, 255);
        background: linear-gradient(
            45deg,
            rgba(51, 112, 252, 1) 0%,
            rgba(34, 96, 255, 1) 100%
        );
    }

    ${({ followsProfile }) => {
        if (!followsProfile) return;
        return `button {
                        background: none;
                        background-color: rgb(60,60,60);
                        border: solid rgb(100,100,100) white;
                        box-shadow: none;
                    }`;
    }}
`;

const ProfileStatusDisplay = styled.div<{ activity: number }>`
    height: 100%;
    width: calc(${magicNum} * 3);

    display: flex;
    justify-content: center;
    align-items: center;

    div {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: ${({ activity }) => {
            if (activity === 0) {
                return `red`;
            } else if (activity === 1) {
                return `green`;
            } else if (activity === 2) {
                return "blue";
            }
        }};
    }

    span {
        border-radius: 0px ${smallRadius} ${smallRadius} 0px;
        color: white;
        padding: calc(${magicNum} / 4);
        display: block;
    }
`;

export { Container, ProfileStatusDisplay };
