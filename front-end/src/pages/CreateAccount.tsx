// React
import { useEffect, useState } from "react";

// Styling
import styled from "styled-components";
import { magicNum, smallRadius } from "../styles/StylingConstants";

// UI
import Button from "../components/Button";
import Heading from "../components/Heading";
import Layout from "../components/Layout";

// Auth
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import createUser from "../proxies/user/createUser";

// Types
import { RequestError } from "../types/request";
import { Profile } from "../types/profile";

// Page routes
import PageRoutes from "../config/PageRoutes";

// Error modal
import { useModal } from "../contexts/ModalContext";

// TODO: put styling in different folder
const StyledInput = styled.div`
    margin-bottom: 36px;

    label {
        display: block;
        font-size: 18px;
        font-weight: 500;
        margin-bottom: 9px;
    }

    input,
    textarea {
        width: 100%;
        border: 1px rgb(230, 230, 230);
        height: 36px;
        padding: 9px 18px;
        border-radius: ${smallRadius};
    }
`;

const CreateForm = styled.div`
    width: calc(${magicNum} * 10);
    max-width: calc(${magicNum} * 10);
    margin: auto;

    button {
        width: 100%;
    }
`;

// TODO: make component check input data before sending
const CreateAccount = () => {
    // Form input state
    const [username, setusername] = useState<string>("");
    const [color, setColor] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    // Authentication utils
    const { authToken, setUser, setLoggedIn } = useAuth();

    const { setError, setIsModalOpen } = useModal();

    // Navigating to profile page after creation
    const navigate = useNavigate();

    const handleAccountCreation = (): void => {
        const providedDetails = {
            username,
            color,
            description
        };

        /**
         * Redirects the user to the profile page
         * upon account creation.
         */
        createUser(providedDetails, authToken)
            .then((returnedUserProfile: Profile) => {
                setUser(returnedUserProfile);
                setLoggedIn(true);
                navigate(PageRoutes.profile);
            })
            .catch((err: RequestError) => {
                setError(err);
                setIsModalOpen(true);
            });
    };

    // TODO: add a guard like login guard and remove this useEffect
    useEffect(() => {
        // If the user hasn't tried to log in redirect to home
        if (authToken === null) {
            navigate("/");
        }
    }, [authToken, navigate]);

    return (
        <Layout>
            <CreateForm>
                <Heading type={1}>Create an account</Heading>
                <StyledInput>
                    <label>username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setusername(e.target.value)}
                    />
                </StyledInput>
                <StyledInput>
                    <label>Color</label>
                    <input
                        type="text"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    />
                </StyledInput>
                <StyledInput>
                    <label>Short description</label>
                    <textarea
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </StyledInput>
                <Button theme="dark" onClick={handleAccountCreation}>
                    Ja doe maar
                </Button>
            </CreateForm>
        </Layout>
    );
};

export default CreateAccount;
