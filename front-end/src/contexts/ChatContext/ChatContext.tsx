// React stuffs
import React, { createContext, useContext, useEffect, useState } from "react";

// Types
import { GroupChat, Message } from "../../types/chat";
import { ProfileID, ProfileType } from "../../types/profile";

// Get user
import { useAuth } from "../AuthContext";

// Generators DEBUG
import {
    generateGroupChats,
    generateProfile
} from "../FakeDataContext/fakeDataGenerators";

interface ChatContextType {
    activeChatID: number;
    setActiveChatID: React.Dispatch<React.SetStateAction<number>>;

    allChats: GroupChat[];
}

const ChatContext = createContext<ChatContextType>(null!);
const useChat = () => useContext(ChatContext);

const ChatProvider = ({ children }: { children: React.ReactNode }) => {
    const [activeChatID, setActiveChatID] = useState<number>(0);
    const [allChats, setAllChats] = useState<GroupChat[]>(null!);

    ////////////////////////////////////////////////////////////

    const { user } = useAuth();

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
        uid: ProfileID,
        members: ProfileType[]
    ): ProfileType => {
        // WHY TYPESCRIPT
        let profile: ProfileType = {
            uid: 0,
            username: "",
            img_url: "",
            banner_url: "",
            color: "",
            rank: 0,
            wins: 0,
            losses: 0,
            friends: [],
            blocked: []
        };

        for (const member of members) {
            if (member.uid === uid) {
                profile = member;
                return profile;
            }
        }

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

            for (let i = 0; i < retrievedGroupChats.length; i++) {
                retrievedGroupChats[i].internal_id = i;
            }
            
            setActiveChatID(0);
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
