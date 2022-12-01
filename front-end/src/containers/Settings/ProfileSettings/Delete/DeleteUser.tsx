// Styling
import { Container } from "./DeleteUser.style";

import { deleteUser } from "../../../../proxies/settings/DeleteUser";
import { useUser } from "../../../../contexts/UserContext";
import Button from "../../../../components/Button";

////////////////////////////////////////////////////////////

const DeleteUser = () => {

const { user } = useUser();

	const DeleteButton = async (event: any) => {
        try {
			await deleteUser(user.username);
		} catch (err) {
			console.error(err);
		}
    };

    return (
        <Container>
            <Button theme="dark" onClick={DeleteButton}>
            Are you sure? This action will delete your everthing in your account
            </Button>
        </Container>
    );
};

export default DeleteUser;
