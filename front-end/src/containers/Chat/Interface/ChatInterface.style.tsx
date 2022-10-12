import styled from "styled-components";
import {
    backgroundColor,
    magicNum,
    mainColor
} from "../../../styles/StylingConstants";

const Container = styled.div`
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

    margin-bottom: calc(${magicNum} / 2);
`;

const CreateChatContainer = styled.div`
    border: solid 2px ${mainColor};
    border-radius: 2px;
    background: white;

    .title {
        border-bottom: solid 2px ${mainColor};
        padding: calc(${magicNum} / 4);

        .heading {
            margin-bottom: 0;
        }
    }

    .chat-interface {
        padding: calc(${magicNum});
    }
`;

export { Container, CreateChatContainer };
