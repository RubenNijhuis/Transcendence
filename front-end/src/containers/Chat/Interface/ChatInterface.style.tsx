import styled from "styled-components";
import {
    backgroundColor,
    magicNum,
    mainColor,
    smallRadius
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
    border-radius: ${smallRadius};
    background: white;
    box-shadow: 0px 15px 25px 5px rgba(0, 0, 0, 0.14);

    min-width: calc(${magicNum} * 10);
    min-height: calc(${magicNum} * 8);

    .title {
        border-bottom: solid 2px ${mainColor};
        padding: calc(${magicNum} / 4);

        .heading {
            margin-bottom: 0;
        }
    }

    .chat-interface {
        padding: calc(${magicNum} / 4);
    }
`;

export { Container, CreateChatContainer };
