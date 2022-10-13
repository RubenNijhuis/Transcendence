import styled from "styled-components";

import {
    lightTextColor,
    magicNum,
    mainColor,
    smallRadius
} from "../../../styles/StylingConstants";

const Container = styled.div`
    border: solid 2px ${mainColor};
    border-radius: ${smallRadius};

    .title {
        background-color: ${mainColor};
        padding: calc(${magicNum} / 4);

        h3 {
            color: ${lightTextColor};
            margin-bottom: 0;
        }
    }

    .chat-content {
        padding: calc(${magicNum} / 4);
        min-height: calc(${magicNum} * 10);
        max-height: calc(${magicNum} * 10);
        overflow: scroll;
    }
`;

export { Container };
