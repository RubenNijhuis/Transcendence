import { Container, ElementContainer } from "./Modal.style";

///////////////////////////////////////////////////////////

interface IModal {
    element: React.ReactNode;
}

const Modal = ({ element }: IModal): JSX.Element => {
    return (
        <Container>
            <ElementContainer>{element}</ElementContainer>
        </Container>
    );
};

///////////////////////////////////////////////////////////

export default Modal;
