// Styling
import { CreateForm, StyledInput } from "./UploadProfilePicture.style";

// Business logic
import { handleImageUpload } from "../../../CreateAccount/CreateAccount.bl";

// Routes
import ApiRoutes from "../../../../config/ApiRoutes";

const UploadProfilePicture = () => {
    return (
        <CreateForm>
                    <StyledInput>
                        <label>Upload a profile picture</label>
                        {/* {error && <ErrorMessage message={error} />} */}
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
        </CreateForm>
    );
}

export default UploadProfilePicture;
