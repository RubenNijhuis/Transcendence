import styled from "styled-components";
import { magicNum, smallRadius } from "../../utils/StylingConstants";

const Container = styled.div`
    padding-top: calc(${magicNum} / 2);

    .bar {
        width: calc(100% - ${magicNum});
        margin: auto;
        padding: calc(${magicNum} / 4) calc(${magicNum} / 2);

        color: white;
        background: rgb(30, 30, 30);
        border-radius: ${smallRadius};
    }

    .logo {
        color: white;
        font-size: 24px;
        font-weight: 700;
        text-decoration: none;
    }

    .login-button {
        text-decoration: none;
        justify-self: flex-end;

        button {
            padding: calc(${magicNum} / 4) calc(${magicNum} / 2 * 1.5);
            height: 72px;
        }
    }

    .content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100%;

        .cta {
            display: flex;
            flex-direction: row;
            gap: 18px;
        }

        ul {
            display: flex;
            list-style-type: none;

            li {
                margin-right: calc(${magicNum} / 8);

                a {
                    color: white;
                    text-decoration: none;
                    &:visited {
                        color: white;
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
    width: 72px;
    height: 72px;

    border: solid white 2px;
    border-radius: 6px;
    overflow: hidden;

    .asset {
        width: 100%;
        height: 100%;
    }
`;

export { Container, ProfileIconContainer };
