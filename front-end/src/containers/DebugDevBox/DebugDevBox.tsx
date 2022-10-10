// UI
import Button from "../../components/Button";
import { Container } from "../ChatInterface/ChatInterface.style";
import { Box } from "./DebugDevBox.style";

// Business logic
import {
    handleClearStorage,
    handleTokenRefresh,
    fillDBwithChats,
    fillDBwithUsers
} from "./DebugDevBox.bl";
import { useAuth } from "../../contexts/AuthContext";

const DebugDevBox = () => {
    const { user } = useAuth();

    return (
        <Container>
            <Box>
                <Button onClick={handleClearStorage}>Clear store</Button>
                <Button onClick={handleTokenRefresh}>
                    Refresh access token
                </Button>
                <hr />
                <Button onClick={() => fillDBwithChats(user)}>
                    Generate chats for user
                </Button>
                <Button onClick={fillDBwithUsers}>Generate profiles</Button>
                <hr />
                <Button onClick={() => fillDBwithChats(user)}>
                    Generate chats for user
                </Button>
                <Button onClick={fillDBwithUsers}>Generate profiles</Button>
            </Box>
        </Container>
    );
};

export default DebugDevBox;