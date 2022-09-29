import Heading from "../../components/Heading";
import { Container } from "./SuccesfulLogin.style";

const SuccesfulLogin = () => {
    return (
        <Container>
            <Heading type={1}>Logged in succesfully</Heading>
            <p className="next-step">
                You will be redirected to your profile shortly
            </p>
        </Container>
    );
};

export default SuccesfulLogin;
