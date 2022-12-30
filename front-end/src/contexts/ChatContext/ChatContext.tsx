// React stuffs
import React, { createContext, useContext, useEffect, useState } from "react";

// User context
import { useUser } from "../UserContext";

// Types
import * as Chat from "../../types/Chat";

// Business logic
import {
    bindMembersToMessages,
    categorizeChats,
    getFirstDM,
    getMembersFromGroupChats,
    getMessagesFromGroupChats
} from "./ChatContext.bl";

// Requests
import { getChatsByUsername } from "../../proxies/chat";

///////////////////////////////////////////////////////////

interface ChatContextType {
    activeChat: Chat.Group.Instance;
    setActiveChat: React.Dispatch<React.SetStateAction<Chat.Group.Instance>>;

    directChats: Chat.Group.Instance[];
    groupChats: Chat.Group.Instance[];
}

const ChatContext = createContext<ChatContextType>(null!);

const useChat = () => useContext(ChatContext);

///////////////////////////////////////////////////////////

interface IChatProvider {
    children: React.ReactNode;
}

const ChatProvider = ({ children }: IChatProvider): JSX.Element => {
    const [activeChat, setActiveChat] = useState<Chat.Group.Instance>(null!);
    const [directChats, setDirectChats] = useState<Chat.Group.Instance[]>([]);
    const [groupChats, setGroupChats] = useState<Chat.Group.Instance[]>([]);

    ////////////////////////////////////////////////////////

    const { user } = useUser();

    ////////////////////////////////////////////////////////

    useEffect(() => {
        if (!user) return;

        const chatAggregator = async () => {
            const retrievedGroupChats: Chat.Group.Instance[] =
                await getChatsByUsername(user.uid);

            const members = await getMembersFromGroupChats(retrievedGroupChats);
            const messages = getMessagesFromGroupChats(retrievedGroupChats);
            bindMembersToMessages(members, messages);

            const [categorizedDirectChats, categorizedGroupChats] =
                categorizeChats(retrievedGroupChats);

            setDirectChats(categorizedDirectChats);
            setGroupChats(categorizedGroupChats);

            setActiveChat(retrievedGroupChats[0]);
        };

        chatAggregator();
    }, [user]);

    ////////////////////////////////////////////////////////

    const value: ChatContextType = {
        activeChat,
        setActiveChat,

        directChats,
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
