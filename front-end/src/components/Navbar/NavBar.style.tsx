import styled from "styled-components";
import {
    lightTextColor,
    magicNum,
    mainColor,
    mediumRadius,
    smallRadius
} from "../../utils/StylingConstants";

const Container = styled.div`
    padding-top: calc(${magicNum} / 2);

    .bar {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: calc(100% - ${magicNum});
        min-height: calc(${magicNum} * 1.25);
        margin: auto;
        padding: calc(${magicNum} / 4) calc(${magicNum} / 2);

        background: ${mainColor};
        border-radius: ${mediumRadius};
    }

    .logo {
        color: ${lightTextColor};
        font-size: 24px;
        font-weight: 700;
        text-decoration: none;
    }

    .login-button {
        text-decoration: none;
        justify-self: flex-end;

        button {
            height: calc(${magicNum} / 2 * 1.25);
            padding: calc(${magicNum} / 4) calc(${magicNum} / 2);
            border-radius: 100px;

            color: ${lightTextColor};
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
    }

    .content {
        display: flex;
        align-items: center;
        width: 100%;
        justify-content: space-between;
        height: 100%;

        .cta {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: calc(${magicNum} / 2);
        }

        ul {
            display: flex;
            list-style-type: none;

            li {
                margin-right: calc(${magicNum} / 6);

                a {
                    color: ${lightTextColor};
                    font-weight: 500;
                    text-decoration: none;

                    &:visited {
                        color: ${lightTextColor};
                    }

                    &:last {
                        margin-right: none;
                    }
                }
            }
        }
    }
`;

const ProfileIconContainer = styled.div`
    width: calc(${magicNum} / 2 * 1.5);
    height: calc(${magicNum} / 2 * 1.5);

    border: solid #9d653d 2px;
    border-radius: ${smallRadius};
    overflow: hidden;

    .asset {
        width: 100%;
        height: 100%;
    }
`;

export { Container, ProfileIconContainer };
