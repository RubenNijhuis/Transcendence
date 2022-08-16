import styled from "styled-components";
import { magicNum } from "../../utils/StylingConstants";

const Container = styled.div`
    color: white;

    padding-bottom: calc(${magicNum} / 2);

    .footer {
        display: flex;
        align-items: center;
        height: 100%;
        height: 72px;
        width: calc(100% - 72px);
        margin: auto;
        padding: calc(72px / 4);

        color: white;
        background: rgb(30,30,30);
        border-radius: 6px;

        p {
            margin-right: calc(72px / 2);
        }
    }
`;

export default Container;