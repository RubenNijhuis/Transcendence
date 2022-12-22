// Img url
import { get_img_url } from "./utils";

// Random int
import randomNum from "../../../utils/numbers/randomIntFromRange";

// Types
import { Profile, Game, Chat, Match } from "../../../types";

// Utils
import { generateProfile } from "./profile";
import { randomSliceOfArray } from "../../../utils/array";

///////////////////////////////////////////////////////////

const generateInvite = (
    user: Profile.Instance,
    opponent: Profile.Instance
): Chat.Message.GameInvite => {
    const invite: Chat.Message.GameInvite = {
        opponent,
        user,
        game_type: Match.GameType.Classic,
        accepted: false
    };

    return invite;
};

const generateSimpleMessage = (): Chat.Message.Simple => {
    const simpleMessage: Chat.Message.Simple = {
        content: "Lorem ipsum sit dolor amet"
    };

    return simpleMessage;
};

const generatePictureMessage = (): Chat.Message.Picture => {
    const randomWidth: number = Math.ceil(randomNum(1000, 2000) / 100) * 100;
    const randomHeight: number = Math.ceil(randomNum(1000, 2000) / 100) * 100;

    const img_url: string = get_img_url(randomWidth, randomHeight);

    const picture: Chat.Message.Picture = {
        url: img_url,
        alt: "random"
    };

    return picture;
};

const generateNewMessageContent = (
    sender: Profile.Instance,
    receiver: Profile.Instance,
    type: Chat.Message.ContentType
): Chat.Message.MessageTypes => {
    let messageContent: Chat.Message.MessageTypes = null!;

    const messageTypeToGeneratorTable = [
        generateSimpleMessage(),
        generatePictureMessage(),
        generateInvite(sender, receiver)
    ];

    messageContent = messageTypeToGeneratorTable[type];

    return messageContent;
};

const generateMessage = (
    sender: Profile.Instance,
    receiver: Profile.Instance,
    uid: number,
    amount: number
): Chat.Message.Instance[] => {
    const messages: Chat.Message.Instance[] = [];

    for (let i = 0; i < amount; i++) {
        const rand: number = randomNum(0, 3);

        const newMessage: Chat.Message.Instance = {
            content: generateNewMessageContent(sender, receiver, rand),
            content_type: rand,
            timestamp: new Date().toString(),
            sender: generateProfile(1)[0],
            senderID: sender.uid,
            id: i,
            uid
        };

        messages.push(newMessage);
    }

    return messages;
};

///////////////////////////////////////////////////////////

const generateGroupChats = (
    user: Profile.Instance,
    amount: number,
    memberRange: [number, number],
    profiles: Profile.Instance[]
): Chat.Group.Instance[] => {
    const groupChatList: Chat.Group.Instance[] = [];

    for (let i = 0; i < amount; i++) {
        const randomNum1: number = randomNum(memberRange[0], memberRange[1]);

        const members: Profile.Instance[] = [
            ...randomSliceOfArray<Profile.Instance>(profiles, randomNum1),
            user
        ];

        const newGroup: Chat.Group.Instance = {
            name: "dikke lul",
            owner: 'penis',
            uid: i.toString(),
            internal_id: i,
            members: [],
            messages: [],
            protected: randomNum1 !== 1
        };

        newGroup.messages.push(
            ...generateMessage(
                members[randomNum(0, randomNum1)],
                user,
                i,
                randomNum(2, 3)
            )
        );

        newGroup.messages.push(
            ...generateMessage(
                user,
                members[randomNum(0, randomNum1)],
                i,
                randomNum(2, 3)
            )
        );

        newGroup.messages.push(
            ...generateMessage(
                members[randomNum(0, randomNum1)],
                user,
                i,
                randomNum(2, 3)
            )
        );
        groupChatList.push(newGroup);
    }

    return groupChatList;
};

///////////////////////////////////////////////////////////

export { generateGroupChats };
