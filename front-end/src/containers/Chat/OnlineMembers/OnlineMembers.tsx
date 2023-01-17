// Types
import * as Chat from "../../../types/Chat";
import * as Profile from "../../../types/Profile";

// Style
import { OnlineMembersContainer } from "./OnlineMembers.style";

// UI
import Asset from "../../../components/Asset";
import { useUser } from "../../../contexts/UserContext";

////////////////////////////////////////////////////////////

interface IOnlineMembers {
    chatMembers: Chat.Member[];
    onlineMembers: Profile.ID[];
}

const OnlineMembers = ({ chatMembers, onlineMembers }: IOnlineMembers) => {
    const { user } = useUser();

    return (
        <OnlineMembersContainer>
            <ul>
                {chatMembers.map((member) => {
                    if (member.profile.uid === user.uid) return;
                    
                    const active = onlineMembers.find(
                        (uid) => member.profile.uid === uid
                    )
                        ? "online"
                        : "offline";
                    return (
                        <li key={member.profile.uid} className={active}>
                            <Asset url={member.profile.img_url} alt="text" />
                        </li>
                    );
                })}
            </ul>
        </OnlineMembersContainer>
    );
};

////////////////////////////////////////////////////////////

export default OnlineMembers;
