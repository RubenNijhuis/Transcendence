// Styling
import { CreateForm, StyledInput } from "./UploadDescription.style";

// Form hooks
import { useFormInput } from "../../../../components/Form/hooks";
import { uploadDescription } from "../../../../proxies/settings/UploadDescription";

// Context
import { useUser } from "../../../../contexts/UserContext";

const UploadDescription = () => {
    const description = useFormInput("");

    ////////////////////////////////////////////////////////////

    const { user } = useUser();

    ////////////////////////////////////////////////////////////

    const updateDescription = async (event: any) => {
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
            <button onClick={updateDescription}>Click</button>
        </CreateForm>
    );
};

export default UploadDescription;
