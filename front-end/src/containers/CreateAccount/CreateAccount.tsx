// UI
import Button from "../../components/Button";
import Heading from "../../components/Heading";

// Styling
import { CreateForm, StyledError, StyledInput } from "./CreateAccount.style";

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
    const color = useFormInput("");
    const description = useFormInput("");

    const [error, setError] = useState<string | null>(null);

    ////////////////////////////////////////////////////////////

    const { setUser } = useUser();

    ////////////////////////////////////////////////////////////

    const sendAccountDetails = async () => {
        try {
            const user = await handleAccountCreation({
                username: username.value,
                color: color.value,
                description: description.value
            });

            setUser(user);
        } catch (err) {
            console.error(err);
        }
    };

    const slideChangeEffect = () => {
        setError("not good")
        console.log("slide change!");
    };

    ////////////////////////////////////////////////////////////

    return (
        <CreateForm>
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
                        <label>
                            Choose a Color (must be in hex form #1e1e1e)
                        </label>
                        {error && <ErrorMessage message={error} />}
                        <input type="text" {...color} />
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
        </CreateForm>
    );
};

///////////////////////////////////////////////////////////

export default CreateAccount;
