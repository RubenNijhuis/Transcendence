// UI
import NavBar from "../../components/Navbar";

// Styling
import { Container } from "../../components/Layout/Layout.style";
import Footer from "../../components/Footer";

////////////////////////////////////////////////////////////

/**
 * Is wrapped around each page. Standardizes the content
 * that is always on a page
 */
const FallBackPage = (): JSX.Element => {
    return (
        <Container>
            <NavBar />
            <Footer />
        </Container>
    );
};

////////////////////////////////////////////////////////////

export default FallBackPage;
