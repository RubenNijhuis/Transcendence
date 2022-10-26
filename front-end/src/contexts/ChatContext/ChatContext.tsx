// React stuffs
import React, { createContext, useContext, useEffect, useState } from "react";

// User context
import { useUser } from "../UserContext";

// Types
import { GroupChat, Message } from "../../types/chat";
import { ProfileID, ProfileType } from "../../types/profile";

// Generators DEBUG
import {
    generateGroupChats,
    generateProfile
} from "../FakeDataContext/fakeDataGenerators";

///////////////////////////////////////////////////////////
interface ChatContextType {
    activeChatID: number;
    setActiveChatID: React.Dispatch<React.SetStateAction<number>>;

    allChats: GroupChat[];
}

const ChatContext = createContext<ChatContextType>(null!);

const useChat = () => useContext(ChatContext);

///////////////////////////////////////////////////////////

const ChatProvider = ({
    children
}: {
    children: React.ReactNode;
}): JSX.Element => {
    const [activeChatID, setActiveChatID] = useState<number>(0);
    const [allChats, setAllChats] = useState<GroupChat[]>(null!);

    ////////////////////////////////////////////////////////////

    const { user } = useUser();

    ////////////////////////////////////////////////////////////

    const getMembersFromGroupChats = (chats: GroupChat[]): ProfileType[][] => {
        let members: ProfileType[][] = [];

        for (const chat of chats) {
            members.push(chat.members);
        }

        return members;
    };

    const getMessagesFromGroupChats = (chats: GroupChat[]): Message[][] => {
        let messages: Message[][] = [];

        for (const chat of chats) {
            messages.push(chat.messages);
        }

        return messages;
    };

    const findMemberByProfileID = (
        id: ProfileID,
        members: ProfileType[]
    ): ProfileType => {
        // Could return undefined but should always find it anyway so what gives
        const profile = members.find((member) => {
            return member.id === id;
        }) as ProfileType;

        return profile;
    };

    const bindMembersToMessages = (
        members: ProfileType[][],
        totalMessages: Message[][]
    ): void => {
        for (let i = 0; i < totalMessages.length; i++) {
            const messageList = totalMessages[i];

            for (let j = 0; j < messageList.length; j++) {
                const message = messageList[j];
                const { senderID } = message;

                message.sender = findMemberByProfileID(senderID, members[i]);
            }
        }
    };

    /**
     * Will return the id of the first chat that is a direct message
     * Otherwise return the first chat id which is zero
     */
    const getFirstDMid = (chats: GroupChat[]): number => {
        for (const chat of chats) {
            if (chat.members.length === 2) {
                return chat.internal_id;
            }
        }

        return 0;
    };

    ////////////////////////////////////////////////////////////

    useEffect(() => {
        if (!user) return;

        const chatAggregator = async () => {
            // TODO: Get from api
            const tempProfiles: ProfileType[] = generateProfile(30);
            const retrievedGroupChats: GroupChat[] = generateGroupChats(
                user,
                10,
                [1, 4],
                tempProfiles
            );

            const members: ProfileType[][] =
                getMembersFromGroupChats(retrievedGroupChats);
            const messages: Message[][] =
                getMessagesFromGroupChats(retrievedGroupChats);

            bindMembersToMessages(members, messages);
            setAllChats(retrievedGroupChats);

            // Manually set id's for front-end use
            for (let i = 0; i < retrievedGroupChats.length; i++) {
                retrievedGroupChats[i].internal_id = i;
            }

            setActiveChatID(getFirstDMid(retrievedGroupChats));
        };

        chatAggregator();
    }, [user]);

    ////////////////////////////////////////////////////////////

    const value: ChatContextType = {
        activeChatID,
        setActiveChatID,
        allChats
    };

    ////////////////////////////////////////////////////////////

    return (
        <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
    );
};

export { useChat };
export default ChatProvider;
