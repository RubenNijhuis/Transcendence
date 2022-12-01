// Styling
import { CreateForm, StyledInput } from "./ChangeBanStatus.style";

// DEBUG
import { MutableRefObject, useRef} from "react";
import { useUser } from "../../../../contexts/UserContext";
import { IsBlock } from "../../../../proxies/settings/IsBlock"
import { Block } from "../../../../proxies/settings/Block"
import { UnBlock } from "../../../../proxies/settings/UnBlock"



const ChangeBanStatus = () => {
	const { user } = useUser();
	const ref = useRef() as MutableRefObject<HTMLTextAreaElement>;

	const handleText = async (event: any) => {
		try {
			if (await IsBlock(user.username, ref.current.value) == false)
				await Block(user.username, ref.current.value);
			else
				await UnBlock(user.username, ref.current.value);
		} catch (err) {
			return Promise.reject(err);
		}

	};

    return (
        <CreateForm>
                    <StyledInput>
                        <label>Block/Unblock user</label>
                        {/* {error && <ErrorMessage message={error} />} */}
                        <textarea ref={ref} />
                    </StyledInput>
					<button onClick={handleText}>Click</button>
        </CreateForm>
    );
}

export default ChangeBanStatus;
