import React, { useEffect } from "react";
import Heading from "../../../components/Heading";
import { useModal } from "../../../contexts/ModalContext";
import { Container, CreateChatContainer } from "./ChatInterface.style";

const CreateChat = ({
    setModalOpen
}: {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    return (
        <CreateChatContainer>
            <div className="title">
                <Heading type={2}>Create a new chat</Heading>
            </div>
            <div className="chat-interface">Display all friends</div>
            <button onClick={() => setModalOpen(false)}>Finish</button>
        </CreateChatContainer>
    );
};

const ChatInterface = () => {
    const { setModalOpen, modalOpen, setModalElement } = useModal();

    useEffect(() => {
        setModalElement(() => <CreateChat setModalOpen={setModalOpen} />);
    }, [modalOpen]);

    return (
        <Container>
            <button onClick={() => setModalOpen(true)}>New chat</button>
        </Container>
    );
};

export default ChatInterface;
