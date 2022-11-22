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
    allowClose: boolean;
    setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({
    children,
    setModalActive,
    allowClose,
}: IModal): JSX.Element => {
    return (
        <Container>
            <ElementContainer>
                {children}
                {allowClose && <CloseButton setModalActive={setModalActive} />}
            </ElementContainer>
        </Container>
    );
};

///////////////////////////////////////////////////////////

export default Modal;
