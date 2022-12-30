// API Proxies
import { addImagesToProfile } from "../../proxies/profile";

// Types
import * as Chat from "../../types/Chat";
import * as Profile from "../../types/Profile";

////////////////////////////////////////////////////////////

const getMembersFromGroupChats = async (
    chats: Chat.Group.Instance[]
): Promise<Chat.Member[][]> => {
    const members: Chat.Member[][] = [];

    for (const chat of chats) {
        for (let member of chat.members) {
            member.profile = await addImagesToProfile(member.profile, {
                profile: true,
                banner: false
            });
        }
        members.push(chat.members);
    }

    return members;
};

const getMessagesFromGroupChats = (
    chats: Chat.Group.Instance[]
): Chat.Message.Instance[][] => {
    const messages: Chat.Message.Instance[][] = [];

    for (const chat of chats) {
        for (let message of chat.messages) {
            message.content = JSON.parse(message.content as unknown as string);
        }
        messages.push(chat.messages);
    }

    return messages;
};

const findMemberByProfileID = (
    id: Profile.ID,
    members: Chat.Member[]
): Chat.Member => {
    // Could return undefined but should always find it anyway so what gives
    const profile = members.find((member) => {
        return member.profile.uid === id;
    }) as Chat.Member;

    return profile;
};

const bindMembersToMessages = (
    members: Chat.Member[][],
    totalMessages: Chat.Message.Instance[][]
): void => {
    for (let i = 0; i < totalMessages.length; i++) {
        const messageList = totalMessages[i];

        for (let j = 0; j < messageList.length; j++) {
            const message = messageList[j];
            const { senderID } = message;

            message.sender = findMemberByProfileID(
                senderID,
                members[i]
            ).profile;
        }
    }
};

/**
 * Will return the id of the first chat that is a direct message
 * Otherwise return the first chat id which is zero
 */
const getFirstDM = (
    chats: Chat.Group.Instance[]
): Chat.Group.Instance | null => {
    for (const chat of chats) {
        if (chat.members.length === 2) {
            return chat;
        }
    }

    return null;
};

const categorizeChats = (
    chats: Chat.Group.Instance[]
): [Chat.Group.Instance[], Chat.Group.Instance[]] => {
    const directChats: Chat.Group.Instance[] = [];
    const groupChats: Chat.Group.Instance[] = [];

    let amountDirectChats = 0;
    let amountGroupChats = 0;

    for (const chat of chats) {
        const isDmChat = chat.members.length === 2;

        isDmChat ? directChats.push(chat) : groupChats.push(chat);

        if (isDmChat) {
            directChats[amountDirectChats].internal_id = amountDirectChats;
        } else {
            groupChats[amountGroupChats].internal_id = amountGroupChats;
        }

        isDmChat ? amountDirectChats++ : amountGroupChats++;
    }

    return [directChats, groupChats];
};

////////////////////////////////////////////////////////////

export {
    getMembersFromGroupChats,
    getMessagesFromGroupChats,
    findMemberByProfileID,
    bindMembersToMessages,
    getFirstDM,
    categorizeChats
};
