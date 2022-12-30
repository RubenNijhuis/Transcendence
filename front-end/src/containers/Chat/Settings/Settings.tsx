// React
import { useEffect, useState } from "react";

// UI
import Asset from "../../../components/Asset";
import Heading from "../../../components/Heading";

// Forms
import { useFormInput } from "../../../components/Form/hooks";

// Types
import * as Chat  from "../../../types/Chat";
import * as Profile from "../../../types/Profile";

// Styling
import { Container } from "./Settings.style";

///////////////////////////////////////////////////////////

interface IMemberUpdate {
    member: Profile.Instance;
    mute: {
        shouldMute: boolean;
        time: number;
    };
    ban: {
        shouldBan: boolean;
    };
    permission: {
        shouldUpdate: boolean;
    };
}

interface IChatSettings {
    chat: Chat.Group.Instance;
    user: Profile.Instance;
}

const ChatSettings = ({ chat, user }: IChatSettings): JSX.Element => {
    const [memberUpdates, setMemberUpdates] = useState<IMemberUpdate[]>([]);
    const muteTime = useFormInput("");
    const banTime = useFormInput("");

    ///////////////////////////////////////////////////////////

    const banMember = (uid: string) => {};

    const muteMember = (uid: string) => {
        console.log(muteTime.value);
    };

    const makeMemberAdmin = (uid: string) => {};

    const runMemberUpdate = () => {
        for (const update of memberUpdates) {
            console.log(update);
        }
    };

    ///////////////////////////////////////////////////////////

    useEffect(() => {
        for (const member of chat.members) {
            if (member.profile.uid !== user.uid) {
                console.log(member);
            }
        }
    }, []);

    ///////////////////////////////////////////////////////////

    return (
        <Container>
            <div className="header">
                <Heading type={2}>Chat Settings</Heading>
            </div>
            <ul className="member-list">
                {chat.members.map((item) => {
                    if (item.profile.uid === user.uid) return;

                    return (
                        <li className="member" key={item.profile.uid}>
                            <div className="profile">
                                <Asset url={item.profile.img_url} alt={item.profile.username} />
                                <span>{item.profile.username}</span>
                            </div>
                            <div className="actions">
                                <div className="ban">
                                    <button onClick={() => banMember(item.profile.uid)}>
                                        Ban
                                    </button>
                                    <input
                                        type="number"
                                        {...muteTime}
                                        placeholder="Time in minutes"
                                        min="1"
                                        max="15"
                                    />
                                </div>
                                <div className="divider" />
                                <div className="mute">
                                    <button
                                        onClick={() => muteMember(item.profile.uid)}
                                    >
                                        Mute
                                    </button>
                                    <input
                                        type="number"
                                        {...muteTime}
                                        placeholder="Time in minutes"
                                        min="1"
                                        max="15"
                                    />
                                </div>
                                <div className="divider" />
                                {chat.owner === user.uid && (
                                    <>
                                        <button
                                            onClick={() =>
                                                makeMemberAdmin(item.profile.uid)
                                            }
                                            className="admin"
                                        >
                                            Make admin
                                        </button>
                                        <div className="divider" />
                                    </>
                                )}
                                <button
                                    onClick={runMemberUpdate}
                                    className="save"
                                >
                                    Save
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </Container>
    );
};

///////////////////////////////////////////////////////////

export default ChatSettings;
