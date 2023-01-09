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
    activeChat: Chat.Group.Instance | null;
    setActiveChat: React.Dispatch<
        React.SetStateAction<Chat.Group.Instance | null>
    >;
    groupChats: Chat.Group.Instance[];
}

const ChatContext = createContext<ChatContextType>(null!);

const useChat = () => useContext(ChatContext);

///////////////////////////////////////////////////////////

interface IChatProvider {
    children: React.ReactNode;
}

const ChatProvider = ({ children }: IChatProvider): JSX.Element => {
    const [activeChat, setActiveChat] = useState<Chat.Group.Instance | null>(
        null
    );
    const [groupChats, setGroupChats] = useState<Chat.Group.Instance[]>([]);
    const [chatMembers, setChatMembers] = useState<Chat.Member[]>([]);

    ////////////////////////////////////////////////////////

    const { user } = useUser();

    ////////////////////////////////////////////////////////

    useEffect(() => {
        if (!activeChat) return;

        const updateChat = async () =>{
            try {
                const newChat = await getChatByGroupId(activeChat.uid);
                updateChatGroup(newChat)
            } catch (err) {
                console.error(err);
            }
        }
        updateChat();
    }, [activeChat]);

    useEffect(() => {
        if (!user) return;

        /**
         * Chat page
         * Get all chats
         * Bind members to messages
         * set groupchats and members
         *
         *
         */

        const chatAggregator = async () => {
            try {
                const retrievedGroupChats: Chat.Group.Instance[] =
                    await getChatsByUsername();
                
                console.log(retrievedGroupChats);

                const members = await getMembersFromGroupChats(
                    retrievedGroupChats
                );
                const messages = getMessagesFromGroupChats(retrievedGroupChats);
                bindMembersToMessages(members, messages);

                for (let i = 0; i < retrievedGroupChats.length; i++) {
                    retrievedGroupChats[i].internal_id = i;
                }

                setChatMembers(members.flat());
                setGroupChats(retrievedGroupChats);
            } catch (err) {
                console.error(err);
            }
        };

        chatAggregator();
    }, [user]);

    const updateChatGroup = (
        updatedGroup: Chat.Group.Instance
    ): void => {
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

    ////////////////////////////////////////////////////////

    const value: ChatContextType = {
        activeChat,
        setActiveChat,
        groupChats
    };

    ////////////////////////////////////////////////////////

    return (
        <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
    );
};

////////////////////////////////////////////////////////////

export { useChat };
export default ChatProvider;
