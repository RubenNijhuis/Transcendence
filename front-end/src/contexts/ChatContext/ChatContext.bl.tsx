// Types
import { GroupChat, Message } from "../../types/chat";
import { ProfileID, ProfileType } from "../../types/profile";

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
const getFirstDM = (chats: GroupChat[]): GroupChat | null => {
    for (const chat of chats) {
        if (chat.members.length === 2) {
            return chat;
        }
    }

    return null;
};

const categorizeChats = (chats: GroupChat[]): [GroupChat[], GroupChat[]] => {
    const directChats: GroupChat[] = [];
    const groupChats: GroupChat[] = [];

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
