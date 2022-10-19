import styled from "styled-components";

import {
    backgroundColor,
    darkTextColor,
    magicNum,
    mainColor,
    smallRadius
} from "../../../styles/StylingConstants";

const PodiumContainer = styled.div`
    border: solid 2px red;
`;

const PodiumPosition = styled.div<{ pos: number }>`
    border: solid 2px blue;
`;

export { PodiumPosition, PodiumContainer };
