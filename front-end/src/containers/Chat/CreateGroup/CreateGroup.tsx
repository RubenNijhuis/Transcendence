// React
import React, { useEffect, useState } from "react";

// Hooks
import { useFormInput } from "../../../components/Form/hooks";
import { useModal } from "../../../contexts/ModalContext";
import { useUser } from "../../../contexts/UserContext";

// Types
import { ProfileID, ProfileType } from "../../../types/profile";

// UI
import Button from "../../../components/Button";
import Heading from "../../../components/Heading";
import {
    Container,
    CreateChatContainer,
    CreateGroupChatContainer
} from "./CreateGroup.style";
import Asset from "../../../components/Asset";

// Proxies
import { createChat } from "../../../proxies/chat";

// Icons
import { GrFormSearch, GrFormClose } from "react-icons/gr";

///////////////////////////////////////////////////////////

const CreateGroupChat = ({
    friends
}: {
    friends: ProfileType[];
}): JSX.Element => {
    const [selectedFriends, setSelectedFriends] = useState<ProfileType[]>([]);
    const groupName = useFormInput("");
    const searchList = useFormInput("");

    ////////////////////////////////////////////////////////////

    const toggleSelected = (friend: ProfileType): void => {
        const isSelected: boolean = checkIfProfileIsSelected(friend.id);

        if (isSelected) {
            removeFriendFromSelected(friend);
        } else {
            addFriendFromSelected(friend);
        }
    };

    const checkIfProfileIsSelected = (id: string): boolean => {
        let foundInSelectedFriends: boolean = false;

        foundInSelectedFriends =
            selectedFriends.find((member) => {
                return member.id === id;
            }) !== undefined;

        return foundInSelectedFriends;
    };

    const handleSearch = () => {};

    const removeFriendFromSelected = (friendID: ProfileType): void => {
        setSelectedFriends((prevState) => {
            const filteredState = prevState.filter((friend) => {
                return friend.id !== friendID.id;
            });
            return filteredState;
        });
    };

    const addFriendFromSelected = (friendID: ProfileType): void => {
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
                        const { id, img_url, username } = friend;
                        const isSelected = checkIfProfileIsSelected(friend.id);
                        const selectedClass = isSelected ? "selected" : "";

                        return (
                            <div
                                className={`item ${selectedClass}`}
                                key={id}
                                onClick={() => toggleSelected(friend)}
                            >
                                <Asset
                                    className="friend-image"
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

    return (
        <CreateChatContainer>
            <div className="title">
                <Heading type={2}>Create a new chat</Heading>
                <div
                    className="close-button"
                    onClick={() => setModalOpen(false)}
                >
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

const CreateGroup = (): JSX.Element => {
    const { setModalOpen, modalOpen, setModalElement } = useModal();

    ////////////////////////////////////////////////////////////

    /**
     * We set the modal component with its closing function
     * TODO: create some kind of way for the closing function to be global
     */
    useEffect(() => {
        setModalElement(() => <CreateChat setModalOpen={setModalOpen} />);
    }, [modalOpen]);

    ////////////////////////////////////////////////////////////

    return (
        <Container>
            <Button onClick={() => setModalOpen(true)}>
                <Heading type={4}>Create a new chat + </Heading>
            </Button>
        </Container>
    );
};

export default CreateGroup;
