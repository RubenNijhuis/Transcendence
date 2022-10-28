// UI
import Button from "../../components/Button";
import Heading from "../../components/Heading";

// Styling
import { CreateForm, StyledInput } from "./CreateAccount.style";

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

////////////////////////////////////////////////////////////

interface Props {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// TODO: make component check input data before sending
const CreateAccount = ({ setModalOpen }: Props): JSX.Element => {
    const username = useFormInput("");
    const color = useFormInput("");
    const description = useFormInput("");

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
            setModalOpen(false);
        } catch (err) {
            console.error(err);
        }
    };

    ////////////////////////////////////////////////////////////

    return (
        <CreateForm>
            <Heading type={2}>Create an account</Heading>
            <BoxSlider>
                <Slide>
                    <StyledInput>
                        <label>Set your Username</label>
                        <input type="text" {...username} />
                    </StyledInput>
                </Slide>
                <Slide>
                    <StyledInput>
                        <label>Upload a profile picture</label>
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
                        <input type="text" {...color} />
                    </StyledInput>
                </Slide>
                <Slide>
                    <StyledInput>
                        <label>Tell something about yourself</label>
                        <textarea rows={4} {...description} />
                    </StyledInput>
                    <Button theme="dark" onClick={sendAccountDetails}>
                        Ja doe maar
                    </Button>
                </Slide>
            </BoxSlider>
        </CreateForm>
    );
};

///////////////////////////////////////////////////////////

export default CreateAccount;
