// React
import { useState } from "react";

// UI
import Button from "../../components/Button";
import Heading from "../../components/Heading";

// Styling
import { CreateForm, ErrorPopup, StyledInput } from "./CreateAccount.style";

// Box slider
import BoxSlider from "../../components/BoxSlider";
import Slide from "../../components/BoxSlider/Slide/Slide";

// Auth
import { useAuth } from "../../contexts/AuthContext";

// Proxies
import createUser from "../../proxies/user/createUser";
import uploadImage from "../../proxies/user/uploadImage";
import getProfileBannerByUserName from "../../proxies/user/getProfileBannerByUsername";

// Routes
import ApiRoutes from "../../config/ApiRoutes";

// Store
import { setItem } from "../../modules/Store";
import StoreId from "../../config/StoreId";

// DEBUG
import Logger from "../../utils/Logger";

interface Props {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// TODO: make component check input data before sending
const CreateAccount = ({ setModalOpen }: Props): JSX.Element => {
    const [username, setusername] = useState<string>("");
    const [color, setColor] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>();

    ////////////////////////////////////////////////////////////

    const { setUser, setLoggedIn } = useAuth();

    ////////////////////////////////////////////////////////////

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
        fd.append("file", file, fileName);

        uploadImage(ApiRoutes.uploadProfileImage(), fd)
            .then(console.log)
            .catch(console.log);
    };

    const handleBannerImageUpload = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { file, fileName } = retrieveFileFromInput(e);
        const fd = new FormData();
        fd.append("file", file, fileName);

        uploadImage(ApiRoutes.uploadBannerImage(), fd)
            .then(console.log)
            .catch(console.log);
    };

    const handleAccountCreation = async () => {
        const providedDetails = {
            username,
            color,
            description
        };

        /**
         * Redirects the user to the profile
         * page upon account creation.
         */
        try {
            const returnedUserProfile = await createUser(providedDetails);
            Logger(
                "DEBUG",
                "Create account modal",
                "Returned user",
                returnedUserProfile
            );

            returnedUserProfile.banner_url = await getProfileBannerByUserName(
                returnedUserProfile.username
            );
            returnedUserProfile.img_url = await getProfileBannerByUserName(
                returnedUserProfile.username
            );

            setUser(returnedUserProfile);
            setLoggedIn(true);
            setItem(StoreId.loginProcess, false);
            setModalOpen(false);
        } catch (err) {
            console.log(err);
        }
    };

    ////////////////////////////////////////////////////////////

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
                        {errorMessage && (
                            <ErrorPopup>{errorMessage}</ErrorPopup>
                        )}
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
                        {errorMessage && (
                            <ErrorPopup>{errorMessage}</ErrorPopup>
                        )}
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
