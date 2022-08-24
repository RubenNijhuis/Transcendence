// Components
import Heading from "../../components/Heading";
import { DirectMessage } from "../../utils/GlobalTypes";

interface Props {
    directMessages: DirectMessage[];
}

const DirectMessageList = ({ directMessages }: Props) => {
    return (
        // <Container>
            <div className="title">
                <Heading type={2}>Direct messages</Heading>
            </div>
    );
};
export default DirectMessageList;