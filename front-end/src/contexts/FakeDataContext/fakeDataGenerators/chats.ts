// Img url
import { get_img_url } from "./utils";

// Random int
import randomIntFromInterval from "../../../utils/randomNum";
import randomNumberInRange from "../../../utils/randomNum";

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
    MessageTypes
} from "../../../types/chat";

// Utils
import { generateProfile } from "./profile";
import { randomSliceOfArray } from "../../../utils/arrayManipulation";

///////////////////////////////////////////////////////////

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

const generateSimpleMessage = (): SimpleMessage => {
    const simpleMessage: SimpleMessage = {
        content: "BOOP"
    };

    return simpleMessage;
};

const generatePictureMessage = (): PictureMessage => {
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
): MessageTypes => {
    let messageContent: MessageTypes = null!;

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
            sender: generateProfile(1)[0],
            senderID: sender.uid,
            uid: i,
            group_id,
            read_by: []
        };

        messages.push(newMessage);
    }

    return messages;
};

///////////////////////////////////////////////////////////

const generateGroupChats = (
    user: ProfileType,
    amount: number,
    memberRange: [number, number],
    profiles: ProfileType[]
): GroupChat[] => {
    const groupChatList: GroupChat[] = [];

    for (let i = 0; i < amount; i++) {
        const randomNum: number = randomNumberInRange(
            memberRange[0],
            memberRange[1]
        );

        const members: ProfileType[] = [
            ...randomSliceOfArray<ProfileType>(profiles, randomNum),
            user
        ];

        const newGroup: GroupChat = {
            group_id: i,
            internal_id: i,
            members: members,
            messages: []
        };

        newGroup.messages.push(
            ...generateMessage(
                members[randomNumberInRange(0, randomNum)],
                user,
                i,
                randomIntFromInterval(2, 3)
            )
        );

        newGroup.messages.push(
            ...generateMessage(
                user,
                members[randomNumberInRange(0, randomNum)],
                i,
                randomIntFromInterval(2, 3)
            )
        );

        newGroup.messages.push(
            ...generateMessage(
                members[randomNumberInRange(0, randomNum)],
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
