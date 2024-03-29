// Styled components
import styled from "styled-components";

// Styling vars
import {
    darkTextColor,
    magicNum,
    mainColor
} from "../../../styles/StylingConstants";

////////////////////////////////////////////////////////////

const Container = styled.div<{ fromUser: boolean }>`
    a {
        text-decoration: none;
        color: ${darkTextColor};
        &:visited {
            color: ${darkTextColor};
        }
        display: flex;
        flex-direction: row;
        justify-content: ${({ fromUser }) => (fromUser ? `end` : `start`)};
        align-items: center;

        gap: calc(${magicNum} / 8);
        padding-left: calc(${magicNum} / 16);
        width: fit-content;
    }

    .img {
        border-radius: 4px;
        overflow: hidden;

        border: solid 2px ${mainColor};

        max-height: calc(${magicNum} / 2);
        max-width: calc(${magicNum} / 2);
        min-height: calc(${magicNum} / 2);
        min-width: calc(${magicNum} / 2);
        width: calc(${magicNum} / 2);
        height: calc(${magicNum} / 2);
    }
`;

////////////////////////////////////////////////////////////

export { Container };
