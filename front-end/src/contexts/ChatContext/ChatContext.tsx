// React stuffs
import React, { createContext, useContext, useEffect, useState } from "react";

// User context
import { useUser } from "../UserContext";

// Types
import { GroupChat } from "../../types/chat";

// Generators DEBUG
import {
    generateGroupChats,
} from "../FakeDataContext/fakeDataGenerators";

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
    activeChat: GroupChat;
    setActiveChat: React.Dispatch<React.SetStateAction<GroupChat>>;

    directChats: GroupChat[];
    groupChats: GroupChat[];
}

const ChatContext = createContext<ChatContextType>(null!);

const useChat = () => useContext(ChatContext);

///////////////////////////////////////////////////////////

const ChatProvider = ({
    children
}: {
    children: React.ReactNode;
}): JSX.Element => {
    const [activeChat, setActiveChat] = useState<GroupChat>(null!);

    const [directChats, setDirectChats] = useState<GroupChat[]>(null!);
    const [groupChats, setGroupChats] = useState<GroupChat[]>(null!);

    ////////////////////////////////////////////////////////////

    const { user } = useUser();

    // TODO: remove because it is debug
    const { profiles } = useFakeData();

    ////////////////////////////////////////////////////////////

    useEffect(() => {
        if (!user) return;
        if (!profiles) return;

        const chatAggregator = async () => {
            // TODO: Get from api //////////////////////////////////////
            const retrievedGroupChats: GroupChat[] = generateGroupChats(
                user,
                10,
                [1, 4],
                profiles
            );
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
