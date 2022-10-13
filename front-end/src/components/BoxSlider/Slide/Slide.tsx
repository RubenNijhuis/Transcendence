// Styling
import { Container } from "./Slide.style";

////////////////////////////////////////////////////////////

interface Props {
    children: React.ReactNode;
}

const Slide = ({ children }: Props): JSX.Element => {
    return <Container className="slide">{children}</Container>;
};

export default Slide;
