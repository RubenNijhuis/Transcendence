import styled from "styled-components";
import {
    backgroundColor,
    lightTextColor,
    magicNum,
    mainColor,
    smallRadius
} from "../../../styles/StylingConstants";

///////////////////////////////////////////////////////////

const Container = styled.div`
    margin-bottom: calc(${magicNum} / 2);

    .button {
        width: 100%;
        height: calc(${magicNum});
        border: solid 5px ${mainColor};
        font-size: 22px;

        .heading {
            color: white;
            margin-bottom: 0;
            font-weight: 500;
        }
    }
`;

const CreateChatContainer = styled.div`
    border: solid 2px ${mainColor};
    border-radius: ${smallRadius};
    background-color: ${backgroundColor};
    box-shadow: 0px 15px 25px 5px rgba(0, 0, 0, 0.14);

    min-width: calc(${magicNum} * 12);
    min-height: calc(${magicNum} * 10);

    .title {
        border-bottom: solid 2px ${mainColor};
        padding: calc(${magicNum} / 2);
        padding-right: calc(${magicNum} / 8 * 4.5);
        display: flex;
        align-items: center;
        justify-content: space-between;

        .heading {
            margin-bottom: 0;
        }

        .close-button {
            border: solid 3px ${mainColor};
            border-radius: 1000px;
            width: calc(${magicNum} / 4 * 3);
            height: calc(${magicNum} / 4 * 3);

            svg {
                width: 100%;
                height: 100%;
            }
        }
    }

    .chat-interface {
        padding: calc(${magicNum} / 2);
    }

    .button {
        font-size: 22px;
        display: block;
        width: 75%;
        margin: auto;
    }
`;

const CreateGroupChatContainer = styled.div`
    margin-bottom: calc(${magicNum} / 2);

    .group-name {
        .heading {
            margin-bottom: calc(${magicNum} / 4);
        }

        input {
            border: solid 2px ${mainColor};
            border-radius: ${smallRadius};
            width: 100%;
            height: calc(${magicNum} / 4 * 3);
            padding: calc(${magicNum} / 4);
        }
    }

    .divider {
        border: solid 1px ${mainColor};
        border-radius: 100px;
        margin: calc(${magicNum} / 2) 0;
    }

    .select-friends {
        margin-bottom: 10px;

        .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: calc(${magicNum} / 4);

            .heading {
                margin-bottom: 0;
                display: inline-block;
            }

            .search-bar {
                display: flex;
                align-items: center;
                border-radius: ${smallRadius};
                border: solid 2px ${mainColor};
                background-color: white;
                width: 60%;

                .icon {
                    display: inline-block;
                    border-right: solid 2px ${mainColor};
                    width: calc(${magicNum});
                    height: calc(${magicNum} / 2);
                }

                input {
                    display: inline-block;
                    border: none;
                    border-radius: 0 ${smallRadius} ${smallRadius} 0;
                    height: calc(${magicNum} / 4 * 3);
                    padding: calc(${magicNum} / 4);
                    width: 100%;
                }
            }
        }

        &__list {
            border: solid 2px ${mainColor};
            border-radius: ${smallRadius};
            max-height: calc(${magicNum} * 6);
            overflow-y: scroll;
            max-width: calc(${magicNum} * 10);
            margin: auto;

            .item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: calc(${magicNum});

                padding-right: calc(${magicNum} / 4);

                &:last-child {
                    border-bottom: none;
                }

                &.selected {
                    background-color: ${mainColor};
                    color: ${lightTextColor};
                }

                .asset {
                    display: inline-block;
                    width: calc(${magicNum});
                    height: calc(${magicNum});
                }

                .check-box {
                    width: calc(${magicNum} / 4 * 3);
                    height: calc(${magicNum} / 4 * 3);
                    border-radius: ${smallRadius};
                    outline: none;
                    box-shadow: 0 0 0 2px ${mainColor};
                }
            }
        }
    }
`;

///////////////////////////////////////////////////////////

export { Container, CreateChatContainer, CreateGroupChatContainer };
