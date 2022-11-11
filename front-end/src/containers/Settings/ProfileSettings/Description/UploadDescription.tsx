// Styling
import { CreateForm, StyledInput } from "./UploadDescription.style";

// Routes
import ApiRoutes from "../../../../config/ApiRoutes";

// DEBUG
import { useUser } from "../../../../contexts/UserContext";
import { API } from "../../../../proxies/instances/apiInstance";
import { useFormInput } from "../../../../components/Form/hooks";

const UploadDescription = () => {
    const description = useFormInput("");

    ////////////////////////////////////////////////////////////

    const { user } = useUser();

    ////////////////////////////////////////////////////////////

    const handleText = async (event: any) => {
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
            <button onClick={handleText}>Click</button>
        </CreateForm>
    );
};

export default UploadDescription;
