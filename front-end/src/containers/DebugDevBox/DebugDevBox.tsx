// UI
import Button from "../../components/Button";
import { Container, Box } from "./DebugDevBox.style";

// Business logic
import {
    handleClearStorage,
    handleTokenRefresh,
    fillDBwithChats,
    fillDBwithUsers,
    makeFriends,
} from "./DebugDevBox.bl";
import { useUser } from "../../contexts/UserContext";

// UI
import Heading from "../../components/Heading";

////////////////////////////////////////////////////////////

const DebugDevBox = (): JSX.Element => {
    const { user } = useUser();

    ///////////////////////////////////////////////////////////

    return (
        <Container>
            <Box>
                <Heading type={4}>Store</Heading>
                <Button onClick={handleClearStorage}>Clear store</Button>
                <Button onClick={handleTokenRefresh}>
                    Refresh access token
                </Button>
                <Heading type={4}>Fake data generation</Heading>
                <Button onClick={() => fillDBwithChats(user)}>
                    Generate chats for user
                </Button>
                <Button onClick={fillDBwithUsers}>Generate profiles</Button>
                <Heading type={4}>Misc</Heading>
                <Button onClick={() => makeFriends(user)}>
                    Generate friends for user
                </Button>
            </Box>
        </Container>
    );
};

///////////////////////////////////////////////////////////

export default DebugDevBox;
