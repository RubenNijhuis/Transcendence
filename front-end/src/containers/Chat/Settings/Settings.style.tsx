import styled from "styled-components";
import { magicNum, mainColor, smallRadius } from "../../../styles/StylingConstants";

///////////////////////////////////////////////////////////

const Container = styled.div`
    padding: calc(${magicNum} / 2);
    width: calc(${magicNum} * 16);
    height: calc(${magicNum} * 12);

    .header {
        border-bottom: solid 2px ${mainColor};
        margin-bottom: calc(${magicNum} / 2);

        .heading {
            margin-bottom: calc(${magicNum} / 2);
        }
    }

    .member-list {
        list-style-type: none;

        .member {
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid ${mainColor};
            padding-bottom: calc(${magicNum} / 4);
            margin-bottom: calc(${magicNum} / 4);

            .profile {
                display: flex;
                align-items: center;

                .asset {
                    margin-right: calc(${magicNum} / 8);
                    width: calc(${magicNum} / 2);
                    height: calc(${magicNum} / 2);
                    border-radius: ${smallRadius};
                }
            }

            .actions {
                display: flex;
                gap: calc(${magicNum} / 4);

                .divider {
                    width: 2px;
                    height: 100%;
                    background-color: ${mainColor};
                }

                .save {
                    background-color: #21ff21;
                }

                .mute, .ban {
                    button {
                        margin-right: calc(${magicNum} / 4);
                    }

                    input {
                        width: calc(${magicNum} * 2);
                        padding: calc(${magicNum} / 8) calc(${magicNum} / 6);
                        border-radius: ${smallRadius};
                        border: none;
                    }
                }

                button {
                    padding: calc(${magicNum} / 8) calc(${magicNum} / 6);
                    border-radius: ${smallRadius};
                    border: none;

                    &:hover {

                    }
                }
            }

        }
    }
`;

///////////////////////////////////////////////////////////

export { Container };
