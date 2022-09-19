// React
import { useEffect } from "react";

// Types
import { RequestError } from "../../types/request";

// Loggeer
import Logger from "../../utils/Logger";

// UI
import Heading from "../Heading";

// Styling
import { Container, Modal } from "./ErrorModal.style";

interface Props {
    error: RequestError;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ErrorModal = ({ error, setIsModalOpen }: Props) => {
    // Log error in console if something happens
    useEffect(() => {
        Logger("ERROR", "Component", "Error", error);
    });

    return (
        <Container>
            <Modal onClick={() => setIsModalOpen(false)}>
                <div className="heading-container">
                    <Heading type={2}>An error was found</Heading>
                </div>
                <div className="content">
                    <p>
                        <span>URL:</span> {error.requestUrl}
                    </p>
                    <p>
                        <span>Type:</span> {error.type}
                    </p>
                    <p>
                        <span>Error:</span> {error.error}
                    </p>
                </div>
            </Modal>
        </Container>
    );
};

export default ErrorModal;
