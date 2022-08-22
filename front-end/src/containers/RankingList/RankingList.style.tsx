import styled from "styled-components";
import { magicNum, smallRadius } from "../../utils/StylingConstants";

const Entry = styled.li`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: calc(${magicNum} / 2);

    position: relative;

    padding: calc(${magicNum} / 2) calc(${magicNum} / 2);

    background: rgba(0, 0, 0, 0.1);

    &:after {
        content: "";
        width: calc(100% - ${magicNum});
        height: 2px;
        border: 10px;
        background-color: rgba(0, 0, 0, 0.1);
        position: absolute;
        bottom: -2px;
        left: 50%;
        transform: translate(-50%, 0);
    }

    &:last-child {
        &:after {
            content: none;
        }
    }
`;

const ProfileData = styled.div`
    display: flex;
    align-items: flex-start;
    transform: translateY(-5%);

    span {
        z-index: 10;
        font-size: 36px;
        font-weight: 900;
        text-shadow: 2px 2px #fff;
    }
    
    div {
        transform: translate(-25%, 20%);
    }
`;

const ImageContainer = styled.div`
    width: 72px;
    height: 72px;

    img {
        border-radius: 100px;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const EntryList = styled.ol`
    display: flex;
    flex-direction: column;
    border-radius: ${smallRadius};
    overflow: hidden;

    max-width: calc(${magicNum} * 10);
    margin: auto;
`;

const GameData = styled.div`
    display: flex;
    flex-direction: column;

    a {
        color: black;
    }

    h3 {
        font-size: 24px;
        margin-bottom: calc(${magicNum} / 4);
        font-weight: 900;
    }
`;

export { EntryList, Entry, ImageContainer, ProfileData, GameData };