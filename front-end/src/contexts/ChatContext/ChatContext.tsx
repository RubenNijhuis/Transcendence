// React stuffs
import React, { createContext, useContext, useEffect, useState } from "react";

// User context
import { useUser } from "../UserContext";

// Types
import * as Chat from "../../types/Chat";

// Business logic
import {
    bindMembersToMessages,
    getMembersFromGroupChats,
    getMessagesFromGroupChats
} from "./ChatContext.bl";

// Requests
import { getChatByGroupId, getChatsByUsername } from "../../proxies/chat";

///////////////////////////////////////////////////////////

interface ChatContextType {
    activeChatId: string | null;
    setActiveChatId: React.Dispatch<React.SetStateAction<string | null>>;
    groupChats: Chat.Group.Instance[];
    addGroupChat: (newGroup: Chat.Group.Instance) => void;
    updateChatGroup: (updatedGroup: Chat.Group.Instance) => void;
}

const ChatContext = createContext<ChatContextType>(null!);

const useChat = () => useContext(ChatContext);

///////////////////////////////////////////////////////////

interface IChatProvider {
    children: React.ReactNode;
}

const ChatProvider = ({ children }: IChatProvider): JSX.Element => {
    const [activeChatId, setActiveChatId] = useState<string | null>(null);
    const [groupChats, setGroupChats] = useState<Chat.Group.Instance[]>([]);
    const [chatMembers, setChatMembers] = useState<Chat.Member[]>([]);

    ////////////////////////////////////////////////////////

    const { user } = useUser();

    ////////////////////////////////////////////////////////

    useEffect(() => {
        if (!user) return;

        const chatAggregator = async () => {
            try {
                const retrievedGroupChats: Chat.Group.Instance[] =
                    await getChatsByUsername();
                const members = await getMembersFromGroupChats(
                    retrievedGroupChats
                );
                const messages = getMessagesFromGroupChats(retrievedGroupChats);
                bindMembersToMessages(members, messages);

                for (const group of retrievedGroupChats) {
                    if (group.members.length === 2) {
                        group.size = Chat.Group.Type.DM;
                    } else {
                        group.size = Chat.Group.Type.Group;
                    }
                }

                setChatMembers(members.flat());
                setGroupChats(retrievedGroupChats);
            } catch (err) {
                console.error(err);
            }
        };

        chatAggregator();
    }, [user]);

    const updateChatGroup = (updatedGroup: Chat.Group.Instance): void => {
        setGroupChats((prev) => {
            let updatedChats = prev;

            for (let group of prev) {
                if (group.uid === updatedGroup.uid) {
                    group = updatedGroup;
                }
            }

            return updatedChats;
        });
    };

    const addGroupChat = (newGroup: Chat.Group.Instance): void => {
        const asyncMiddle = async () => {
            const members = await getMembersFromGroupChats([newGroup]);
            const messages = getMessagesFromGroupChats([newGroup]);
            bindMembersToMessages(members, messages);

            for (const group of [newGroup]) {
                if (group.members.length === 2) {
                    group.size = Chat.Group.Type.DM;
                } else {
                    group.size = Chat.Group.Type.Group;
                }
            }
            setGroupChats((prev) => [...prev, newGroup]);
        };
        asyncMiddle();
    };

    ////////////////////////////////////////////////////////

    const value: ChatContextType = {
        activeChatId,
        setActiveChatId,
        groupChats,
        updateChatGroup,
        addGroupChat
    };

    ////////////////////////////////////////////////////////

    return (
        <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
    );
};

////////////////////////////////////////////////////////////

export { useChat };
export default ChatProvider;
