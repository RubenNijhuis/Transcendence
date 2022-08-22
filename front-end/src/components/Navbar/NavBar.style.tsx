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
    }

    .content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100%;

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

export default Container;
