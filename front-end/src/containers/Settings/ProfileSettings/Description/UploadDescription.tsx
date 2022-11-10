// Styling
import { CreateForm, StyledInput } from "./UploadDescription.style";

// Routes
import ApiRoutes from "../../../../config/ApiRoutes";

// DEBUG
import { MutableRefObject, useRef} from "react";
import { useUser } from "../../../../contexts/UserContext";
import { API } from "../../../../proxies/instances/apiInstance";


const UploadDescription = () => {
	const { user } = useUser();
	const ref = useRef() as MutableRefObject<HTMLTextAreaElement>;

	const handleText = async (event: any) => {
		try {
			const route = ApiRoutes.updateDescription(); //moet dit als een aparte proxie of mag ook zo?
			const username = user.username;
			const description = ref.current.value;
			const config = {
				username,
				description
			}
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
                        <textarea ref={ref} />
                    </StyledInput>
					<button onClick={handleText}>Click</button>
        </CreateForm>
    );
}

export default UploadDescription;
