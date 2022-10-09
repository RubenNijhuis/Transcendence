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

    /////////////////////////////////////////////////////////////

    const { user } = useAuth();

    /////////////////////////////////////////////////////////////

    const getMembersFromGroupChats = (chats: GroupChat[]) => {
        let members: ProfileType[][] = [];

        for (let i = 0; i < chats.length; i++) {
            members.push(chats[i].members);
        }

        return members;
    };

    const getMessagesFromGroupChats = (chats: GroupChat[]) => {
        let messages: Message[][] = [];

        for (let i = 0; i < chats.length; i++) {
            messages.push(chats[i].messages);
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

        for (let i = 0; i < members.length; i++) {
            if (members[i].uid === uid) {
                profile = members[i];
                return profile;
            }
        }

        return profile;
    };

    const bindMembersToMessages = (
        members: ProfileType[][],
        messages: Message[][]
    ) => {
        for (let i = 0; i < messages.length; i++) {
            for (let j = 0; j < messages[i].length; j++) {
                const { senderID } = messages[i][j];
                messages[i][j].sender = findMemberByProfileID(
                    senderID,
                    members[i]
                );
            }
        }
    };

    /////////////////////////////////////////////////////////////

    /**
     * ✅ Step 1: Get data
     * ✅ Step 2: Split data into members and messages
     * ✅ Step 3: Assign member objects to messages
     * ✅ Step 4: Place all data in state
     * ❌ Step 5: Select default chat and display in UI
     *
     * Done
     */
    useEffect(() => {
        if (!user) return;

        const chatAggregator = async () => {
            // TODO: Get from api
            const tempProfiles: ProfileType[] = generateProfile(30);
            const retrievedGroupChats: GroupChat[] = generateGroupChats(
                user,
                2,
                [2, 4],
                tempProfiles
            );

            const members: ProfileType[][] =
                getMembersFromGroupChats(retrievedGroupChats);
            const messages: Message[][] =
                getMessagesFromGroupChats(retrievedGroupChats);

            bindMembersToMessages(members, messages);
            setAllChats(retrievedGroupChats);
            setActiveChatID(0);
        };
        chatAggregator();
    }, [user]);

    /////////////////////////////////////////////////////////////

    const value: ChatContextType = {
        activeChatID,
        setActiveChatID,
        allChats
    };

    /////////////////////////////////////////////////////////////

    return (
        <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
    );
};

export { useChat };
export default ChatProvider;
