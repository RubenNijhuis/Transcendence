import styled from "styled-components";
import {
    backgroundColor,
    lightTextColor,
    magicNum,
    mainColor,
    mediumRadius,
    secondaryColor,
    smallRadius,
} from "../../styles/StylingConstants";

///////////////////////////////////////////////////////////

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

        background-color: ${mainColor};
        border-radius: ${mediumRadius};
    }

    .logo {
        color: ${lightTextColor};
        font-size: 24px;
        font-weight: 700;
        text-decoration: none;
    }

    .play-button {
        text-decoration: none;
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
            gap: calc(${magicNum} / 4);

            &-button {
                text-decoration: none;

                button {
                    height: calc(${magicNum} / 2 * 1.25);
                    padding: calc(${magicNum} / 4) calc(${magicNum} / 2);
                    border-radius: 100px;

                    color: ${lightTextColor};
                    font-weight: 700;
                    letter-spacing: 0.5px;

                    box-shadow: 0px 0px 5px 2px rgba(53, 113, 255, 0.15);
                    background-color: rgb(53, 113, 255);
                    background-color: linear-gradient(
                        45deg,
                        rgba(51, 112, 252, 1) 0%,
                        rgba(34, 96, 255, 1) 100%
                    );
                }
            }

            .settings-icon {
                color: ${lightTextColor};

                &:link {
                    color: ${lightTextColor};
                }

                &:visited {
                    color: ${lightTextColor};
                }

                &:active {
                    color: ${lightTextColor};
                }
            }
        }
    }
`;

const ProfileIconContainer = styled.div`
    width: calc(${magicNum} / 2 * 1.5);
    height: calc(${magicNum} / 2 * 1.5);

    border: solid ${secondaryColor} 2px;
    border-radius: ${smallRadius};
    overflow: hidden;

    .asset {
        width: 100%;
        height: 100%;
    }
`;

const NavLinksContainer = styled.ul`
    display: flex;
    list-style-type: none;

    li {
        margin-right: calc(${magicNum} / 6);

        a {
            position: relative;
            color: ${lightTextColor};
            font-size: 18px;
            font-weight: 600;
            text-decoration: none;

            &::before,
            &:after {
                content: "";
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 2px;
                border-radius: 100px;
                background: ${mainColor};
            }

            &:after {
                transition: width 300ms ease-in-out;
                transition-delay: 0.1s;
                width: 0%;
                background: ${backgroundColor};
            }

            &:hover {
                &:after {
                    width: 100%;
                }
            }

            &:visited {
                color: ${lightTextColor};
            }

            &:last {
                margin-right: none;
            }
        }
    }
`;

///////////////////////////////////////////////////////////

export { Container, ProfileIconContainer, NavLinksContainer };
