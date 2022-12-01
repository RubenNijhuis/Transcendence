// Styling
import { CreateForm, StyledInput } from "./UploadColor.style";

// Routes
import ApiRoutes from "../../../../config/ApiRoutes";

// DEBUG
import { MutableRefObject, useEffect, useRef, useState} from "react";
import { useUser } from "../../../../contexts/UserContext";
import { API } from "../../../../proxies/instances/apiInstance";
import { ErrorResponseInterceptor } from "../../../../proxies/instances/interceptors";
import { uploadColor } from "../../../../proxies/settings/UploadColor";
import { hexInputCheck } from "../../../../utils/inputCheck";
import ColorPicker from "../../../../components/ColorPicker";

const UploadColor = () => {
	const { user } = useUser();
	const [color, setColor] = useState<string>("");

	if (color === "" && user)
		setColor(user.color)

	const handleColorPicker = async (input: string) => {
		try {
			setColor(input);
			if (hexInputCheck(input) == false)
				throw "Not a valid hex value. Did you forget the #? Is your hex value 6 long?";
			await uploadColor(user.username, input);
		}
		catch (err) {
			return Promise.reject(err);
		}
    }

    return (
        <CreateForm>
                    <StyledInput>
                        <label>Change Color</label>
                        {/* {error && <ErrorMessage message={error} />} */}
						<div>
							<ColorPicker color={color} handler={handleColorPicker} />
						</div>
                    </StyledInput>
        </CreateForm>
    );
};

export default UploadColor;
