// Styling
import { CreateForm, StyledInput } from "./UploadBanner.style";

// Business logic
import { handleImageUpload } from "../../../CreateAccount/CreateAccount.bl";

// Routes
import ApiRoutes from "../../../../config/ApiRoutes";

const UploadBanner = () => {
    return (
        <CreateForm>
                    <StyledInput>
                        <label>Upload a banner picture</label>
                        {/* {error && <ErrorMessage message={error} />} */}
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
        </CreateForm>
    );
}

export default UploadBanner;