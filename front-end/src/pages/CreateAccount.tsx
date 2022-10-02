// React
import { useState } from "react";

// Styling
import styled from "styled-components";
import { magicNum, smallRadius } from "../styles/StylingConstants";

// UI
import Button from "../components/Button";
import Heading from "../components/Heading";

// Box slider
import BoxSlider from "../components/BoxSlider";
import Slide from "../components/BoxSlider/Slide/Slide";

// Auth
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import createUser from "../proxies/user/createUser";

// Page routes
import PageRoutes from "../config/PageRoutes";

// Error modal
import { useModal } from "../contexts/ModalContext";

// TODO: put styling in different folder
const StyledInput = styled.div`
    margin-bottom: 36px;
    padding: 18px;

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
    display: flex;
    flex-direction: column;
    align-items: stretch;

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
    const { setUser, setLoggedIn } = useAuth();

    const { setModalError, setIsModalOpen } = useModal();

    // Navigating to profile page after creation
    const navigate = useNavigate();

    const handleAccountCreation = () => {
        const providedDetails = {
            username,
            color,
            description
        };

        /**
         * Redirects the user to the profile page
         * upon account creation.
         */
        createUser(providedDetails)
            .then((returnedUserProfile) => {
                setUser(returnedUserProfile);
                setLoggedIn(true);
                navigate(PageRoutes.profile);
            })
            .catch((err) => {
                setModalError(err);
                setIsModalOpen(true);
            });
    };

    return (
        <CreateForm>
            <Heading type={1}>Create an account</Heading>
            <BoxSlider>
                <Slide>
                    <StyledInput>
                        <label>Set your Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setusername(e.target.value)}
                        />
                    </StyledInput>
                </Slide>
                <Slide>
                    <StyledInput>
                        <label>
                            Choose a Color (must be in hex form #1e1e1e)
                        </label>
                        <input
                            type="text"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                        />
                    </StyledInput>
                </Slide>
                <Slide>
                    <StyledInput>
                        <label>Tell something about yourself</label>
                        <textarea
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </StyledInput>
                    <Button theme="dark" onClick={handleAccountCreation}>
                        Ja doe maar
                    </Button>
                </Slide>
            </BoxSlider>
        </CreateForm>
    );
};

export default CreateAccount;
