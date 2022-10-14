import React, { useEffect } from "react";
import Button from "../../../components/Button";
import Heading from "../../../components/Heading";
import { useModal } from "../../../contexts/ModalContext";
import { Container, CreateChatContainer } from "./ChatInterface.style";

const CreateChat = ({
    setModalOpen
}: {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element => {
    return (
        <CreateChatContainer>
            <div className="title">
                <Heading type={2}>Create a new chat</Heading>
            </div>
            <div className="chat-interface">
                <Heading type={4}>Friends</Heading>
                <button onClick={() => setModalOpen(false)}>Finish</button>
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
                <Heading type={4}>Create a new chat +</Heading>
            </Button>
        </Container>
    );
};

export default ChatInterface;
