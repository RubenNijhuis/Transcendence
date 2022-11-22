// Img url
import { get_img_url } from "./utils";

// Random int
import randomNum from "../../../utils/numbers/randomIntFromRange";

// Types
import { Profile, Game, Chat } from "../../../types";

// Utils
import { generateProfile } from "./profile";
import { randomSliceOfArray } from "../../../utils/array";

///////////////////////////////////////////////////////////

const generateInvite = (
    user: Profile.Instance,
    opponent: Profile.Instance
): Chat.Message.GameInviteMessage => {
    const invite: Chat.Message.GameInviteMessage = {
        opponent,
        user,
        game_type: Game.GameType.Classic,
        accepted: false,
    };

    return invite;
};

const generateSimpleMessage = (): Chat.Message.SimpleMessage => {
    const simpleMessage: Chat.Message.SimpleMessage = {
        content: "Lorem ipsum sit dolor amet",
    };

    return simpleMessage;
};

const generatePictureMessage = (): Chat.Message.PictureMessage => {
    const randomWidth: number = Math.ceil(randomNum(1000, 2000) / 100) * 100;
    const randomHeight: number = Math.ceil(randomNum(1000, 2000) / 100) * 100;

    const img_url: string = get_img_url(randomWidth, randomHeight);

    const picture: Chat.Message.PictureMessage = {
        url: img_url,
        alt: "random",
    };

    return picture;
};

const generateNewMessageContent = (
    sender: Profile.Instance,
    receiver: Profile.Instance,
    type: Chat.Message.ContentType
): Chat.Message.MessageTypes => {
    let messageContent: Chat.Message.MessageTypes = null!;

    if (type === Chat.Message.ContentType.Simple) {
        messageContent = generateSimpleMessage();
    } else if (type === Chat.Message.ContentType.Picture) {
        messageContent = generatePictureMessage();
    } else if (type === Chat.Message.ContentType.InvitePlay) {
        messageContent = generateInvite(sender, receiver);
    }

    return messageContent;
};

const generateMessage = (
    sender: Profile.Instance,
    receiver: Profile.Instance,
    group_id: number,
    amount: number
): Chat.Message.Instance[] => {
    const messages: Chat.Message.Instance[] = [];

    for (let i = 0; i < amount; i++) {
        const rand: number = randomNum(0, 2);

        const newMessage: Chat.Message.Instance = {
            content: generateNewMessageContent(sender, receiver, rand),
            content_type: rand,
            timestamp: new Date().toString(),
            sender: generateProfile(1)[0],
            senderID: sender.uid,
            id: i,
            group_id,
            read_by: [],
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
            user,
        ];

        const newGroup: Chat.Group.Instance = {
            name: "dikke lul",
            owner: user,
            group_id: i,
            administrators: [user],
            internal_id: i,
            members: members,
            messages: [],
            protected: randomNum1 !== 1,
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
