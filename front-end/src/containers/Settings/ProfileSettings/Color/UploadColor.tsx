// Styling
import { CreateForm, StyledInput } from "./UploadColor.style";

// DEBUG
import { MutableRefObject, useRef } from "react";
import { useUser } from "../../../../contexts/UserContext";
import { uploadColor } from "../../../../proxies/settings/UploadColor";
import { hexInputCheck } from "../../../../utils/inputCheck";

const UploadColor = () => {
    const { user } = useUser();
    const ref = useRef() as MutableRefObject<HTMLTextAreaElement>;

    const handleText = async (event: any) => {
        try {
            const color = ref.current.value;

            if (hexInputCheck(color) == false)
                throw "Not a valid hex value. Did you forget the #? Is your hex value 6 long?";

            await uploadColor(user.username, color);
        } catch (err) {
            return Promise.reject(err);
        }
    };

    return (
        <CreateForm>
            <StyledInput>
                <label>Change Color</label>
                {/* {error && <ErrorMessage message={error} />} */}
                <textarea ref={ref} />
            </StyledInput>
            <button onClick={handleText}>Click</button>
        </CreateForm>
    );
};

export default UploadColor;
