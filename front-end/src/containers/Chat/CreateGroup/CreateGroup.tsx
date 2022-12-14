// React
import React, { useEffect, useState } from "react";

// Hooks
import { useFormInput } from "../../../components/Form/hooks";
import { useModal } from "../../../contexts/ModalContext";
import { useUser } from "../../../contexts/UserContext";

// Types
import { Profile } from "../../../types";

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

interface ICreateGroupChat {
    setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateGroupChat = ({ setModalActive }: ICreateGroupChat): JSX.Element => {
    const [selectedFriends, setSelectedFriends] = useState<Profile.Instance[]>(
        []
    );
    const groupName = useFormInput("");
    const searchList = useFormInput("");
    const password = useFormInput("");

    ////////////////////////////////////////////////////////////

    const { user, friends } = useUser();

    ////////////////////////////////////////////////////////////

    const toggleSelected = (friend: Profile.Instance): void => {
        const isSelected: boolean = checkIfProfileIsSelected(friend.uid);

        if (isSelected) {
            removeFriendFromSelected(friend);
        } else {
            addFriendFromSelected(friend);
        }
    };

    const checkIfProfileIsSelected = (id: string): boolean => {
        let foundInSelectedFriends = false;

        foundInSelectedFriends =
            selectedFriends.find((member) => {
                return member.uid === id;
            }) !== undefined;

        return foundInSelectedFriends;
    };

    const removeFriendFromSelected = (friendID: Profile.Instance): void => {
        setSelectedFriends((prevState) => {
            const filteredState = prevState.filter((friend) => {
                return friend.uid !== friendID.uid;
            });
            return filteredState;
        });
    };

    const addFriendFromSelected = (friendID: Profile.Instance): void => {
        setSelectedFriends((prevState) => [...prevState, friendID]);
    };

    const createGroupChat = async () => {
        try {
            const selectedFriendsUIDS = selectedFriends.map((item) => item.uid);
            await createChat(user.uid, groupName.value, selectedFriendsUIDS, password.value);
            setModalActive(false);
        } catch (err) {
            console.error(err);
        }
    };

    ////////////////////////////////////////////////////////////

    return (
        <CreateGroupChatContainer>
            <div className="title">
                <Heading type={2}>Create a new chat</Heading>
            </div>

            <div className="group-name">
                <Heading type={4}>Set a group name</Heading>
                <input type="text" {...groupName} />
            </div>

            <div className="group-name">
                <Heading type={4}>Set a password</Heading>
                <input type="text" {...password} />
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

            <Button onClick={createGroupChat}>Create chat</Button>
        </CreateGroupChatContainer>
    );
};

const CreateGroup = (): JSX.Element => {
    const { setModalActive, modalActive, setModalElement } = useModal();

    ////////////////////////////////////////////////////////////

    /**
     * We set the modal component with its closing function
     */
    const openCreateGroup = () => {
        setModalElement(<CreateGroupChat setModalActive={setModalActive} />);
        setModalActive(true);
    }

    ////////////////////////////////////////////////////////////

    return (
        <Container>
            <Button onClick={openCreateGroup}>
                <Heading type={4}>Create a new chat + </Heading>
            </Button>
        </Container>
    );
};

///////////////////////////////////////////////////////////

export default CreateGroup;
