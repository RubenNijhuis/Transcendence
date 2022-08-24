import styled from "styled-components";
import {
    lightTextColor,
    mainColor,
    smallRadius
} from "../../utils/StylingConstants";

const Container = styled.div`
    border: solid 2px ${mainColor};
    border-radius: ${smallRadius};

    .title {
        background-color: ${mainColor};
        padding: 18px;

        h3 {
            color: ${lightTextColor};
            margin-bottom: 0;
        }
    }

    .chat-content {
        padding: 18px;

        max-height: 720px;
        overflow: scroll;
    }
`;

export { Container };
