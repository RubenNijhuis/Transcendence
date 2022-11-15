import styled from "styled-components";
import {
    largeRadius,
    magicNum,
    mainColor
} from "../../styles/StylingConstants";

const ProfileDetailsContainer = styled.section`
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: calc(${magicNum} / 2);

    background-color: ${mainColor};
    border-radius: ${largeRadius};

    grid-template-areas: "👯‍♀️ 🎮";

    column-gap: calc(${magicNum});
`;

export { ProfileDetailsContainer };
