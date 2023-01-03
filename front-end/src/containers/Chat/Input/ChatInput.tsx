// React
import React, { useState } from "react";

// Types
import * as Profile from "../../../types/Profile";
import * as Game from "../../../types/Game";
import * as Chat from "../../../types/Chat";
import * as Match from "../../../types/Match";
import * as SocketRoutes from "../../../config/SocketRoutes";

// UI
import { Container, SelectTypeIcon, SelectionBox, StyledPictureInput } from "./ChatInput.style";
import Asset from "../../../components/Asset";
import { useSocket } from "../../../contexts/SocketContext";

////////////////////////////////////////////////////////////

interface IMessageTypeSelect {
    sender: Profile.Instance;
    chat: Chat.Group.Instance;
    messageType: Chat.Message.ContentType;
    setMessageType: React.Dispatch<
        React.SetStateAction<Chat.Message.ContentType>
    >;
    setMessageContent: React.Dispatch<
        React.SetStateAction<Chat.Message.Types>
    >;
}

const MessageTypeSelect = ({
    sender,
    chat,
    messageType,
    setMessageType,
    setMessageContent
}: IMessageTypeSelect): JSX.Element => {
    const [chatTypeSelected, setChatTypeSelected] = useState<boolean>(false);

    ////////////////////////////////////////////////////////

    const handleChatTypeChange = (type: Chat.Message.ContentType): void => {
        if (type === messageType) return;

        setMessageType(type);
        if (type === Chat.Message.ContentType.Simple)
            setMessageContent({ content: "" });
        else if (type === Chat.Message.ContentType.Picture)
            setMessageContent({ alt: "", url: "" });
        else if (type === Chat.Message.ContentType.GameInvite)
            setMessageContent({
                opponent: chat.members[0].profile,
                user: sender,
                accepted: false,
                game_type: Match.GameType.Classic
            });
    };

    ////////////////////////////////////////////////////////

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
                            Chat.Message.ContentType.GameInvite
                        )
                    }
                >
                    Invite
                </span>
            </SelectionBox>
        </div>
    );
};

////////////////////////////////////////////////////////////

interface ISimpleMessageInput {
    content: Chat.Message.Simple;
    setContent: React.Dispatch<React.SetStateAction<Chat.Message.Simple>>;
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
    content: Chat.Message.Picture;
    setContent: React.Dispatch<React.SetStateAction<Chat.Message.Picture>>;
}

const PictureMessageInput = ({
    content,
    setContent
}: IPictureMessageInput): JSX.Element => {
    return (
        <StyledPictureInput>
            <div
                className="img-preview"
                style={{ maxWidth: "100%", overflow: "hidden" }}
            >
                {content.url && <Asset url={content.url} alt={content.alt} />}
            </div>
            <div className="img-settings">
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
                </div>
                <div className="picture-input">
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
        </StyledPictureInput>
    );
};

////////////////////////////////////////////////////////////

interface IGameInviteMessageInput {
    content: Chat.Message.GameInvite;
    setContent: React.Dispatch<React.SetStateAction<Chat.Message.GameInvite>>;
}

const GameInviteMessageInput = ({
    content,
    setContent
}: IGameInviteMessageInput): JSX.Element => {
    return <div className="invite-message-input"></div>;
};

////////////////////////////////////////////////////////////

interface IChatInput {
    user: Profile.Instance;
    chat: Chat.Group.Instance;
}

const ChatInput = ({ user, chat }: IChatInput): JSX.Element => {
    const [messageType, setMessageType] = useState<Chat.Message.ContentType>(
        Chat.Message.ContentType.Simple
    );

    const [messageContent, setMessageContent] =
        useState<Chat.Message.Types>({
            content: ""
        });

    ////////////////////////////////////////////////////////

    const { connection } = useSocket();

    ////////////////////////////////////////////////////////

    const handleMessageSend = async () => {
        connection.emit(SocketRoutes.chat.sendMessage, {
            content: messageContent,
            content_type: messageType
        });

        // Reset input field
        setMessageType(Chat.Message.ContentType.Simple);
        setMessageContent({ content: "" });
    };

    ////////////////////////////////////////////////////////

    return (
        <Container>
            <div className="input-wrapper">
                <div className="input">
                    {messageType === Chat.Message.ContentType.Simple && (
                        <SimpleMessageInput
                            content={messageContent as Chat.Message.Simple}
                            setContent={
                                setMessageContent as React.Dispatch<
                                    React.SetStateAction<Chat.Message.Simple>
                                >
                            }
                        />
                    )}

                    {messageType === Chat.Message.ContentType.Picture && (
                        <PictureMessageInput
                            content={messageContent as Chat.Message.Picture}
                            setContent={
                                setMessageContent as React.Dispatch<
                                    React.SetStateAction<Chat.Message.Picture>
                                >
                            }
                        />
                    )}

                    {messageType === Chat.Message.ContentType.GameInvite && (
                        <GameInviteMessageInput
                            content={messageContent as Chat.Message.GameInvite}
                            setContent={
                                setMessageContent as React.Dispatch<
                                    React.SetStateAction<Chat.Message.GameInvite>
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
                    chat={chat}
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
