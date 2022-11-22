import styled from "styled-components";
import {
    lightTextColor,
    magicNum,
    smallRadius,
} from "../../styles/StylingConstants";

///////////////////////////////////////////////////////////

const Container = styled.div`
    .heading {
        color: ${lightTextColor};
    }

    .friends-list {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: auto;
        gap: calc(${magicNum} / 4);

        list-style-type: none;
    }
`;

const FriendEntryContainer = styled.li`
    a {
        display: flex;
        flex-direction: column;
        align-items: center;

        text-decoration: none;

        .friend-img {
            width: calc(${magicNum});
            height: calc(${magicNum});
            border-radius: ${smallRadius};

            margin-bottom: calc(${magicNum} / 4);
        }

        .name {
            text-align: center;
            color: ${lightTextColor};
        }
    }
`;

///////////////////////////////////////////////////////////

export { Container, FriendEntryContainer };
