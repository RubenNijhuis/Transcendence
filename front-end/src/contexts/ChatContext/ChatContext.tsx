// React stuffs
import React, { createContext, useContext, useEffect, useState } from "react";

// User context
import { useUser } from "../UserContext";

// Types
import { GroupChat } from "../../types/chat";
import { ProfileType } from "../../types/profile";

// Generators DEBUG
import {
    generateGroupChats,
    generateProfile
} from "../FakeDataContext/fakeDataGenerators";

// Business logic
import {
    bindMembersToMessages,
    categorizeChats,
    getFirstDM,
    getMembersFromGroupChats,
    getMessagesFromGroupChats
} from "./ChatContext.bl";

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

    ////////////////////////////////////////////////////////////

    useEffect(() => {
        if (!user) return;

        const chatAggregator = async () => {
            // TODO: Get from api //////////////////////////////////////
            const tempProfiles: ProfileType[] = generateProfile(30);
            const retrievedGroupChats: GroupChat[] = generateGroupChats(
                user,
                10,
                [1, 4],
                tempProfiles
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

            if (firstDM !== null) setActiveChat(firstDM);
            else setActiveChat(retrievedGroupChats[0]);
        };

        chatAggregator();
    }, [user]);

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

export { useChat };
export default ChatProvider;
