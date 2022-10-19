import React, { useEffect, useState, useRef, createRef } from "react";

// Hooks
import { useFormInput } from "../../../components/Form/hooks";
import { useModal } from "../../../contexts/ModalContext";
import { useUser } from "../../../contexts/UserContext";

// Types
import { ProfileType } from "../../../types/profile";

// UI
import Button from "../../../components/Button";
import Heading from "../../../components/Heading";
import {
    Container,
    CreateChatContainer,
    CreateGroupChatContainer
} from "./ChatInterface.style";
import Asset from "../../../components/Asset";

// Icons
import { GrFormSearch, GrFormClose } from "react-icons/gr";

///////////////////////////////////////////////////////////

const CreateGroupChat = ({ friends }: { friends: ProfileType[] }) => {
    const [selectedFriends, setSelectedFriends] = useState<ProfileType[]>([]);
    const groupName = useFormInput("");
    const searchList = useFormInput("");

    ////////////////////////////////////////////////////////////

    const toggleSelected = (friend: ProfileType) => {
        const isSelected = checkIfProfileIsSelected(friend.uid);

        if (isSelected) removeFriendFromSelected(friend);
        else addFriendFromSelected(friend);
    };

    const checkIfProfileIsSelected = (uid: number): boolean => {
        const isFoundInSelectedFriends =
            selectedFriends.find((member) => member.uid === uid) !== undefined;

        return isFoundInSelectedFriends;
    };

    const handleSearch = () => {};

    const removeFriendFromSelected = (friendID: ProfileType) => {
        setSelectedFriends((prevState) =>
            prevState.filter((friend) => friend.uid !== friendID.uid)
        );
    };

    const addFriendFromSelected = (friendID: ProfileType) => {
        setSelectedFriends((prevState) => [...prevState, friendID]);
    };

    ////////////////////////////////////////////////////////////

    return (
        <CreateGroupChatContainer>
            <div className="group-name">
                <Heading type={4}>Set a group name</Heading>
                <input type="text" {...groupName} />
            </div>
            <hr className="divider" />
            <div className="select-friends">
                <div className="header">
                    <Heading type={4}>Select Friends</Heading>
                    <div className="search-bar">
                        <div className="icon">
                            <GrFormSearch className="icon" />
                        </div>
                        <input type="text" {...searchList} />
                    </div>
                </div>

                <ul className="select-friends__list">
                    {friends.map((friend) => {
                        const { uid, img_url, username } = friend;
                        const isSelected = checkIfProfileIsSelected(friend.uid);
                        const selectedClass = isSelected ? "selected" : "";

                        return (
                            <div
                                className={`item ${selectedClass}`}
                                key={uid}
                                onClick={() => toggleSelected(friend)}
                            >
                                <Asset
                                    url={img_url}
                                    alt={`profile ${username}`}
                                />
                                <span>{username}</span>
                            </div>
                        );
                    })}
                </ul>
            </div>
        </CreateGroupChatContainer>
    );
};

const CreateChat = ({
    setModalOpen
}: {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element => {
    const [validSetting, setValidSettings] = useState<boolean>(false);

    ////////////////////////////////////////////////////////////

    const { friends } = useUser();

    ////////////////////////////////////////////////////////////

    // Groupchat naam
    // gwn string
    // WHO BE MAKING THIS ??
    // user uid
    // WHO BE PATYING WITH ??
    // get friends and select uid's

    const handleCreateGroupChat = () => {
        // CreateChat({groupName, members})
    };

    ////////////////////////////////////////////////////////////

    return (
        <CreateChatContainer>
            <div className="title">
                <Heading type={2}>Create a new chat</Heading>
                <div className="close-button">
                    <GrFormClose />
                </div>
            </div>
            <div className="chat-interface">
                {/* <CreateDMChat /> */}
                <CreateGroupChat friends={friends} />
                <Button
                    className={`finish-button ${validSetting && `valid`}`}
                    onClick={() => setModalOpen(false)}
                >
                    Create chat
                </Button>
            </div>
        </CreateChatContainer>
    );
};

const ChatInterface = (): JSX.Element => {
    const { setModalOpen, modalOpen, setModalElement } = useModal();

    useEffect(() => {
        setModalElement(() => <CreateChat setModalOpen={setModalOpen} />);
    }, [modalOpen]);

    return (
        <Container>
            <Button onClick={() => setModalOpen(true)}>
                <Heading type={4}>Create a new chat + </Heading>
            </Button>
        </Container>
    );
};

export default ChatInterface;
