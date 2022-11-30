import styled from "styled-components";
import { lightTextColor, magicNum, mainColor } from "../../styles/StylingConstants";

export const Container = styled.div`

.settings-icon {
    user-select: none;
    color: ${lightTextColor};

    &:link {
        color: ${lightTextColor};
    }

    &:visited {
        color: ${lightTextColor};
    }

    &:active {
        color: ${lightTextColor};
    }
}
`;

export const List = styled.ul`
    position: absolute;
    list-style-type: none;
    background-color: ${mainColor};
    z-index: 999;

    li {
        padding: calc(${magicNum} / 4);

        .link {
            color: ${lightTextColor};
            text-decoration: none;
        }
    }

`;