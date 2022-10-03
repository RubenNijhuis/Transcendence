// React
import { ChangeEventHandler, useState } from "react";

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

// Proxies
import createUser from "../proxies/user/createUser";
import uploadImage from "../proxies/user/uploadImage";

// Page routes
import PageRoutes from "../config/PageRoutes";

// Error modal
import { useModal } from "../contexts/ModalContext";
import ApiRoutes from "../config/ApiRoutes";
import Logger from "../utils/Logger";

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

/**
 * Interface copied from https://stackoverflow.com/questions/43176560/property-files-does-not-exist-on-type-eventtarget-error-in-typescript
 * TODO: look it this can be simplified or not be dependent upon
 */
interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}

// TODO: make component check input data before sending
const CreateAccount = () => {
    // Form input state
    const [username, setusername] = useState<string>("");
    const [color, setColor] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const navigate = useNavigate();
    const { setUser, setLoggedIn } = useAuth();
    const { setModalError, setIsModalOpen } = useModal();

    const retrieveFileFromInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        // Select the file
        const file: File = (target.files as FileList)[0];
        const fileName: string = file.name;

        return { file, fileName };
    };

    const handleProfileImageUpload = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { file, fileName } = retrieveFileFromInput(e);
        const fd = new FormData();
        fd.append("bannerImage", file, fileName);

        uploadImage(ApiRoutes.uploadBannerImage(), fd)
            .then(console.log)
            .catch(console.error);
    };

    const handleBannerImageUpload = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { file, fileName } = retrieveFileFromInput(e);
        const fd = new FormData();
        fd.append("bannerImage", file, fileName);

        uploadImage(ApiRoutes.uploadBannerImage(), fd)
            .then(console.log)
            .catch(console.error);
    };

    const handleAccountCreation = () => {
        const providedDetails = {
            username,
            color,
            description
        };

        /**
         * Redirects the user to the profile
         * page upon account creation.
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
                        <label>Upload a profile picture</label>
                        <input
                            type="file"
                            alt="user profile"
                            onChange={handleProfileImageUpload}
                        />
                    </StyledInput>
                </Slide>
                <Slide>
                    <StyledInput>
                        <label>Upload a banner picture</label>
                        <input
                            type="file"
                            alt="user banner"
                            onChange={handleBannerImageUpload}
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
