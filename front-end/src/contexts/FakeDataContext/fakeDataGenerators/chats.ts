// Img url
import { get_img_url } from "./utils";

// Random int
import randomIntFromInterval from "../../../utils/randomNumFromInterval";

// Types
import { ProfileType } from "../../../types/profile";
import { GameType } from "../../../types/game";
import {
    Message,
    PictureMessage,
    GroupChat,
    SimpleMessage,
    InvitePlayMessage,
    MessageContentType,
    AllMessageTypes
} from "../../../types/chat";

const generateInvite = (
    user: ProfileType,
    opponent: ProfileType
): InvitePlayMessage => {
    const invite: InvitePlayMessage = {
        opponent,
        user,
        game_type: GameType.Classic,
        accepted: false
    };

    return invite;
};

const generateSimpleMessage = () => {
    const simpleMessage: SimpleMessage = {
        content: "BOOP"
    };

    return simpleMessage;
};

const generatePictureMessage = () => {
    const randomWidth: number =
        Math.ceil(randomIntFromInterval(1000, 2000) / 100) * 100;
    const randomHeight: number =
        Math.ceil(randomIntFromInterval(1000, 2000) / 100) * 100;

    const img_url: string = get_img_url(randomWidth, randomHeight);

    const picture: PictureMessage = {
        url: img_url,
        alt: "sent"
    };

    return picture;
};

const generateNewMessageContent = (
    sender: ProfileType,
    receiver: ProfileType,
    type: MessageContentType
): AllMessageTypes => {
    let messageContent: AllMessageTypes = null!;

    if (type === MessageContentType.Simple) {
        messageContent = generateSimpleMessage();
    } else if (type === MessageContentType.Picture) {
        messageContent = generatePictureMessage();
    } else if (type === MessageContentType.InvitePlay) {
        messageContent = generateInvite(sender, receiver);
    }

    return messageContent;
};

const generateMessage = (
    sender: ProfileType,
    receiver: ProfileType,
    group_id: number,
    amount: number
): Message[] => {
    const messages: Message[] = [];

    for (let i = 0; i < amount; i++) {
        const rand: number = randomIntFromInterval(0, 2);

        const newMessage: Message = {
            content: generateNewMessageContent(sender, receiver, rand),
            content_type: rand,
            timestamp: new Date().toString(),
            sender,
            id: i,
            group_id,
            read_by: []
        };

        messages.push(newMessage);
    }

    return messages;
};

const generateGroupChats = (
    user: ProfileType,
    amount: number,
    amount_people: number,
    profiles: ProfileType[]
): GroupChat[] => {
    const groupChatList: GroupChat[] = [];

    for (let i = 0; i < amount; i++) {
        const newGroup: GroupChat = {
            group_id: i,
            members: [],
            messages: []
        };

        newGroup.members.push(profiles[i]);
        newGroup.members.push(user);

        newGroup.messages.push(
            ...generateMessage(
                profiles[i],
                user,
                i,
                randomIntFromInterval(2, 3)
            )
        );

        newGroup.messages.push(
            ...generateMessage(
                user,
                profiles[i],
                i,
                randomIntFromInterval(2, 3)
            )
        );

        newGroup.messages.push(
            ...generateMessage(
                profiles[i],
                user,
                i,
                randomIntFromInterval(2, 3)
            )
        );
        groupChatList.push(newGroup);
    }
    return groupChatList;
};

export { generateGroupChats };
