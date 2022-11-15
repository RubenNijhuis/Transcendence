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
    }

`;

////////////////////////////////////////////////////////////

export { Container, QrCodeContainer };
