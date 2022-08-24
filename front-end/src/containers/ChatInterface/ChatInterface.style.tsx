import styled from 'styled-components';
import { magicNum } from '../../utils/StylingConstants';

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: ${magicNum};
`;

export { Container };