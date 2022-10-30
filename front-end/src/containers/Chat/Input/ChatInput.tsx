// React
import React, { useState } from "react";

// Types
import { Profile, Game, Chat } from "../../../types";

// UI
import { Container, SelectTypeIcon, SelectionBox } from "./ChatInput.style";
import Asset from "../../../components/Asset";

////////////////////////////////////////////////////////////

interface IMessageTypeSelect {
    sender: Profile.Instance;
    groupchat: Chat.Group.Instance;
    messageType: Chat.Message.ContentType;
    setMessageType: React.Dispatch<
        React.SetStateAction<Chat.Message.ContentType>
    >;
    setMessageContent: React.Dispatch<
        React.SetStateAction<Chat.Message.MessageTypes>
    >;
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

    const handleChatTypeChange = (type: Chat.Message.ContentType): void => {
        if (type === messageType) return;

        setMessageType(type);
        if (type === Chat.Message.ContentType.Simple)
            setMessageContent({ content: "" });
        else if (type === Chat.Message.ContentType.Picture)
            setMessageContent({ alt: "", url: "" });
        else if (type === Chat.Message.ContentType.InvitePlay)
            setMessageContent({
                opponent: groupchat.members[0],
                user: sender,
                accepted: false,
                game_type: Game.GameType.Classic
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
                        handleChatTypeChange(Chat.Message.ContentType.Simple)
                    }
                >
                    Simple
                </span>
                <span
                    onClick={() =>
                        handleChatTypeChange(Chat.Message.ContentType.Picture)
                    }
                >
                    Picture
                </span>
                <span
                    onClick={() =>
                        handleChatTypeChange(
                            Chat.Message.ContentType.InvitePlay
                        )
                    }
                >
                    Invite
                </span>
            </SelectionBox>
        </div>
    );
};

interface ISimpleMessageInput {
    content: Chat.Message.SimpleMessage;
    setContent: React.Dispatch<
        React.SetStateAction<Chat.Message.SimpleMessage>
    >;
}

const SimpleMessageInput = ({
    content,
    setContent
}: ISimpleMessageInput): JSX.Element => {
    return (
        <div className="simple-message-input">
            <input
                value={content.content}
                onChange={(e) => setContent({ content: e.target.value })}
            />
        </div>
    );
};

interface IPictureMessageInput {
    content: Chat.Message.PictureMessage;
    setContent: React.Dispatch<
        React.SetStateAction<Chat.Message.PictureMessage>
    >;
}

const PictureMessageInput = ({
    content,
    setContent
}: IPictureMessageInput): JSX.Element => {
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

interface IInvitePlayMessageInput {
    content: Chat.Message.GameInviteMessage;
    setContent: React.Dispatch<
        React.SetStateAction<Chat.Message.GameInviteMessage>
    >;
}

const InvitePlayMessageInput = ({
    content,
    setContent
}: IInvitePlayMessageInput): JSX.Element => {
    return <div className="invite-message-input"></div>;
};

interface IChatInput {
    user: Profile.Instance;
    groupchat: Chat.Group.Instance;
}

const ChatInput = ({ user, groupchat }: IChatInput): JSX.Element => {
    const [messageType, setMessageType] = useState<Chat.Message.ContentType>(
        Chat.Message.ContentType.Simple
    );

    const [messageContent, setMessageContent] =
        useState<Chat.Message.MessageTypes>({
            content: ""
        });

    ////////////////////////////////////////////////////////////

    const handleMessageSend = (): void => {
        setMessageType(Chat.Message.ContentType.Simple);
        setMessageContent({ content: "" });
    };

    ////////////////////////////////////////////////////////////

    return (
        <Container>
            <div className="input-wrapper">
                <div className="input">
                    {messageType === Chat.Message.ContentType.Simple && (
                        <SimpleMessageInput
                            content={
                                messageContent as Chat.Message.SimpleMessage
                            }
                            setContent={
                                setMessageContent as React.Dispatch<
                                    React.SetStateAction<Chat.Message.SimpleMessage>
                                >
                            }
                        />
                    )}

                    {messageType === Chat.Message.ContentType.Picture && (
                        <PictureMessageInput
                            content={
                                messageContent as Chat.Message.PictureMessage
                            }
                            setContent={
                                setMessageContent as React.Dispatch<
                                    React.SetStateAction<Chat.Message.PictureMessage>
                                >
                            }
                        />
                    )}

                    {messageType === Chat.Message.ContentType.InvitePlay && (
                        <InvitePlayMessageInput
                            content={
                                messageContent as Chat.Message.GameInviteMessage
                            }
                            setContent={
                                setMessageContent as React.Dispatch<
                                    React.SetStateAction<Chat.Message.GameInviteMessage>
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
