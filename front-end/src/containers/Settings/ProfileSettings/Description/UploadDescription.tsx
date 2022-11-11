// Styling
import { CreateForm, StyledInput } from "./UploadDescription.style";

// Routes
import ApiRoutes from "../../../../config/ApiRoutes";

// DEBUG
import { useUser } from "../../../../contexts/UserContext";
import { API } from "../../../../proxies/instances/apiInstance";
import { useFormInput } from "../../../../components/Form/hooks";
import { uploadDescription } from "../../../../proxies/settings/UploadDescription";

const UploadDescription = () => {
    const description = useFormInput("");

    ////////////////////////////////////////////////////////////

    const { user } = useUser();

    ////////////////////////////////////////////////////////////

    const handleText = async (event: any) => {
        try {
            await uploadDescription(user.username, description.value);
        } catch (err) {
            return Promise.reject(err);
        }
    };

    return (
        <CreateForm>
            <StyledInput>
                <label>Change description</label>
                {/* {error && <ErrorMessage message={error} />} */}
                <textarea {...description} rows={4} />
            </StyledInput>
            <button onClick={handleText}>Click</button>
        </CreateForm>
    );
};

export default UploadDescription;
