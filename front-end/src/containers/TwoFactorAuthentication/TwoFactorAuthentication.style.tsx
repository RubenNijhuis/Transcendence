import styled from "styled-components";
import { magicNum } from "../../styles/StylingConstants";

////////////////////////////////////////////////////////////

const Container = styled.section`
    .button {
        margin-bottom: calc(${magicNum} / 4);
    }
`;

const QrCodeContainer = styled.div`
    .asset {
        width: calc(${magicNum} * 3);
        height: calc(${magicNum} * 3);

        max-width: calc(${magicNum} * 10);
        margin-bottom: calc(${magicNum} / 4);
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }
`;

////////////////////////////////////////////////////////////

export { Container, QrCodeContainer };
