// Styling
import { CreateForm, StyledInput } from "./UploadDescription.style";

// Business logic
import { handleImageUpload } from "../../../CreateAccount/CreateAccount.bl";

// Routes
import ApiRoutes from "../../../../config/ApiRoutes";

const UploadDescription = () => {
    return (
        <CreateForm>
                    <StyledInput>
                        <label>Upload a banner picture</label>
                        {/* {error && <ErrorMessage message={error} />} */}
                        
                    </StyledInput>
        </CreateForm>
    );
}

export default UploadDescription;