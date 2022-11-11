// React stuffs
import React, { createContext, useContext, useEffect, useState } from "react";

// User context
import { useUser } from "../UserContext";

// Types
import { Chat } from "../../types";

// Generators DEBUG
import { generateGroupChats } from "../FakeDataContext/fakeDataGenerators";

// Business logic
import {
    bindMembersToMessages,
    categorizeChats,
    getFirstDM,
    getMembersFromGroupChats,
    getMessagesFromGroupChats
} from "./ChatContext.bl";

// Debug data
import { useFakeData } from "../FakeDataContext";

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

    const [directChats, setDirectChats] = useState<Chat.Group.Instance[]>(
        null!
    );
    const [groupChats, setGroupChats] = useState<Chat.Group.Instance[]>(null!);

    ////////////////////////////////////////////////////////////

    const { user } = useUser();

    // TODO: remove because it is debug
    const { profiles } = useFakeData();

    ////////////////////////////////////////////////////////////

    useEffect(() => {
        if (!user || !profiles) return;

        const chatAggregator = async () => {
            // TODO: Get from api //////////////////////////////////////
            const retrievedGroupChats: Chat.Group.Instance[] =
                generateGroupChats(user, 10, [1, 4], profiles);
            ////////////////////////////////////////////////////////////

            const members = getMembersFromGroupChats(retrievedGroupChats);
            const messages = getMessagesFromGroupChats(retrievedGroupChats);
            bindMembersToMessages(members, messages);

            const [categorizedDirectChats, categorizedGroupChats] =
                categorizeChats(retrievedGroupChats);
            setDirectChats(categorizedDirectChats);
            setGroupChats(categorizedGroupChats);

            const firstDM = getFirstDM(retrievedGroupChats);

            firstDM === null
                ? setActiveChat(retrievedGroupChats[0])
                : setActiveChat(firstDM);
        };

        chatAggregator();
    }, [user, profiles]);

    ////////////////////////////////////////////////////////////

    const value: ChatContextType = {
        activeChat,
        setActiveChat,

        directChats,
        groupChats
    };

    ////////////////////////////////////////////////////////////

    return (
        <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
    );
};

////////////////////////////////////////////////////////////

export { useChat };
export default ChatProvider;
