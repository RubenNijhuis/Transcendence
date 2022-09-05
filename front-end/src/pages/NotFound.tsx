import styled from "styled-components";

// Styling constants
import { magicNum, smallRadius } from "../utils/StylingConstants";

// Components
import Layout from "../components/Layout";
import Heading from "../components/Heading";

const GoodBye = styled.div`
    h2 {
        font-size: 40px;
        font-weight: 900;
        text-align: center;
    }

    img {
        width: clamp(${magicNum}, 100%, calc(${magicNum} * 10));
        margin: calc(${magicNum} / 2) auto;
        display: block;
        box-shadow: 0px 16px calc(${magicNum} / 2) 0px rgba(0, 0, 0, 0.2);
        border-radius: ${smallRadius};
    }
`;

const NotFound = () => {
    return (
        <Layout>
            <GoodBye>
                <Heading type={2}>Page not found :(</Heading>
                <img
                    alt="my_death"
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia1.tenor.com%2Fimages%2Ffda908ec27c4ee119e49bcf63ef86ade%2Ftenor.gif%3Fitemid%3D10478234&f=1&nofb=1"
                />
            </GoodBye>
        </Layout>
    );
};

export default NotFound;
