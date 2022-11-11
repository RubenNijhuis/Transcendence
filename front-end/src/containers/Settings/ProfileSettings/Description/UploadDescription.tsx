// Styling
import { CreateForm, StyledInput } from "./UploadDescription.style";

// Routes
import ApiRoutes from "../../../../config/ApiRoutes";

// API
import { API } from "../../../../proxies/instances/apiInstance";

// Form hooks
import { useFormInput } from "../../../../components/Form/hooks";

// Context
import { useUser } from "../../../../contexts/UserContext";

const UploadDescription = () => {
    const description = useFormInput("");

    ////////////////////////////////////////////////////////////

    const { user } = useUser();

    ////////////////////////////////////////////////////////////

    const updateDescription = async (event: any) => {
        try {
            const route = ApiRoutes.updateDescription(); // TODO: make proxy
            const username = user.username;

            const config = {
                username,
                description: description.value
            };

            const { data } = await API.post(route, config);

            return Promise.resolve(data);
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
