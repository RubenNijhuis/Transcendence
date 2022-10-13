import { Container, ElementContainer } from "./Modal.style";

interface Props {
    element: React.ReactNode;
}

const Modal = ({ element }: Props): JSX.Element => {
    return (
        <Container>
            <ElementContainer>{element}</ElementContainer>
        </Container>
    );
};

export default Modal;
