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
import { setPermission } from "../../../proxies/chat";
import Button from "../../../components/Button";
import { isMemberBanned } from "../../../proxies/chat/isMemberBanned";
import { unBanMember } from "../../../proxies/chat/unBanMember";

///////////////////////////////////////////////////////////

interface IChatSettings {
    chat: Chat.Group.Instance;
    user: Profile.Instance;
}

interface MemberRecord {
    member: Chat.Member;
    isBanned: boolean;
    isMuted: boolean;
    isAdmin: boolean;
}

const ChatSettings = ({ chat, user }: IChatSettings): JSX.Element => {
    const [memberRecords, setMemberRecords] = useState<MemberRecord[]>([]);

    ///////////////////////////////////////////////////////////

    const toggleBanMember = async (memberRecord: MemberRecord) => {
        try {
            if (memberRecord.isBanned) {
                console.log("getting unbanned");
                await unBanMember(
                    memberRecord.member.groupId,
                    memberRecord.member.memberId
                );
            } else {
                console.log("getting banned");
                await banMember(
                    memberRecord.member.groupId,
                    memberRecord.member.memberId
                );
            }

            setMemberRecords((prev) =>
                prev.map((item) => {
                    if (item.member.memberId === memberRecord.member.memberId) {
                        item.isBanned = !item.isBanned;
                    }
                    return item;
                })
            );
        } catch (err) {
            console.error(err);
        }
    };

    const runMuteMember = async (uid: string) => {
        try {
            await muteMember(chat.uid, uid, 15);
        } catch (err) {
            console.error(err);
        }
    };

    const togglePermission = async (memberRecord: MemberRecord) => {
        try {
            if (memberRecord.isAdmin) {
                await setPermission(
                    memberRecord.member.memberId,
                    chat.uid,
                    Chat.Group.Permission.Standard
                );
            } else {
                await setPermission(
                    memberRecord.member.memberId,
                    chat.uid,
                    Chat.Group.Permission.Admin
                );
            }

            setMemberRecords((prev) =>
                prev.map((item) => {
                    if (item.member.memberId === memberRecord.member.memberId) {
                        item.isAdmin = !item.isAdmin;
                    }
                    return item;
                })
            );
        } catch (err) {
            console.error(err);
        }
    };

    ///////////////////////////////////////////////////////////

    useEffect(() => {
        const runRetrieveRecords = async () => {
            const recs: MemberRecord[] = [];

            for (const member of chat.members) {
                if (member.memberId === user.uid) continue;

                const isBanned = await isMemberBanned(
                    member.memberId,
                    member.groupId
                );

                const isAdmin =
                    member.permissions === Chat.Group.Permission.Admin;

                recs.push({ member, isBanned, isMuted: false, isAdmin });
            }
            setMemberRecords(recs);
        };
        runRetrieveRecords();
    }, []);

    ///////////////////////////////////////////////////////////

    return (
        <Container>
            <div className="header">
                <Heading type={2}>Chat Settings</Heading>
            </div>
            <ul className="member-list">
                {memberRecords.map((record) => {
                    const { member, isAdmin, isMuted, isBanned } = record;
                    if (member.profile.uid === user.uid) return;

                    return (
                        <li className="member" key={member.profile.uid}>
                            <div className="profile">
                                <Asset
                                    url={member.profile.img_url}
                                    alt={member.profile.username}
                                />
                                <span>{member.profile.username}</span>
                            </div>
                            <div className="actions">
                                <Button
                                    onClick={() => togglePermission(record)}
                                    className="admin"
                                >
                                    {isAdmin ? "Remove admin" : "Add as admin"}
                                </Button>
                                <div className="divider" />
                                <div className="ban">
                                    <Button
                                        onClick={() => toggleBanMember(record)}
                                    >
                                        {isBanned
                                            ? "Unban member"
                                            : "Ban member"}
                                    </Button>
                                </div>
                                <div className="divider" />
                                <div className="mute">
                                    <Button
                                        onClick={() =>
                                            runMuteMember(member.profile.uid)
                                        }
                                    >
                                        Mute 15 min
                                    </Button>
                                </div>
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
