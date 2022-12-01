// UI
import Button from "../../components/Button";
import Heading from "../../components/Heading";

// Styling
import {
    CreateAccountForm,
    StyledError,
    StyledInput,
} from "./CreateAccount.style";

// Box slider
import BoxSlider from "../../components/BoxSlider";
import Slide from "../../components/BoxSlider/Slide/Slide";

// Routes
import ApiRoutes from "../../config/ApiRoutes";

// DEBUG
import { useFormInput } from "../../components/Form/hooks";

// Context
import { useUser } from "../../contexts/UserContext";

// Business logic
import { handleAccountCreation, handleImageUpload } from "./CreateAccount.bl";
import { useState } from "react";
import ColorPicker from "../../components/ColorPicker";

////////////////////////////////////////////////////////////

interface IErrorMessage {
    message: string;
}

const ErrorMessage = ({ message }: IErrorMessage) => {
    return (
        <StyledError>
            <span>{message}</span>
        </StyledError>
    );
};

// TODO: make component check input data before sending
const CreateAccount = (): JSX.Element => {
    const username = useFormInput("");
    const description = useFormInput("");

    const [color, setColor] = useState<string>("#e91e63");
    const [error, setError] = useState<string | null>(null);

    ////////////////////////////////////////////////////////////

    const { setUser } = useUser();

    ////////////////////////////////////////////////////////////

    const sendAccountDetails = async () => {
        try {
            const user = await handleAccountCreation({
                username: username.value,
                color: color,
                description: description.value
            });

            setUser(user);
        } catch (err) {
            console.error(err);
        }
    };

    const handleColorPicker = (input: string) => {
        setColor(input);
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
    };

    const slideChangeEffect = () => {
        console.log("slide change!");
    };

    ////////////////////////////////////////////////////////////

    return (
        <CreateAccountForm onSubmit={handleSubmit}>
            <Heading type={2}>Create an account</Heading>
            <BoxSlider onSlideChange={slideChangeEffect}>
                <Slide>
                    <StyledInput>
                        <label>Setup your Username</label>
                        {error && <ErrorMessage message={error} />}
                        <input type="text" {...username} />
                    </StyledInput>
                </Slide>
                <Slide>
                    <StyledInput>
                        <label>Upload a profile picture</label>
                        {error && <ErrorMessage message={error} />}
                        <input
                            type="file"
                            alt="user profile"
                            onChange={(e) =>
                                handleImageUpload(
                                    e,
                                    ApiRoutes.uploadProfileImage()
                                )
                            }
                        />
                    </StyledInput>
                </Slide>
                <Slide>
                    <StyledInput>
                        <label>Upload a banner picture</label>
                        {error && <ErrorMessage message={error} />}
                        <input
                            type="file"
                            alt="user banner"
                            onChange={(e) =>
                                handleImageUpload(
                                    e,
                                    ApiRoutes.uploadBannerImage()
                                )
                            }
                        />
                    </StyledInput>
                </Slide>
                <Slide>
                    <StyledInput>
                        <label style={{color: color}}>
                            Choose a Color
                        </label>
                        {error && <ErrorMessage message={error} />}
                        <ColorPicker color={color} handler={handleColorPicker} />
                    </StyledInput>
                </Slide>
                <Slide>
                    <StyledInput>
                        <label>Tell something about yourself</label>
                        {error && <ErrorMessage message={error} />}
                        <textarea rows={4} {...description} />
                    </StyledInput>
                </Slide>
                <Slide>
                    <Button theme="dark" onClick={sendAccountDetails}>
                        Setup your account!
                    </Button>
                </Slide>
            </BoxSlider>
        </CreateAccountForm>
    );
};

///////////////////////////////////////////////////////////

export default CreateAccount;
