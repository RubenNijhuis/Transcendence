// Icons
import { GrFormClose } from "react-icons/gr";

// Styling
import {
    CloseButtonContainer,
    Container,
    ElementContainer
} from "./Modal.style";

///////////////////////////////////////////////////////////

interface ICloseButton {
    setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const CloseButton = ({ setModalActive }: ICloseButton) => {
    return (
        <CloseButtonContainer onClick={() => setModalActive(false)}>
            <span>
                <GrFormClose />
            </span>
        </CloseButtonContainer>
    );
};

interface IModal {
    children: React.ReactNode;
    setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ children, setModalActive }: IModal): JSX.Element => {
    return (
        <Container>
            <ElementContainer>
                {children}
                <CloseButton setModalActive={setModalActive} />
            </ElementContainer>
        </Container>
    );
};

///////////////////////////////////////////////////////////

export default Modal;
