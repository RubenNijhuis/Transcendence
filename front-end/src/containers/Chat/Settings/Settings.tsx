// React
import { useEffect, useState } from "react";

// UI
import Asset from "../../../components/Asset";
import Heading from "../../../components/Heading";

// Forms
import { useFormInput } from "../../../components/Form/hooks";

// Types
import * as Chat from "../../../types/Chat";
import * as Profile from "../../../types/Profile";

// Styling
import { Container } from "./Settings.style";
import { banMember, muteMember } from "../../../proxies/chat";
import { makeAdmin } from "../../../proxies/chat/makeAdmin";

///////////////////////////////////////////////////////////

interface IChatSettings {
    chat: Chat.Group.Instance;
    user: Profile.Instance;
}

const ChatSettings = ({ chat, user }: IChatSettings): JSX.Element => {
    const muteTime = useFormInput("");

    ///////////////////////////////////////////////////////////

    const runBanMember = (uid: string) => {
        banMember(chat.uid, uid);
    };

    const runMuteMember = (uid: string) => {
        muteMember(chat.uid, uid, parseInt(muteTime.value));
    };

    const runMakeMemberAdmin = (uid: string) => {
        makeAdmin(chat.uid, uid);
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
                                <Asset
                                    url={item.profile.img_url}
                                    alt={item.profile.username}
                                />
                                <span>{item.profile.username}</span>
                            </div>
                            <div className="actions">
                                <div className="ban">
                                    <button
                                        onClick={() =>
                                            runBanMember(item.profile.uid)
                                        }
                                    >
                                        Ban
                                    </button>
                                </div>
                                <div className="divider" />
                                <div className="mute">
                                    <button
                                        onClick={() =>
                                            runMuteMember(item.profile.uid)
                                        }
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
                                {item.permissions !== 1 && (
                                    <>
                                        <button
                                            onClick={() =>
                                                runMakeMemberAdmin(
                                                    item.profile.uid
                                                )
                                            }
                                            className="admin"
                                        >
                                            Make admin
                                        </button>
                                    </>
                                )}
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
