// Icons
import { GrFormClose } from "react-icons/gr";

// Styling
import {
    CloseButtonContainer,
    Container,
    ElementContainer,
} from "./Modal.style";

///////////////////////////////////////////////////////////

interface ICloseButton {
    openModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CloseButton = ({ openModal }: ICloseButton) => {
    return (
        <CloseButtonContainer onClick={() => openModal(false)}>
            <span>
                <GrFormClose />
            </span>
        </CloseButtonContainer>
    );
};

interface IModal {
    children: React.ReactNode;
    allowClose: boolean;
    openModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({
    children,
    openModal,
    allowClose,
}: IModal): JSX.Element => {
    return (
        <Container>
            <ElementContainer>
                {children}
                {allowClose && <CloseButton openModal={openModal} />}
            </ElementContainer>
        </Container>
    );
};

///////////////////////////////////////////////////////////

export default Modal;
