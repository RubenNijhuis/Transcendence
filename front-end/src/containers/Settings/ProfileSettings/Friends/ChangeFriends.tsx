// Styling
import { CreateForm, StyledInput } from "./ChangeFriends.style";

// DEBUG
import { MutableRefObject, useRef} from "react";
import { useUser } from "../../../../contexts/UserContext";
import { IsFriend } from "../../../../proxies/settings/IsFriend";
import { AddFriend } from "../../../../proxies/settings/AddFriend";
import { RemoveFriend } from "../../../../proxies/settings/RemoveFriend";




const ChangeFriends = () => {
	const { user } = useUser();
	const ref = useRef() as MutableRefObject<HTMLTextAreaElement>;

	const handleText = async (event: any) => {
		try {
			if (await IsFriend(user.username, ref.current.value) == false)
				await AddFriend(user.username, ref.current.value);
			else
				await RemoveFriend(user.username, ref.current.value);
		} catch (err) {
			return Promise.reject(err);
		}

	};

    return (
        <CreateForm>
                    <StyledInput>
                        <label>Add/remove friend</label>
                        {/* {error && <ErrorMessage message={error} />} */}
                        <textarea ref={ref} />
                    </StyledInput>
					<button onClick={handleText}>Click</button>
        </CreateForm>
    );
}

export default ChangeFriends;
