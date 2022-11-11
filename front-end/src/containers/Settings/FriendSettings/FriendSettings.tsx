import styled from "styled-components";
import Heading from "../../../components/Heading";

// Styling
import {
    backgroundColor,
    lightTextColor,
    magicNum,
    mainColor,
    smallRadius
} from "../../../styles/StylingConstants";

// TODO: in style file
const Container = styled.section`
    background-color: ${backgroundColor};
    border: solid 2px ${mainColor};
    border-radius: ${smallRadius};
    margin-bottom: calc(${magicNum} / 2);

    .header,
    .content {
        padding: calc(${magicNum} / 2);
    }

    .header {
        background-color: ${mainColor};
        .heading {
            margin-bottom: 0;
            color: ${lightTextColor};
        }
    }
`;

const FriendSettings = () => {
    return (
        <Container>
            <div className="header">
                <Heading type={3}>Friend settings</Heading>
            </div>
            <div className="content">
                <span>Preferred site</span>
                <span>Control type</span>
            </div>
        </Container>
    );
};

export default FriendSettings;
