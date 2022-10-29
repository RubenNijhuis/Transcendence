import React, { useState } from "react";

// Types
import { ProfileType } from "../../../types/profile";
import { GameType } from "../../../types/game";
import {
    GroupChat,
    MessageContentType,
    SimpleMessage,
    PictureMessage,
    InvitePlayMessage,
    MessageTypes
} from "../../../types/chat";

// UI
import { Container, SelectTypeIcon, SelectionBox } from "./ChatInput.style";
import Asset from "../../../components/Asset";

////////////////////////////////////////////////////////////

interface IMessageTypeSelect {
    sender: ProfileType;
    groupchat: GroupChat;
    messageType: MessageContentType;
    setMessageType: React.Dispatch<React.SetStateAction<MessageContentType>>;
    setMessageContent: React.Dispatch<React.SetStateAction<MessageTypes>>;
}

const MessageTypeSelect = ({
    sender,
    groupchat,
    messageType,
    setMessageType,
    setMessageContent
}: IMessageTypeSelect): JSX.Element => {
    const [chatTypeSelected, setChatTypeSelected] = useState<boolean>(false);

    ////////////////////////////////////////////////////////////

    const handleChatTypeChange = (type: MessageContentType): void => {
        if (type === messageType) return;

        setMessageType(type);
        if (type === MessageContentType.Simple)
            setMessageContent({ content: "" });
        else if (type === MessageContentType.Picture)
            setMessageContent({ alt: "", url: "" });
        else if (type === MessageContentType.InvitePlay)
            setMessageContent({
                opponent: groupchat.members[0],
                user: sender,
                accepted: false,
                game_type: GameType.Classic
            });
    };

    ////////////////////////////////////////////////////////////

    return (
        <div
            className="message-type-select"
            onClick={() => setChatTypeSelected(!chatTypeSelected)}
        >
            <SelectTypeIcon selected={chatTypeSelected}>
                <img
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.iconsdb.com%2Ficons%2Fdownload%2Fwhite%2Fplus-5-512.png&f=1&nofb=1"
                    alt="message options"
                />
            </SelectTypeIcon>
            <SelectionBox selected={chatTypeSelected}>
                <span
                    onClick={() =>
                        handleChatTypeChange(MessageContentType.Simple)
                    }
                >
                    Simple
                </span>
                <span
                    onClick={() =>
                        handleChatTypeChange(MessageContentType.Picture)
                    }
                >
                    Picture
                </span>
                <span
                    onClick={() =>
                        handleChatTypeChange(MessageContentType.InvitePlay)
                    }
                >
                    Invite
                </span>
            </SelectionBox>
        </div>
    );
};

const SimpleMessageInput = ({
    content,
    setContent
}: {
    content: SimpleMessage;
    setContent: React.Dispatch<React.SetStateAction<SimpleMessage>>;
}): JSX.Element => {
    return (
        <div className="simple-message-input">
            <input
                value={content.content}
                onChange={(e) => setContent({ content: e.target.value })}
            />
        </div>
    );
};

const PictureMessageInput = ({
    content,
    setContent
}: {
    content: PictureMessage;
    setContent: React.Dispatch<React.SetStateAction<PictureMessage>>;
}): JSX.Element => {
    return (
        <div className="picture-message-input">
            <div
                className="img-preview"
                style={{ maxWidth: "100%", overflow: "hidden" }}
            >
                {content.url && <Asset url={content.url} alt={content.alt} />}
            </div>
            <div className="picture-input">
                <label>Url</label>
                <input
                    className="img-alt-input"
                    value={content.url}
                    onChange={(e) =>
                        setContent((prevState) => ({
                            ...prevState,
                            url: e.target.value
                        }))
                    }
                />
                <label>Alt</label>
                <input
                    className="img-alt-input"
                    value={content.alt}
                    onChange={(e) =>
                        setContent((prevState) => ({
                            ...prevState,
                            alt: e.target.value
                        }))
                    }
                />
            </div>
        </div>
    );
};

const InvitePlayMessageInput = ({
    content,
    setContent
}: {
    content: InvitePlayMessage;
    setContent: React.Dispatch<React.SetStateAction<InvitePlayMessage>>;
}): JSX.Element => {
    return <div className="invite-message-input"></div>;
};

interface IChatInput {
    user: ProfileType;
    groupchat: GroupChat;
}

const ChatInput = ({ user, groupchat }: IChatInput): JSX.Element => {
    const [messageType, setMessageType] = useState<MessageContentType>(
        MessageContentType.Simple
    );

    const [messageContent, setMessageContent] = useState<MessageTypes>({
        content: ""
    });

    ////////////////////////////////////////////////////////////

    const handleMessageSend = (): void => {
        setMessageType(MessageContentType.Simple);
        setMessageContent({ content: "" });
    };

    ////////////////////////////////////////////////////////////

    return (
        <Container>
            <div className="input-wrapper">
                <div className="input">
                    {messageType === MessageContentType.Simple && (
                        <SimpleMessageInput
                            content={messageContent as SimpleMessage}
                            setContent={
                                setMessageContent as React.Dispatch<
                                    React.SetStateAction<SimpleMessage>
                                >
                            }
                        />
                    )}

                    {messageType === MessageContentType.Picture && (
                        <PictureMessageInput
                            content={messageContent as PictureMessage}
                            setContent={
                                setMessageContent as React.Dispatch<
                                    React.SetStateAction<PictureMessage>
                                >
                            }
                        />
                    )}

                    {messageType === MessageContentType.InvitePlay && (
                        <InvitePlayMessageInput
                            content={messageContent as InvitePlayMessage}
                            setContent={
                                setMessageContent as React.Dispatch<
                                    React.SetStateAction<InvitePlayMessage>
                                >
                            }
                        />
                    )}
                </div>
                <button className="send-button" onClick={handleMessageSend}>
                    Send
                </button>
                <MessageTypeSelect
                    sender={user}
                    groupchat={groupchat}
                    setMessageContent={setMessageContent}
                    messageType={messageType}
                    setMessageType={setMessageType}
                />
            </div>
        </Container>
    );
};

////////////////////////////////////////////////////////////

export default ChatInput;
