// UI
import { useEffect, useState } from "react";
import Asset from "../../../components/Asset";
import { useFormInput } from "../../../components/Form/hooks";
import Heading from "../../../components/Heading";
import { Chat, Profile } from "../../../types";
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
            if (member.uid !== user.uid) {
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
                    if (item.uid === user.uid) return;

                    return (
                        <li className="member" key={item.uid}>
                            <div className="profile">
                                <Asset url={item.img_url} alt={item.username} />
                                <span>{item.username}</span>
                            </div>
                            <div className="actions">
                                <div className="ban">
                                    <button onClick={() => banMember(item.uid)}>
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
                                        onClick={() => muteMember(item.uid)}
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
                                {chat.owner.uid === user.uid && (
                                    <>
                                        <button
                                            onClick={() =>
                                                makeMemberAdmin(item.uid)
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
