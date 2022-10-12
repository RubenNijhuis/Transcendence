import styled from "styled-components";
import { magicNum, mainColor } from "../../../styles/StylingConstants";

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: ${magicNum};
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
